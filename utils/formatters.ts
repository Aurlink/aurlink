/* ============================
   Number Formatting
   ============================ */
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 100_000) return (num / 1_000).toFixed(0) + 'K'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toLocaleString()
}

export const formatTokenAmount = (amount: bigint, decimals: number = 18): number => {
  return Number(amount) / Math.pow(10, decimals)
}

export const formatTime = (seconds: bigint): string => {
  const days = Number(seconds) / 86400
  if (days >= 365) return `${(days / 365).toFixed(1)} years`
  if (days >= 30) return `${(days / 30).toFixed(1)} months`
  if (days >= 7) return `${(days / 7).toFixed(1)} weeks`
  return `${days.toFixed(0)} days`
}

export const formatDate = (timestamp: bigint): string => {
  return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatDateTime = (timestamp: bigint): string => {
  return new Date(Number(timestamp) * 1000).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/* ============================
   Vesting Calculations
   ============================ */
export const calculateVestingProgress = (
  startTime: bigint, 
  cliffEnd: bigint, 
  vestingEnd: bigint
): number => {
  const now = BigInt(Math.floor(Date.now() / 1000))
  
  if (now < cliffEnd) return 0
  if (now >= vestingEnd) return 100
  
  const totalVestingTime = vestingEnd - cliffEnd
  const elapsedVestingTime = now - cliffEnd
  return Math.min(100, Number((elapsedVestingTime * 10000n) / totalVestingTime) / 100)
}

export const calculateTimeUntilUnlock = (unlockTime: bigint): string => {
  const now = BigInt(Math.floor(Date.now() / 1000))
  const timeLeft = Number(unlockTime - now)
  
  if (timeLeft <= 0) return 'Unlocked'
  
  const days = Math.floor(timeLeft / 86400)
  const hours = Math.floor((timeLeft % 86400) / 3600)
  
  if (days > 0) return `${days}d ${hours}h`
  return `${hours}h`
}

/* ============================
   Validation Helpers
   ============================ */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const truncateAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

/* ============================
   Price Formatting
   ============================ */
export const formatPrice = (price: bigint, decimals: number = 18): string => {
  const amount = formatTokenAmount(price, decimals)
  if (amount === 0) return 'FREE'
  return `${amount.toLocaleString()} ETH`
}

/* ============================
   Percentage Calculations
   ============================ */
export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0
  return (part / total) * 100
}