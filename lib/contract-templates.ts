// src/lib/contract-templates.ts
export const contractTemplates = {
  ERC20: {
    name: "ERC20 Token",
    description: "Standard fungible token for currencies and shares",
    features: ["Transfer", "Approve", "Allowance", "Burn", "Mint"],
    parameters: [
      { name: "name", type: "string", required: true },
      { name: "symbol", type: "string", required: true },
      { name: "supply", type: "uint256", required: true }
    ]
  },
  ERC721: {
    name: "ERC721 NFT",
    description: "Non-fungible token for unique digital assets",
    features: ["Mint", "Transfer", "Approve", "Metadata", "Enumerable"],
    parameters: [
      { name: "name", type: "string", required: true },
      { name: "symbol", type: "string", required: true }
    ]
  },
  Staking: {
    name: "Staking Contract",
    description: "Allow users to stake tokens and earn rewards",
    features: ["Stake", "Unstake", "Claim Rewards", "APY Calculation"],
    parameters: [
      { name: "stakingToken", type: "address", required: true },
      { name: "rewardToken", type: "address", required: true },
      { name: "rewardRate", type: "uint256", required: true }
    ]
  }
}