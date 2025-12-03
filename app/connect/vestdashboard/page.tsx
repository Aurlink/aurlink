'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import CustomConnectButton from '../../../components/CustomConnectButton'
import { 
  CONTRACT_ADDRESSES, 
  NETWORK_CONFIG,
  VESTING_CATEGORIES,
  PACKAGE_CATEGORY_COLORS,
  PACKAGE_CATEGORY_ICONS
} from '../../../utils/constants'
import { 
  formatNumber, 
  formatTokenAmount, 
  formatDate, 
  calculateVestingProgress
} from '../../../utils/formatters'
import { VestingInfo, GlobalStats, Network } from '../../../types'
import NetworkSelector from '../../../components/ui/NetworkSelector'
import StatsCard from '../../../components/ui/StatsCard'

// ✅ CORRECT ERC20 ABI WITH APPROVE FUNCTION
const ERC20_ABI = [
  {
    "name": "approve",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "type": "bool" }]
  },
  {
    "name": "balanceOf",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "account", "type": "address" }],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "name": "allowance",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      { "name": "owner", "type": "address" },
      { "name": "spender", "type": "address" }
    ],
    "outputs": [{ "type": "uint256" }]
  },
  {
    "name": "decimals",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [{ "type": "uint8" }]
  }
] as const

// ✅ VESTING CONTRACT ABI (COMPLETE VERSION WITH ALL NEEDED FUNCTIONS)
const VESTING_CONTRACT_ABI = [
  // User functions
  {
    "type": "function",
    "name": "createVestingForSelf",
    "inputs": [
      {"name": "packageId", "type": "uint256"},
      {"name": "amount", "type": "uint256"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "releaseTokens",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  
  // View functions
  {
    "type": "function",
    "name": "getVestingInfo",
    "inputs": [{"name": "beneficiary", "type": "address"}],
    "outputs": [
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint8"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getActivePackages",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "components": [
          {"name": "packageId", "type": "uint256"},
          {"name": "name", "type": "string"},
          {"name": "description", "type": "string"},
          {"name": "cliff", "type": "uint256"},
          {"name": "duration", "type": "uint256"},
          {"name": "category", "type": "uint8"},
          {"name": "isActive", "type": "bool"}
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTokenInfo",
    "inputs": [],
    "outputs": [
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPackageInfo",
    "inputs": [{"name": "_packageId", "type": "uint256"}],
    "outputs": [
      {"name": "", "type": "string"},
      {"name": "", "type": "string"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint256"},
      {"name": "", "type": "uint8"},
      {"name": "", "type": "bool"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasSufficientBalance",
    "inputs": [
      {"name": "user", "type": "address"},
      {"name": "amount", "type": "uint256"}
    ],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasSufficientApproval",
    "inputs": [
      {"name": "user", "type": "address"},
      {"name": "amount", "type": "uint256"}
    ],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasExistingVesting",
    "inputs": [{"name": "user", "type": "address"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "aurlinkToken",
    "inputs": [],
    "outputs": [{"name": "", "type": "address"}],
    "stateMutability": "view"
  }
] as const

// ✅ PRECISE toWei HELPER (REQUIRED)
function toWei(amountStr: string): bigint {
  const [whole, fraction = ""] = amountStr.split(".")
  const frac = (fraction + "0".repeat(18)).slice(0, 18)
  const valStr = whole + frac
  const cleaned = valStr.replace(/^0+(?=\d)/, "") || "0"
  return BigInt(cleaned)
}

// ✅ PREFLIGHT CHECKS FUNCTION (REQUIRED)
const preflightChecks = async (user: string, packageId: number, amountWei: bigint, publicClient: any, contractAddress: `0x${string}`) => {
  if (!publicClient) throw new Error('Not connected')
  
  console.log('🔍 Running preflight checks...')
  
  // 1) Package validity & active status
  try {
    const pkg = await publicClient.readContract({
      address: contractAddress,
      abi: VESTING_CONTRACT_ABI,
      functionName: 'getPackageInfo',
      args: [BigInt(packageId)]
    }) as [string, string, bigint, bigint, number, boolean]

    const isActive = pkg[5]
    console.log(`Package ${packageId} active:`, isActive)
    if (!isActive) throw new Error('Package is not active')
  } catch (err) {
    throw new Error('Invalid or inactive packageId')
  }

  // 2) User token balance
  const hasBalance = await publicClient.readContract({
    address: contractAddress,
    abi: VESTING_CONTRACT_ABI,
    functionName: 'hasSufficientBalance',
    args: [user, amountWei]
  }) as boolean
  
  console.log('Has sufficient balance:', hasBalance)
  if (!hasBalance) throw new Error('Insufficient token balance')

  // 3) Allowance/approval
  const hasApproval = await publicClient.readContract({
    address: contractAddress,
    abi: VESTING_CONTRACT_ABI,
    functionName: 'hasSufficientApproval',
    args: [user, amountWei]
  }) as boolean
  
  console.log('Has sufficient approval:', hasApproval)

  // 4) Check user doesn't already have vesting
  const existing = await publicClient.readContract({
    address: contractAddress,
    abi: VESTING_CONTRACT_ABI,
    functionName: 'hasExistingVesting',
    args: [user]
  }) as boolean
  
  console.log('Has existing vesting:', existing)
  if (existing) throw new Error('User already has an existing vesting schedule')

  return true
}

// ✅ Package Card Component (keep your existing)
function PackageCard({ 
  package: pkg, 
  onSelect 
}: { 
  package: any
  onSelect: (pkg: any) => void 
}) {
  const formatDuration = (seconds: bigint) => {
    const days = Number(seconds) / (24 * 60 * 60)
    if (days >= 365) {
      const years = days / 365
      return `${years.toFixed(years % 1 === 0 ? 0 : 1)} year${years > 1 ? 's' : ''}`
    } else if (days >= 30) {
      const months = days / 30
      return `${months.toFixed(months % 1 === 0 ? 0 : 1)} month${months > 1 ? 's' : ''}`
    } else {
      return `${Math.round(days)} day${days > 1 ? 's' : ''}`
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-gradient-to-br ${PACKAGE_CATEGORY_COLORS[pkg.category as keyof typeof PACKAGE_CATEGORY_COLORS] || 'from-gray-600 to-gray-700'} rounded-2xl p-6 border border-gray-600 cursor-pointer transition-all duration-300 hover:shadow-2xl relative overflow-hidden group`}
      onClick={() => onSelect(pkg)}
    >
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="text-3xl bg-white/10 p-2 rounded-xl">
            {PACKAGE_CATEGORY_ICONS[pkg.category as keyof typeof PACKAGE_CATEGORY_ICONS] || '📦'}
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">{pkg.name}</h3>
            <div className="text-xs bg-black/40 px-3 py-1 rounded-full text-white mt-1 inline-block">
              {VESTING_CATEGORIES[pkg.category as keyof typeof VESTING_CATEGORIES] || 'Flexible'}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-200 text-sm mb-6 leading-relaxed relative z-10">{pkg.description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div className="bg-black/20 rounded-xl p-3 text-center">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Cliff Period</div>
          <div className="text-white font-bold text-lg">{formatDuration(pkg.cliff)}</div>
        </div>
        <div className="bg-black/20 rounded-xl p-3 text-center">
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Vesting Duration</div>
          <div className="text-white font-bold text-lg">{formatDuration(pkg.duration)}</div>
        </div>
      </div>

      <div className="space-y-3 mb-4 relative z-10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Allocation:</span>
          <span className="text-white font-semibold bg-green-500/20 px-3 py-1 rounded-full">
            ⚡ NO LIMITS
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Participation:</span>
          <span className="text-white font-semibold bg-purple-500/20 px-3 py-1 rounded-full">
            🌟 UNLIMITED
          </span>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 rounded-xl transition-all duration-200 border border-white/20 relative z-10"
      >
        Select Package
      </motion.button>
    </motion.div>
  )
}

// ✅ Package Selection Modal Component (keep your existing)
function PackageSelectionModal({ 
  isOpen, 
  onClose, 
  packages, 
  onPackageSelect,
  isProcessing 
}: { 
  isOpen: boolean
  onClose: () => void
  packages: any[]
  onPackageSelect: (packageId: number, amount: string) => Promise<void>
  isProcessing: boolean
}) {
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null)
  const [allocationAmount, setAllocationAmount] = useState('')
  const [step, setStep] = useState<'select' | 'allocate'>('select')
  const [localError, setLocalError] = useState<string | null>(null)

  const handlePackageSelect = (pkg: any) => {
    console.log('Package selected:', pkg.name)
    setSelectedPackage(pkg)
    setStep('allocate')
    setAllocationAmount('')
    setLocalError(null)
  }

  const handleBack = () => {
    if (step === 'allocate') {
      setStep('select')
      setSelectedPackage(null)
      setAllocationAmount('')
      setLocalError(null)
    } else {
      onClose()
    }
  }

  const handleAllocationSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('COMMIT BUTTON CLICKED!')
    
    if (!selectedPackage) {
      setLocalError('Please select a package first')
      return
    }
    
    if (!allocationAmount || allocationAmount.trim() === '') {
      setLocalError('Please enter an allocation amount')
      return
    }
    
    const amountNum = parseFloat(allocationAmount)
    if (isNaN(amountNum) || amountNum < 2000) {
      setLocalError('Amount must be at least 2,000 AUR')
      return
    }
    
    try {
      await onPackageSelect(selectedPackage.packageId, allocationAmount)
    } catch (error: any) {
      setLocalError(error.message || 'Failed to process transaction')
    }
  }

  const isAmountValid = () => {
    if (!selectedPackage || !allocationAmount) return false
    const amount = parseFloat(allocationAmount)
    return amount >= 2000 && !isNaN(amount)
  }

  const formatDuration = (seconds: bigint) => {
    const days = Number(seconds) / (24 * 60 * 60)
    if (days >= 365) {
      const years = days / 365
      return `${years.toFixed(years % 1 === 0 ? 0 : 1)} year${years > 1 ? 's' : ''}`
    } else if (days >= 30) {
      const months = days / 30
      return `${months.toFixed(months % 1 === 0 ? 0 : 1)} month${months > 1 ? 's' : ''}`
    } else {
      return `${Math.round(days)} day${days > 1 ? 's' : ''}`
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[100] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-8 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {step === 'select' ? 'Select Vesting Package' : 'Flexible Token Allocation'}
              </h2>
              <p className="text-gray-400 text-lg">
                {step === 'select' 
                  ? 'Choose your preferred vesting schedule' 
                  : `Allocate AUR to ${selectedPackage?.name}`
                }
              </p>
            </div>
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-white transition-all duration-200 p-3 hover:bg-white/10 rounded-2xl"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-8 overflow-y-auto max-h-[70vh]">
            {step === 'select' ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                  <PackageCard 
                    key={pkg.packageId} 
                    package={pkg} 
                    onSelect={handlePackageSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {selectedPackage && (
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 mb-8 border border-gray-600 shadow-xl">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="text-5xl bg-gradient-to-br from-cyan-500 to-purple-600 p-4 rounded-2xl">
                        {PACKAGE_CATEGORY_ICONS[selectedPackage.category as keyof typeof PACKAGE_CATEGORY_ICONS] || '📦'}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-2xl mb-2">{selectedPackage.name}</h3>
                        <p className="text-gray-400 text-lg">{selectedPackage.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center bg-black/30 rounded-2xl p-5">
                        <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Cliff Period</div>
                        <div className="text-white font-bold text-xl">{formatDuration(selectedPackage.cliff)}</div>
                      </div>
                      <div className="text-center bg-black/30 rounded-2xl p-5">
                        <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Vesting Duration</div>
                        <div className="text-white font-bold text-xl">{formatDuration(selectedPackage.duration)}</div>
                      </div>
                      <div className="text-center bg-black/30 rounded-2xl p-5">
                        <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Allocation</div>
                        <div className="text-white font-bold text-xl">Flexible</div>
                      </div>
                      <div className="text-center bg-black/30 rounded-2xl p-5">
                        <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Participation</div>
                        <div className="text-white font-bold text-xl">Unlimited</div>
                      </div>
                    </div>
                  </div>
                )}

                {localError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="text-red-400 text-sm">{localError}</div>
                  </div>
                )}

                <div className="space-y-8">
                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-600">
                    <label className="block text-gray-400 text-lg font-semibold mb-4">
                      Enter Your Desired Allocation Amount (AUR)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={allocationAmount}
                        onChange={(e) => {
                          setAllocationAmount(e.target.value)
                          setLocalError(null)
                        }}
                        placeholder="Enter amount to vest (minimum 2,000 AUR)..."
                        className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all duration-300 text-xl font-semibold pr-24"
                        min="2000"
                        step="any"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-gray-400 text-lg font-semibold">AUR</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-gray-400 mt-3">
                      <span>Minimum: 2,000 AUR</span>
                      <span>Maximum: Your available balance</span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {[2000, 5000, 10000, 25000].map((amount) => (
                        <motion.button
                          key={amount}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setAllocationAmount(amount.toString())
                            setLocalError(null)
                          }}
                          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-200"
                        >
                          {formatNumber(amount)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/20">
                    <h4 className="text-white font-bold text-xl mb-6">Vesting Commitment Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Package Type</div>
                        <div className="text-white font-semibold text-lg">{selectedPackage?.name}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Cliff Period</div>
                        <div className="text-white font-semibold text-lg">{formatDuration(selectedPackage?.cliff)}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Vesting Duration</div>
                        <div className="text-white font-semibold text-lg">{formatDuration(selectedPackage?.duration)}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Your Allocation</div>
                        <div className="text-white font-bold text-xl text-cyan-400">
                          {allocationAmount ? `${formatNumber(parseFloat(allocationAmount))} AUR` : '0 AUR'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAllocationSubmit}
                    disabled={!isAmountValid() || isProcessing}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl py-6 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xl shadow-2xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300" />
                    <span className="relative z-10">
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          Committing {allocationAmount} AUR to Vesting...
                        </div>
                      ) : (
                        `Commit ${allocationAmount || '0'} AUR to Flexible Vesting`
                      )}
                    </span>
                  </motion.button>

                  <div className="text-center space-y-3">
                    <p className="text-cyan-400 text-lg font-semibold">
                      💫 Flexible Vesting - No Limits, Maximum Freedom
                    </p>
                    <p className="text-gray-400 text-lg">
                      By committing, you agree to the {formatDuration(selectedPackage?.cliff)} cliff period 
                      and {formatDuration(selectedPackage?.duration)} total vesting duration
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

// ✅ Main Component
export default function AURLINKVestingPortal() {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [network, setNetwork] = useState<Network>('arbitrum')
  const [vestingInfo, setVestingInfo] = useState<VestingInfo | null>(null)
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null)
  const [availablePackages, setAvailablePackages] = useState<any[]>([])
  const [showPackageSelection, setShowPackageSelection] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tokenAddress, setTokenAddress] = useState<`0x${string}` | null>(null)

  const contractAddress = '0x7915248af8b1a155a59b11d5da0a62311e02cc98' as `0x${string}`

  // Load token address
  const loadTokenAddress = useCallback(async () => {
    if (!publicClient) return
    
    try {
      const address = await publicClient.readContract({
        address: contractAddress,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'aurlinkToken',
      }) as `0x${string}`
      
      setTokenAddress(address)
      console.log('✅ Token address loaded:', address)
    } catch (error) {
      console.error('Failed to load token address:', error)
    }
  }, [publicClient])

  // ✅ FIXED APPROVE TOKENS FUNCTION
  const approveTokens = async (amountWei: bigint): Promise<boolean> => {
    if (!walletClient || !tokenAddress || !address || !publicClient) {
      setErrorMessage('Wallet not connected or missing dependencies')
      return false
    }
    
    try {
      console.log('🔐 Approving tokens...')
      console.log('Token Contract:', tokenAddress)
      console.log('Spender (Vesting Contract):', contractAddress)
      console.log('Amount:', amountWei.toString())
      
      setSuccessMessage('Please approve token spending in your wallet...')
      
      // ✅ USE ERC20_ABI FOR APPROVAL
      const hash = await walletClient.writeContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [contractAddress, amountWei],
      })

      console.log('✅ Approval transaction hash:', hash)
      setSuccessMessage('Approval submitted. Confirm in your wallet...')
      
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      
      if (receipt?.status === 'success') {
        console.log('✅ Tokens approved successfully!')
        setSuccessMessage('✅ Tokens approved successfully!')
        return true
      } else {
        throw new Error('Approval transaction failed')
      }
    } catch (error: any) {
      console.error('❌ Token approval failed:', error)
      const errorMsg = error.shortMessage || error.message || 'Approval failed'
      setErrorMessage(`Token approval failed: ${errorMsg}`)
      return false
    }
  }

  // ✅ FIXED HANDLE PACKAGE SELECTION
  const handlePackageSelection = async (packageId: number, amountStr: string) => {
    console.log('🚀 Creating vesting for package:', packageId, 'amount:', amountStr)
    
    if (!isConnected || !walletClient || !address || !publicClient) {
      setErrorMessage('Please connect your wallet')
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      // Validate amount
      const amountNum = parseFloat(amountStr)
      if (isNaN(amountNum) || amountNum < 2000) {
        throw new Error('Amount must be at least 2,000 AUR')
      }

      // ✅ USE toWei FOR PRECISE CONVERSION
      const amountWei = toWei(amountStr)
      console.log('Amount in wei:', amountWei.toString())

      // Get token address if not loaded
      if (!tokenAddress) {
        await loadTokenAddress()
        if (!tokenAddress) {
          throw new Error('Token address not found')
        }
      }

      // ✅ RUN PREFLIGHT CHECKS BEFORE ANYTHING
      console.log('🔍 Running preflight checks...')
      await preflightChecks(address, packageId, amountWei, publicClient, contractAddress)

      // Step 1: Check if approval is already sufficient
      const hasApproval = await publicClient.readContract({
        address: contractAddress,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'hasSufficientApproval',
        args: [address, amountWei]
      }) as boolean

      if (!hasApproval) {
        console.log('🔐 Step 1: Approving tokens...')
        const approved = await approveTokens(amountWei)
        if (!approved) {
          throw new Error('Token approval failed')
        }
      }

      // Step 2: Create vesting
      console.log('📝 Step 2: Creating vesting schedule...')
      setSuccessMessage('Creating vesting schedule... Confirm in wallet.')
      
      // ✅ USE VESTING_CONTRACT_ABI FOR VESTING CREATION
      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'createVestingForSelf',
        args: [BigInt(packageId), amountWei],
      })

      console.log('✅ Vesting creation hash:', hash)
      setSuccessMessage('Vesting creation submitted! Confirm in wallet...')

      // Wait for confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      
      if (receipt?.status === 'success') {
        console.log('🎉 Vesting created successfully!')
        setSuccessMessage(`✅ Successfully committed ${amountStr} AUR to vesting!`)
        setShowPackageSelection(false)
        
        // Reload data
        await loadVestingInfo()
        await loadGlobalStats()
      } else {
        throw new Error('Vesting creation failed on-chain')
      }

    } catch (error: any) {
      console.error('❌ Transaction failed:', error)
      const errorMsg = error.shortMessage || error.message || 'Transaction failed'
      setErrorMessage(`Transaction failed: ${errorMsg}`)
    } finally {
      setIsProcessing(false)
    }
  }

  // Load vesting info
  const loadVestingInfo = useCallback(async () => {
    if (!publicClient || !address) {
      setVestingInfo(null)
      return
    }

    try {
      const info = await publicClient.readContract({
        address: contractAddress,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'getVestingInfo',
        args: [address]
      }) as any[]

      if (info && info[0] > 0) {
        setVestingInfo({
          packageId: Number(info[0]),
          totalAmount: BigInt(info[1]),
          releasedAmount: BigInt(info[2]),
          releasableAmount: BigInt(info[3]),
          vestedAmount: BigInt(info[4]),
          lockedAmount: BigInt(info[5]),
          startTime: BigInt(info[6]),
          cliffEnd: BigInt(info[7]),
          vestingEnd: BigInt(info[8]),
          category: Number(info[9]),
          packageName: '',
          packageDescription: ''
        })
      } else {
        setVestingInfo(null)
      }
    } catch (error) {
      console.error('Failed to load vesting info:', error)
      setVestingInfo(null)
    }
  }, [publicClient, address])

  // Load packages
  const loadAvailablePackages = useCallback(async () => {
    if (!publicClient) {
      setAvailablePackages([])
      return
    }

    try {
      const packages = await publicClient.readContract({
        address: contractAddress,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'getActivePackages',
      }) as any[]
      
      const mapped = packages.map((p: any) => ({
        packageId: Number(p.packageId),
        name: p.name,
        description: p.description,
        cliff: BigInt(p.cliff),
        duration: BigInt(p.duration),
        category: Number(p.category),
        isActive: p.isActive,
      }))
      
      setAvailablePackages(mapped)
      console.log('✅ Packages loaded:', mapped.length)
    } catch (error) {
      console.error('Failed to load packages:', error)
      setAvailablePackages([])
    }
  }, [publicClient])

  // Load global stats
  const loadGlobalStats = useCallback(async () => {
    if (!publicClient) {
      setGlobalStats({
        totalAllocated: 0n,
        totalReleased: 0n,
        totalParticipants: 0n,
        totalReleasable: 0n
      })
      return
    }

    try {
      const tokenInfo = await publicClient.readContract({
        address: contractAddress,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'getTokenInfo',
      }) as any[]

      setGlobalStats({
        totalAllocated: BigInt(tokenInfo[1] || 0),
        totalReleased: BigInt(tokenInfo[2] || 0),
        totalParticipants: 0n,
        totalReleasable: BigInt(tokenInfo[3] || 0)
      })
    } catch (error) {
      console.error('Failed to load global stats:', error)
      setGlobalStats({
        totalAllocated: 0n,
        totalReleased: 0n,
        totalParticipants: 0n,
        totalReleasable: 0n
      })
    }
  }, [publicClient])

  // Release tokens
  const handleReleaseTokens = async () => {
    if (!isConnected || !walletClient || !address || !publicClient) {
      setErrorMessage('Please connect your wallet')
      return
    }

    if (!vestingInfo || vestingInfo.releasableAmount <= 0) {
      setErrorMessage('No tokens available to release')
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      console.log('🔄 Releasing vested tokens...')
      setSuccessMessage('Releasing tokens... Confirm in wallet.')

      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: VESTING_CONTRACT_ABI,
        functionName: 'releaseTokens',
        args: [],
      })

      console.log('✅ Release transaction hash:', hash)
      setSuccessMessage('Release submitted! Confirm in wallet...')
      
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      
      if (receipt?.status === 'success') {
        const releasedAmount = formatTokenAmount(vestingInfo.releasableAmount)
        setSuccessMessage(`✅ Released ${releasedAmount.toLocaleString()} AUR!`)
        await loadVestingInfo()
        await loadGlobalStats()
      } else {
        throw new Error('Transaction failed')
      }

    } catch (error: any) {
      console.error('Release failed:', error)
      setErrorMessage(error.shortMessage || error.message || 'Transaction failed')
    } finally {
      setIsProcessing(false)
    }
  }

  // Load data on connect
  useEffect(() => {
    if (!isConnected || !publicClient) return

    setLoading(true)
    Promise.all([
      loadTokenAddress(),
      loadVestingInfo(),
      loadAvailablePackages(),
      loadGlobalStats()
    ]).finally(() => {
      setLoading(false)
    })
  }, [isConnected, publicClient, loadTokenAddress, loadVestingInfo, loadAvailablePackages, loadGlobalStats])

  // Stats calculations
  const hasVestingSchedule = useMemo(() => {
    return vestingInfo && vestingInfo.packageId > 0
  }, [vestingInfo])

  const personalStats = useMemo(() => {
    if (!vestingInfo) {
      return {
        totalAllocated: 0,
        totalReleased: 0,
        availableToRelease: 0,
        lockedAmount: 0,
        vestedPercentage: 0,
        vestingProgress: 0,
        totalVested: 0,
        remainingVesting: 0,
      }
    }

    const totalAllocated = formatTokenAmount(vestingInfo.totalAmount)
    const totalReleased = formatTokenAmount(vestingInfo.releasedAmount)
    const availableToRelease = formatTokenAmount(vestingInfo.releasableAmount)
    const lockedAmount = formatTokenAmount(vestingInfo.lockedAmount)
    const totalVested = totalReleased + availableToRelease
    const vestedPercentage = totalAllocated > 0 ? (totalVested / totalAllocated) * 100 : 0
    const vestingProgress = calculateVestingProgress(
      Number(vestingInfo.startTime),
      Number(vestingInfo.cliffEnd),
      Number(vestingInfo.vestingEnd)
    )

    return {
      totalAllocated,
      totalReleased,
      availableToRelease,
      lockedAmount,
      totalVested,
      vestedPercentage,
      vestingProgress,
      remainingVesting: totalAllocated - totalVested
    }
  }, [vestingInfo])

  const formattedGlobalStats = useMemo(() => {
    if (!globalStats) {
      return {
        totalAllocated: 0,
        totalReleased: 0,
        totalParticipants: 0,
        totalReleasable: 0,
        totalLocked: 0,
        averageAllocation: 0
      }
    }

    const totalAllocated = formatTokenAmount(globalStats.totalAllocated)
    const totalReleased = formatTokenAmount(globalStats.totalReleased)
    const totalReleasable = formatTokenAmount(globalStats.totalReleasable)
    const totalParticipants = Number(globalStats.totalParticipants)
    const totalLocked = totalAllocated - totalReleased - totalReleasable
    const averageAllocation = totalParticipants > 0 ? totalAllocated / totalParticipants : 0

    return {
      totalAllocated,
      totalReleased,
      totalParticipants,
      totalReleasable,
      totalLocked,
      averageAllocation
    }
  }, [globalStats])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl text-white font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Aurlink Ecosystem Vesting
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl">
              Complete ecosystem participation with flexible amounts. 
              <span className="text-cyan-400 font-semibold"> Choose from 9 vesting packages</span> to support ecosystem growth.
            </p>
          </div>
          <CustomConnectButton />
        </div>

        <NetworkSelector network={network} setNetwork={setNetwork} />

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="text-red-400 text-sm">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <div className="text-green-400 text-sm">{successMessage}</div>
          </div>
        )}

        {!isConnected ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">Connect your wallet to access ecosystem vesting</div>
          </div>
        ) : loading ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">Loading ecosystem vesting data...</div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Package Selection Modal */}
            <PackageSelectionModal
              isOpen={showPackageSelection}
              onClose={() => setShowPackageSelection(false)}
              packages={availablePackages}
              onPackageSelect={handlePackageSelection}
              isProcessing={isProcessing}
            />

            {/* Stats Display */}
            {hasVestingSchedule && (
              <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl p-8 border border-cyan-500/30">
                <h3 className="text-white text-2xl font-bold mb-6">Your Vesting Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-black/30 rounded-xl p-6">
                    <div className="text-gray-400 text-sm mb-2">Total Allocated</div>
                    <div className="text-white text-2xl font-bold">
                      {formatNumber(personalStats.totalAllocated)} AUR
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-xl p-6">
                    <div className="text-gray-400 text-sm mb-2">Available to Release</div>
                    <div className="text-green-400 text-2xl font-bold">
                      {formatNumber(personalStats.availableToRelease)} AUR
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-xl p-6">
                    <div className="text-gray-400 text-sm mb-2">Vesting Progress</div>
                    <div className="text-white text-2xl font-bold">
                      {personalStats.vestingProgress.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-black/30 rounded-xl p-6">
                    <div className="text-gray-400 text-sm mb-2">Locked Amount</div>
                    <div className="text-yellow-400 text-2xl font-bold">
                      {formatNumber(personalStats.lockedAmount)} AUR
                    </div>
                  </div>
                </div>
                
                {personalStats.availableToRelease > 0 && (
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReleaseTokens}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl py-4 px-6 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Releasing...' : `Release ${formatNumber(personalStats.availableToRelease)} AUR`}
                    </motion.button>
                  </div>
                )}
              </div>
            )}

            {/* Ecosystem Packages */}
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl p-12 border border-cyan-500/30 shadow-2xl">
              <div className="text-center max-w-4xl mx-auto">
                <div className="text-7xl mb-6">🌐</div>
                <h2 className="text-5xl font-bold text-white mb-6">
                  Complete Ecosystem Vesting
                </h2>
                <p className="text-gray-300 text-2xl mb-8 leading-relaxed">
                  Choose from 9 specialized vesting packages for every ecosystem role.
                  <span className="text-cyan-400 font-semibold"> No allocation limits, unlimited participation.</span>
                  Every AUR token contributes to ecosystem health.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPackageSelection(true)}
                  disabled={hasVestingSchedule}
                  className={`px-14 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 text-2xl shadow-2xl ${hasVestingSchedule ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {hasVestingSchedule ? 'Vesting Already Active' : 'Explore Ecosystem Packages'}
                </motion.button>
                {hasVestingSchedule && (
                  <p className="text-yellow-400 mt-4 text-lg">
                    You already have an active vesting schedule. Complete it before starting a new one.
                  </p>
                )}
              </div>
            </div>

            {/* Global Stats */}
            <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl p-8 border border-cyan-500/30">
              <h3 className="text-white text-2xl font-bold mb-6">Global Vesting Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black/30 rounded-xl p-6">
                  <div className="text-gray-400 text-sm mb-2">Total Ecosystem Allocated</div>
                  <div className="text-white text-2xl font-bold">
                    {formatNumber(formattedGlobalStats.totalAllocated)} AUR
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-6">
                  <div className="text-gray-400 text-sm mb-2">Total Released</div>
                  <div className="text-green-400 text-2xl font-bold">
                    {formatNumber(formattedGlobalStats.totalReleased)} AUR
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-6">
                  <div className="text-gray-400 text-sm mb-2">Currently Releasable</div>
                  <div className="text-cyan-400 text-2xl font-bold">
                    {formatNumber(formattedGlobalStats.totalReleasable)} AUR
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-6">
                  <div className="text-gray-400 text-sm mb-2">Total Locked</div>
                  <div className="text-yellow-400 text-2xl font-bold">
                    {formatNumber(formattedGlobalStats.totalLocked)} AUR
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}