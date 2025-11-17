// app/docs/getting-started/quickstart/page.tsx - COMPLETE PRODUCTION CONTENT
'use client'
import { motion } from 'framer-motion'
import { CodeBlock } from '@/components/docs/CodeBlock'

const content = {
  title: 'Quick Start Guide',
  description: 'Get up and running with Aurlink in 15 minutes. Deploy your first smart contract and interact with the network.',
  sections: [
    {
      title: 'Prerequisites',
      content: `Before you begin, make sure you have the following installed:`,
      type: 'text'
    },
    {
      title: 'Required Tools',
      content: [
        '**Node.js** (v16 or higher) - JavaScript runtime',
        '**npm** or **yarn** - Package manager',
        '**Git** - Version control',
        '**Code Editor** - VS Code recommended',
        '**MetaMask** or another Web3 wallet'
      ],
      type: 'list'
    },
    {
      title: 'Step 1: Install Aurlink SDK',
      content: `Start by installing the Aurlink SDK and required dependencies:`,
      type: 'code',
      code: `# Create a new project directory
mkdir my-aurlink-dapp
cd my-aurlink-dapp

# Initialize npm project
npm init -y

# Install Aurlink SDK and dependencies
npm install @aurlink/sdk ethers
npm install --save-dev @nomiclabs/hardhat-ethers hardhat

# Or using yarn
yarn add @aurlink/sdk ethers
yarn add --dev @nomiclabs/hardhat-ethers hardhat`,
      language: 'bash'
    },
    {
      title: 'Step 2: Set Up Development Environment',
      content: `Configure your development environment with Aurlink network settings:`,
      type: 'code',
      code: `// hardhat.config.js
require('@nomiclabs/hardhat-ethers');

module.exports = {
  networks: {
    aurlink: {
      url: 'https://rpc.aurlink.io',
      chainId: 7890,
      accounts: [process.env.PRIVATE_KEY]
    },
    aurlinkTestnet: {
      url: 'https://rpc-testnet.aurlink.io', 
      chainId: 7891,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};`,
      language: 'javascript'
    },
    {
      title: 'Step 3: Get Testnet AUR',
      content: `For testing, get testnet AUR tokens from the faucet:`,
      type: 'code',
      code: `# Visit the Aurlink Testnet Faucet
# https://faucet.aurlink.io

# Connect your wallet and request testnet AUR
# You'll receive 100 test AUR for development

# Or use the API
curl -X POST https://faucet.aurlink.io/api/request \\
  -H "Content-Type: application/json" \\
  -d '{"address": "YOUR_WALLET_ADDRESS", "network": "testnet"}'`,
      language: 'bash'
    },
    {
      title: 'Step 4: Create Your First Smart Contract',
      content: `Create a simple smart contract with AI integration:`,
      type: 'code',
      code: `// contracts/AIPricePredictor.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@aurlink/ai/AIOracle.sol";

contract AIPricePredictor {
    AIOracle public aiOracle;
    address public owner;
    
    event PredictionCreated(address indexed user, uint256 prediction, uint256 confidence);
    
    constructor(address _aiOracle) {
        aiOracle = AIOracle(_aiOracle);
        owner = msg.sender;
    }
    
    function predictPrice(bytes memory marketData) 
        external 
        returns (uint256 prediction, uint256 confidence) 
    {
        // Use AI Oracle for price prediction
        (bool success, bytes memory result) = address(aiOracle).delegatecall(
            abi.encodeWithSignature("predictPrice(bytes)", marketData)
        );
        require(success, "AI prediction failed");
        
        (prediction, confidence) = abi.decode(result, (uint256, uint256));
        require(confidence > 75, "Low prediction confidence");
        
        emit PredictionCreated(msg.sender, prediction, confidence);
    }
    
    function getAIOracleAddress() external view returns (address) {
        return address(aiOracle);
    }
}`,
      language: 'solidity'
    },
    {
      title: 'Step 5: Deploy to Aurlink',
      content: `Deploy your contract to the Aurlink testnet:`,
      type: 'code',
      code: `// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy the contract
  const AIPricePredictor = await ethers.getContractFactory("AIPricePredictor");
  
  // AI Oracle address on Aurlink testnet
  const aiOracleAddress = "0x0000000000000000000000000000000000001001";
  
  const predictor = await AIPricePredictor.deploy(aiOracleAddress);
  await predictor.deployed();

  console.log("AIPricePredictor deployed to:", predictor.address);
  console.log("Transaction hash:", predictor.deployTransaction.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });`,
      language: 'javascript'
    },
    {
      title: 'Step 6: Interact with Your Contract',
      content: `Create a script to interact with your deployed contract:`,
      type: 'code',
      code: `// scripts/interact.js
const { ethers } = require("ethers");
const { Aurlink } = require("@aurlink/sdk");

async function main() {
  // Connect to Aurlink testnet
  const provider = new ethers.providers.JsonRpcProvider('https://rpc-testnet.aurlink.io');
  const aurlink = new Aurlink({ provider });
  
  // Your contract address from deployment
  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
  
  // Contract ABI
  const abi = [
    "function predictPrice(bytes) external returns (uint256, uint256)",
    "function getAIOracleAddress() external view returns (address)",
    "event PredictionCreated(address indexed user, uint256 prediction, uint256 confidence)"
  ];
  
  const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
  
  // Get AI Oracle address
  const aiOracleAddress = await contract.getAIOracleAddress();
  console.log("AI Oracle Address:", aiOracleAddress);
  
  // Make a prediction (example market data)
  const marketData = ethers.utils.defaultAbiCoder.encode(
    ['uint256[]'],
    [[/* your market data here */]]
  );
  
  const tx = await contract.predictPrice(marketData);
  console.log("Transaction sent:", tx.hash);
  
  const receipt = await tx.wait();
  console.log("Transaction confirmed in block:", receipt.blockNumber);
}

main().catch(console.error);`,
      language: 'javascript'
    },
    {
      title: 'Step 7: Build a Frontend (Optional)',
      content: `Create a simple React frontend to interact with your contract:`,
      type: 'code',
      code: `// App.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Aurlink } from '@aurlink/sdk';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      // Connect to Aurlink
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const aurlink = new Aurlink({ provider });
      
      // Your contract interaction code here
      // ... (similar to the interact.js example)
      
      setPrediction({
        value: '1250',
        confidence: '87%',
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Aurlink AI Price Predictor</h1>
      <button onClick={handlePredict} disabled={loading}>
        {loading ? 'Predicting...' : 'Get Price Prediction'}
      </button>
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction: {prediction.value}</h3>
          <p>Confidence: {prediction.confidence}</p>
          <p>Time: {prediction.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default App;`,
      language: 'javascript'
    },
    {
      title: 'Next Steps',
      content: `Congratulations! You've successfully deployed and interacted with a smart contract on Aurlink. Here's what to explore next:`,
      type: 'text'
    },
    {
      title: 'Continue Learning',
      content: [
        '**Explore AI Precompiles**: Learn about built-in AI functions in AurlinkVM',
        '**Cross-Chain Development**: Build applications that work across multiple blockchains',
        '**NOL Integration**: Use Neural Optimization Layer for real-time optimization',
        '**RWA Tokenization**: Learn about compliant real-world asset tokenization',
        '**Advanced Security**: Implement best practices for secure smart contract development'
      ],
      type: 'list'
    }
  ]
}

export default function QuickStartPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">{content.title}</h1>
          <p className="text-xl text-gray-300">{content.description}</p>
        </motion.div>

        <div className="prose prose-invert prose-cyan max-w-none">
          {content.sections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">{section.title}</h2>
              
              {section.type === 'text' && (
                <p className="text-gray-300 leading-relaxed">{section.content as string}</p>
              )}
              
              {section.type === 'list' && (
                <ul className="text-gray-300 space-y-3">
                  {(section.content as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              )}
              
              {section.type === 'code' && section.code && (
                <CodeBlock code={section.code} language={section.language || 'javascript'} />
              )}
            </motion.section>
          ))}
        </div>

        {/* Success Banner */}
        <div className="mt-12 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <h3 className="text-xl font-bold text-white">You're All Set!</h3>
          </div>
          <p className="text-gray-300 mb-4">
            You've successfully completed the Quick Start guide. You now have a working Aurlink development environment and have deployed your first AI-enhanced smart contract.
          </p>
          <div className="flex gap-4">
            <a
              href="/docs/core-concepts/neuralink-consensus"
              className="flex-1 text-center py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Learn Core Concepts →
            </a>
            <a
              href="/docs/tutorials"
              className="flex-1 text-center py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Explore Tutorials
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}