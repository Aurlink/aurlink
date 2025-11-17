// lib/evm.ts
import { ethers } from 'ethers'

const RPC = process.env.EVm_RPC_URL!
const PK = process.env.EVM_PRIVATE_KEY!
const VESTING_ADDR = process.env.EVM_VESTING_CONTRACT_ADDRESS!

if (!RPC || !PK || !VESTING_ADDR) {
  console.warn('EVM env variables may be missing')
}

// Minimal ABI example — replace with your contract's ABI
const VESTING_ABI = [
  // allocateVestedTokens(address recipient, uint256 amount, uint256 vestingMonths, uint256 immediatePct)
  "function allocateVestedTokens(address,uint256,uint256,uint256) public returns (bool)",
  // claim function example
  "function claim(uint256 vestingId) public returns (bool)"
]

export function getEvmProvider() {
  return new ethers.providers.JsonRpcProvider(RPC)
}

export function getEvmSigner() {
  const provider = getEvmProvider()
  return new ethers.Wallet(PK, provider)
}

export async function allocateVestedTokensEvm(recipient: string, amountTokens: string, vestingMonths: number, immediatePercentBp: number) {
  // immediatePercentBp is in basis points (e.g., 1000 = 10%)
  const signer = getEvmSigner()
  const contract = new ethers.Contract(VESTING_ADDR, VESTING_ABI, signer)
  const tx = await contract.allocateVestedTokens(recipient, ethers.utils.parseUnits(amountTokens, 18), vestingMonths, immediatePercentBp)
  const receipt = await tx.wait()
  return receipt.transactionHash
}

export async function claimVestedEvm(vestingId: number, claimerPrivateKey?: string) {
  const signer = claimerPrivateKey ? new ethers.Wallet(claimerPrivateKey, getEvmProvider()) : getEvmSigner()
  const contract = new ethers.Contract(VESTING_ADDR, VESTING_ABI, signer)
  const tx = await contract.claim(vestingId)
  const receipt = await tx.wait()
  return receipt.transactionHash
}
