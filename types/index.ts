export type Network = keyof typeof import('../utils/constants').NETWORK_CONFIG

export interface VestingInfo {
  packageId: bigint
  totalAmount: bigint
  releasedAmount: bigint
  lockedAmount: bigint
  releasableAmount: bigint
  startTime: bigint
  cliffEnd: bigint
  vestingEnd: bigint
  category: number
}

export interface GlobalStats {
  totalAllocated: bigint
  totalReleased: bigint
  totalParticipants: bigint
  totalReleasable: bigint
}

export interface VestingPackage {
  packageId: bigint
  name: string
  totalAmount: bigint
  price: bigint
  cliff: bigint
  duration: bigint
  category: number
  maxParticipants: bigint
  currentParticipants: bigint
  isActive: boolean
}

export interface PersonalStats {
  totalAllocated: number
  totalReleased: number
  availableToRelease: number
  lockedAmount: number
  vestedPercentage: number
  vestingProgress: number
}

export interface FormattedGlobalStats {
  totalAllocated: number
  totalReleased: number
  totalParticipants: number
  totalReleasable: number
  totalLocked: number
  averageAllocation: number
}