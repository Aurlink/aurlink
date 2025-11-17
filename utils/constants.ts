/* ============================
   Contract Configuration
   ============================ */
export const CONTRACT_ADDRESSES = {
  arbitrum: '0x0da17f1e92b3dcfbf0d97a8d6a0ae8edfb76fc05', 
  bsc: '0x0d846c031b2929137b507f356c6e7598ba3c0519',   
  polygon: '0x0ec0043583de87c689f3e0b929f400cb4797287b',  
} as const

// Complete ABI matching your VestingPortal contract
export const VESTING_PORTAL_ABI = [
  {
    name: 'releaseTokens',
    type: 'function',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    name: 'calculateReleasableAmount',
    type: 'function',
    inputs: [{ name: '_investor', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    name: 'getVestingInfo',
    type: 'function',
    inputs: [{ name: '_investor', type: 'address' }],
    outputs: [
      { name: 'packageId', type: 'uint256' },
      { name: 'totalAmount', type: 'uint256' },
      { name: 'releasedAmount', type: 'uint256' },
      { name: 'lockedAmount', type: 'uint256' },
      { name: 'releasableAmount', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'cliffEnd', type: 'uint256' },
      { name: 'vestingEnd', type: 'uint256' },
      { name: 'category', type: 'uint8' }
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
          { name: 'totalAmount', type: 'uint256' },
          { name: 'price', type: 'uint256' },
          { name: 'cliff', type: 'uint256' },
          { name: 'duration', type: 'uint256' },
          { name: 'category', type: 'uint8' },
          { name: 'maxParticipants', type: 'uint256' },
          { name: 'currentParticipants', type: 'uint256' },
          { name: 'isActive', type: 'bool' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    name: 'selectVestingPackage',
    type: 'function',
    inputs: [{ name: '_packageId', type: 'uint256' }],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    name: 'TokensReleased',
    type: 'event',
    inputs: [
      { name: 'investor', type: 'address', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false }
    ],
    anonymous: false
  },
  {
    name: 'VestingPackageSelected',
    type: 'event',
    inputs: [
      { name: 'investor', type: 'address', indexed: true },
      { name: 'packageId', type: 'uint256', indexed: false },
      { name: 'amount', type: 'uint256', indexed: false }
    ],
    anonymous: false
  }
] as const

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
   Vesting Categories
   ============================ */
export const VESTING_CATEGORIES = {
  0: "🚀 Pre-Sale",
  1: "🌱 Ecosystem Grants", 
  2: "👥 Team & Advisors",
  3: "🤝 Strategic Partners",
  4: "💰 Reserve & Treasury"
} as const