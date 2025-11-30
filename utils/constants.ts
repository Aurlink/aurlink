/* ============================
   Contract Configuration
   ============================ */
export const CONTRACT_ADDRESSES = {
  arbitrum: '0x0da17f1e92b3dcfbf0d97a8d6a0ae8edfb76fc05', 
  bsc: '0x13888BD6d7Fa8CCfD669fC09826Bb8acC1C68855',   
  polygon: '0x0ec0043583de87c689f3e0b929f400cb4797287b',  
} as const

// Complete ABI for AurLink Ecosystem Vesting Contract
export const AURLINK_VESTING_ABI = [
  // Core Vesting Functions
  {
    name: 'releaseTokens',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'allocateVesting',
    type: 'function',
    inputs: [
      { name: 'beneficiary', type: 'address' },
      { name: 'packageId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'startTime', type: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'batchAllocateVesting',
    type: 'function',
    inputs: [
      { name: 'beneficiaries', type: 'address[]' },
      { name: 'packageId', type: 'uint256' },
      { name: 'amounts', type: 'uint256[]' },
      { name: 'startTime', type: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },

  // View Functions
  {
    name: 'calculateReleasableAmount',
    type: 'function',
    inputs: [{ name: '_beneficiary', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    name: 'calculateVestedAmount',
    type: 'function',
    inputs: [{ name: '_beneficiary', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    name: 'getVestingInfo',
    type: 'function',
    inputs: [{ name: '_beneficiary', type: 'address' }],
    outputs: [
      { name: 'packageId', type: 'uint256' },
      { name: 'totalAmount', type: 'uint256' },
      { name: 'releasedAmount', type: 'uint256' },
      { name: 'releasableAmount', type: 'uint256' },
      { name: 'vestedAmount', type: 'uint256' },
      { name: 'lockedAmount', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'cliffEnd', type: 'uint256' },
      { name: 'vestingEnd', type: 'uint256' },
      { name: 'category', type: 'uint8' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'getVestingPackageDetails',
    type: 'function',
    inputs: [{ name: '_beneficiary', type: 'address' }],
    outputs: [
      { name: 'packageName', type: 'string' },
      { name: 'packageDescription', type: 'string' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'getActivePackages',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'packageId', type: 'uint256' },
          { name: 'name', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'cliff', type: 'uint256' },
          { name: 'duration', type: 'uint256' },
          { name: 'category', type: 'uint8' },
          { name: 'maxAllocations', type: 'uint256' },
          { name: 'currentAllocations', type: 'uint256' },
          { name: 'minAllocation', type: 'uint256' },
          { name: 'maxAllocation', type: 'uint256' },
          { name: 'isActive', type: 'bool' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    name: 'getAllPackages',
    type: 'function',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'packageId', type: 'uint256' },
          { name: 'name', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'cliff', type: 'uint256' },
          { name: 'duration', type: 'uint256' },
          { name: 'category', type: 'uint8' },
          { name: 'maxAllocations', type: 'uint256' },
          { name: 'currentAllocations', type: 'uint256' },
          { name: 'minAllocation', type: 'uint256' },
          { name: 'maxAllocation', type: 'uint256' },
          { name: 'isActive', type: 'bool' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    name: 'getPackageInfo',
    type: 'function',
    inputs: [{ name: '_packageId', type: 'uint256' }],
    outputs: [
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'cliff', type: 'uint256' },
      { name: 'duration', type: 'uint256' },
      { name: 'category', type: 'uint8' },
      { name: 'maxAllocations', type: 'uint256' },
      { name: 'currentAllocations', type: 'uint256' },
      { name: 'isActive', type: 'bool' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'getPackageAllocationInfo',
    type: 'function',
    inputs: [{ name: '_packageId', type: 'uint256' }],
    outputs: [
      { name: 'minAllocation', type: 'uint256' },
      { name: 'maxAllocation', type: 'uint256' },
      { name: 'beneficiaries', type: 'address[]' }
    ],
    stateMutability: 'view'
  },
  {
    name: 'getTokenInfo',
    type: 'function',
    inputs: [],
    outputs: [
      { name: 'contractBalance', type: 'uint256' },
      { name: 'totalVested', type: 'uint256' },
      { name: 'totalReleased', type: 'uint256' },
      { name: 'totalLocked', type: 'uint256' },
      { name: 'excessTokens', type: 'uint256' }
    ],
    stateMutability: 'view'
  },

  // Administrative Functions
  {
    name: 'setAllocatorAuthorization',
    type: 'function',
    inputs: [
      { name: 'allocator', type: 'address' },
      { name: 'authorized', type: 'bool' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'createVestingPackage',
    type: 'function',
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_description', type: 'string' },
      { name: '_cliff', type: 'uint256' },
      { name: '_duration', type: 'uint256' },
      { name: '_category', type: 'uint8' },
      { name: '_maxAllocations', type: 'uint256' },
      { name: '_minAllocation', type: 'uint256' },
      { name: '_maxAllocation', type: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'setPackageStatus',
    type: 'function',
    inputs: [
      { name: '_packageId', type: 'uint256' },
      { name: '_isActive', type: 'bool' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'pause',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'unpause',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },

  // Events
  {
    name: 'TokensReleased',
    type: 'event',
    inputs: [
      { name: 'beneficiary', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256' }
    ],
    anonymous: false
  },
  {
    name: 'VestingAllocated',
    type: 'event',
    inputs: [
      { name: 'beneficiary', type: 'address', indexed: true },
      { name: 'packageId', type: 'uint256', indexed: true },
      { name: 'amount', type: 'uint256' },
      { name: 'startTime', type: 'uint256' }
    ],
    anonymous: false
  },
  {
    name: 'VestingPackageCreated',
    type: 'event',
    inputs: [
      { name: 'packageId', type: 'uint256' },
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' }
    ],
    anonymous: false
  },
  {
    name: 'AllocatorAuthorized',
    type: 'event',
    inputs: [
      { name: 'allocator', type: 'address', indexed: true },
      { name: 'authorized', type: 'bool' }
    ],
    anonymous: false
  }
] as const

// Keep old ABI for backward compatibility
export const ERC20_ABI = AURLINK_VESTING_ABI

/* ============================
   Network Configuration
   ============================ */
export const NETWORK_CONFIG = {
  arbitrum: {
    name: 'Arbitrum',
    icon: '🔵',
    chainId: 42161,
    nativeToken: {
      symbol: 'ETH',
      name: 'Arbitrum',
      address: '0x0fd5712b065d9d9048e4fcc2c3bcd27e85f5a0e3' as `0x${string}`,
      decimals: 18
    }
  },
  bsc: {
    name: 'BNB Chain',
    icon: '🟡',
    chainId: 56,
    nativeToken: {
      symbol: 'BNB',
      name: 'BNB',
      address: '0xa38c98692a9186b694300a0ae86dbc4ccc2c8e9d' as `0x${string}`,
      decimals: 18
    }
  },
  polygon: {
    name: 'Polygon',
    icon: '🟣',
    chainId: 137,
    nativeToken: {
      symbol: 'MATIC',
      name: 'Polygon',
      address: '0xe57595eae1df8cf28dde6ffc46755a95a1622516' as `0x${string}`,
      decimals: 18
    }
  }
} as const

/* ============================
   AurLink Ecosystem Vesting Categories
   ============================ */
export const VESTING_CATEGORIES = {
  0: "🚀 Early Contributors",
  1: "🌱 Ecosystem Development", 
  2: "👥 Team & Advisors",
  3: "🤝 Strategic Partners",
  4: "🎯 Community Rewards",
  5: "💧 Liquidity Provision",
  6: "📢 Marketing & Development",
  7: "🏦 Reserve Treasury"
} as const

/* ============================
   Package Category Colors for UI
   ============================ */
export const PACKAGE_CATEGORY_COLORS = {
  0: 'from-blue-500 to-cyan-500',      // Early Contributors
  1: 'from-green-500 to-emerald-500',  // Ecosystem Development
  2: 'from-purple-500 to-pink-500',    // Team & Advisors
  3: 'from-orange-500 to-red-500',     // Strategic Partners
  4: 'from-yellow-500 to-amber-500',   // Community Rewards
  5: 'from-indigo-500 to-blue-500',    // Liquidity Provision
  6: 'from-teal-500 to-green-500',     // Marketing & Development
  7: 'from-gray-500 to-slate-500'      // Reserve Treasury
} as const

/* ============================
   Package Category Icons
   ============================ */
export const PACKAGE_CATEGORY_ICONS = {
  0: '🚀', // Early Contributors
  1: '🌱', // Ecosystem Development
  2: '👥', // Team & Advisors
  3: '🤝', // Strategic Partners
  4: '🎯', // Community Rewards
  5: '💧', // Liquidity Provision
  6: '📢', // Marketing & Development
  7: '🏦'  // Reserve Treasury
} as const

/* ============================
   Default Vesting Packages Configuration
   ============================ */
export const DEFAULT_VESTING_PACKAGES = [
  {
    packageId: 1,
    name: "Early Contributors",
    description: "For early supporters and initial contributors to AurLink ecosystem",
    cliff: 180 * 24 * 60 * 60, // 6 months in seconds
    duration: 720 * 24 * 60 * 60, // 24 months in seconds
    category: 0,
    maxAllocations: 1000,
    minAllocation: BigInt(1000 * 10**18), // 1000 AUR
    maxAllocation: BigInt(50000 * 10**18) // 50000 AUR
  },
  {
    packageId: 2,
    name: "Ecosystem Development",
    description: "Grants for ecosystem development and platform growth initiatives",
    cliff: 90 * 24 * 60 * 60, // 3 months in seconds
    duration: 1080 * 24 * 60 * 60, // 36 months in seconds
    category: 1,
    maxAllocations: 500,
    minAllocation: BigInt(5000 * 10**18), // 5000 AUR
    maxAllocation: BigInt(200000 * 10**18) // 200000 AUR
  },
  {
    packageId: 3,
    name: "Team & Advisors",
    description: "Vesting for core team members, advisors, and founders",
    cliff: 360 * 24 * 60 * 60, // 12 months in seconds
    duration: 1080 * 24 * 60 * 60, // 36 months in seconds
    category: 2,
    maxAllocations: 100,
    minAllocation: BigInt(10000 * 10**18), // 10000 AUR
    maxAllocation: BigInt(500000 * 10**18) // 500000 AUR
  },
  {
    packageId: 4,
    name: "Strategic Partners",
    description: "Vesting for strategic partners and institutional investors",
    cliff: 180 * 24 * 60 * 60, // 6 months in seconds
    duration: 720 * 24 * 60 * 60, // 24 months in seconds
    category: 3,
    maxAllocations: 200,
    minAllocation: BigInt(2500 * 10**18), // 2500 AUR
    maxAllocation: BigInt(100000 * 10**18) // 100000 AUR
  },
  {
    packageId: 5,
    name: "Community Rewards",
    description: "Rewards for community members, ambassadors, and active participants",
    cliff: 30 * 24 * 60 * 60, // 1 month in seconds
    duration: 360 * 24 * 60 * 60, // 12 months in seconds
    category: 4,
    maxAllocations: 5000,
    minAllocation: BigInt(100 * 10**18), // 100 AUR
    maxAllocation: BigInt(5000 * 10**18) // 5000 AUR
  }
] as const

/* ============================
   Token Configuration
   ============================ */
export const TOKEN_CONFIG = {
  symbol: 'AUR',
  name: 'AurLink Token',
  decimals: 18,
  totalSupply: 1000000000, // 1 billion
  vestingAllocation: 200000000, // 200 million for vesting
} as const

/* ============================
   Vesting Calculation Constants
   ============================ */
export const VESTING_CONSTANTS = {
  SECONDS_PER_DAY: 24 * 60 * 60,
  SECONDS_PER_MONTH: 30 * 24 * 60 * 60,
  SECONDS_PER_YEAR: 365 * 24 * 60 * 60,
  MAX_VESTING_DURATION: 5 * 365 * 24 * 60 * 60, // 5 years
  MIN_VESTING_DURATION: 30 * 24 * 60 * 60, // 30 days
} as const

/* ============================
   UI Configuration
   ============================ */
export const UI_CONFIG = {
  REFRESH_INTERVAL: 15000, // 15 seconds
  MAX_BATCH_ALLOCATIONS: 100,
  DEFAULT_GAS_LIMIT: 300000,
  CONFIRMATION_BLOCKS: 3,
} as const

export type Network = keyof typeof NETWORK_CONFIG
export type VestingCategory = keyof typeof VESTING_CATEGORIES