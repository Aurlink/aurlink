// src/app/api/contracts/deploy/route.ts
import { NextRequest, NextResponse } from 'next/server'

// This runs on the server, so Node.js modules are available
const solc = require('solc')

export async function POST(request: NextRequest) {
  try {
    const contractData = await request.json()
    
    console.log('Deploying contract:', {
      type: contractData.type,
      network: contractData.network,
      parameters: contractData.parameters
    })

    // 1. Generate Solidity code based on contract type
    const solidityCode = generateSolidityCode(contractData)
    console.log('Generated Solidity code')
    
    // 2. Compile the contract (server-side - safe to use solc)
    const compiledContract = await compileContract(solidityCode, getContractName(contractData.type))
    console.log('Contract compiled successfully')
    
    // 3. Simulate deployment (in real implementation, this would deploy to blockchain)
    const deploymentResult = await simulateDeployment(compiledContract, contractData.network, contractData.parameters)
    console.log('Contract deployment simulated:', deploymentResult.address)
    
    return NextResponse.json({
      success: true,
      contractAddress: deploymentResult.address,
      transactionHash: deploymentResult.transactionHash,
      explorerUrl: getExplorerUrl(contractData.network, deploymentResult.address),
      abi: compiledContract.abi,
      network: contractData.network,
      timestamp: new Date().toISOString(),
      message: 'Demo deployment - Contract was compiled but not deployed to blockchain'
    })
    
  } catch (error) {
    console.error('Contract deployment error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to deploy contract'
      },
      { status: 500 }
    )
  }
}

function generateSolidityCode(contractData: any): string {
  const { type, parameters } = contractData
  
  switch (type) {
    case 'ERC20':
      return `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ${parameters.name?.replace(/\s+/g, '') || 'MyToken'} {
    string public name = "${parameters.name || 'MyToken'}";
    string public symbol = "${parameters.symbol || 'MTK'}";
    uint8 public decimals = 18;
    uint256 public totalSupply = ${parameters.supply || '1000000'} * 10 ** decimals;
    address public owner;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor() {
        owner = msg.sender;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Not approved");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}
      `
      
    case 'ERC721':
      return `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ${parameters.name?.replace(/\s+/g, '') || 'MyNFT'} {
    string public name = "${parameters.name || 'MyNFT'}";
    string public symbol = "${parameters.symbol || 'MNFT'}";
    
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    
    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }
    
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token does not exist");
        return owner;
    }
    
    function mint(uint256 tokenId) public {
        require(_owners[tokenId] == address(0), "Token already minted");
        _owners[tokenId] = msg.sender;
        _balances[msg.sender] += 1;
        emit Transfer(address(0), msg.sender, tokenId);
    }
    
    function transfer(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        _owners[tokenId] = to;
        _balances[msg.sender] -= 1;
        _balances[to] += 1;
        emit Transfer(msg.sender, to, tokenId);
    }
}
      `
      
    case 'custom':
      return contractData.code
      
    default:
      return `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ${parameters.name?.replace(/\s+/g, '') || 'SimpleContract'} {
    string public message = "Hello, World!";
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
    
    function getMessage() public view returns (string memory) {
        return message;
    }
}
      `
  }
}

function getContractName(type: string): string {
  const names: { [key: string]: string } = {
    ERC20: 'TokenContract',
    ERC721: 'NFTContract', 
    ERC1155: 'MultiTokenContract',
    Staking: 'StakingContract',
    Vesting: 'VestingContract',
    custom: 'CustomContract'
  }
  return names[type] || 'SmartContract'
}

async function compileContract(sourceCode: string, contractName: string) {
  try {
    const input = {
      language: 'Solidity',
      sources: {
        'contract.sol': {
          content: sourceCode
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode']
          }
        }
      }
    }

    const output = JSON.parse(solc.compile(JSON.stringify(input)))
    
    // Check for compilation errors
    if (output.errors) {
      const errors = output.errors.filter((error: any) => error.severity === 'error')
      if (errors.length > 0) {
        throw new Error(`Compilation failed: ${errors.map((e: any) => e.formattedMessage).join(', ')}`)
      }
    }

    const contracts = output.contracts['contract.sol']
    const contractKey = Object.keys(contracts)[0]
    const contract = contracts[contractKey]

    if (!contract) {
      throw new Error('No contract found in compilation output')
    }

    return {
      abi: contract.abi,
      bytecode: contract.evm.bytecode.object
    }
    
  } catch (error) {
    console.error('Compilation error:', error)
    throw new Error(`Compilation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

async function simulateDeployment(compiledContract: any, network: string, parameters: any) {
  // Simulate deployment delay
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  // Generate fake address and hash for demo
  const fakeAddress = '0x' + Array.from({length: 40}, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
  
  const fakeTxHash = '0x' + Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')

  return {
    address: fakeAddress,
    transactionHash: fakeTxHash
  }
}

function getExplorerUrl(network: string, address: string): string {
  const explorers: { [key: string]: string } = {
    ethereum: `https://etherscan.io/address/${address}`,
    polygon: `https://polygonscan.com/address/${address}`,
    avalanche: `https://snowtrace.io/address/${address}`,
    bsc: `https://bscscan.com/address/${address}`,
    goerli: `https://goerli.etherscan.io/address/${address}`,
    mumbai: `https://mumbai.polygonscan.com/address/${address}`,
  }
  return explorers[network] || `https://etherscan.io/address/${address}`
}