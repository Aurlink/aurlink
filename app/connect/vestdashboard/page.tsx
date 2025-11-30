'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import CustomConnectButton from '../../../components/CustomConnectButton'
import { 
  CONTRACT_ADDRESSES, 
  AURLINK_VESTING_ABI, 
  NETWORK_CONFIG,
  VESTING_CATEGORIES,
  PACKAGE_CATEGORY_COLORS,
  PACKAGE_CATEGORY_ICONS
} from '../../../utils/constants'
import { 
  formatNumber, 
  formatTokenAmount, 
  formatDate, 
  calculateVestingProgress,
  calculatePercentage
} from '../../../utils/formatters'
import { VestingInfo, GlobalStats, Network } from '../../../types'
import NetworkSelector from '../../../components/ui/NetworkSelector'
import StatsCard from '../../../components/ui/StatsCard'

// Dynamic Package Card Component
function PackageCard({ 
  package: pkg, 
  onSelect 
}: { 
  package: any
  onSelect: (pkg: any) => void 
}) {
  const getProgressPercentage = (pkg: any) => {
    if (!pkg.maxAllocations || pkg.maxAllocations === 0) return 0
    return (Number(pkg.currentAllocations) / Number(pkg.maxAllocations)) * 100
  }

  const getAvailableSlots = (pkg: any) => {
    if (!pkg.maxAllocations) return 'Unlimited'
    return Number(pkg.maxAllocations) - Number(pkg.currentAllocations)
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

  const hasAllocationLimits = pkg.minAllocation && pkg.maxAllocation

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-gradient-to-br ${PACKAGE_CATEGORY_COLORS[pkg.category as keyof typeof PACKAGE_CATEGORY_COLORS] || 'from-gray-600 to-gray-700'} rounded-2xl p-6 border border-gray-600 cursor-pointer transition-all duration-300 hover:shadow-2xl relative overflow-hidden group`}
      onClick={() => onSelect(pkg)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="text-3xl bg-white/10 p-2 rounded-xl">
            {PACKAGE_CATEGORY_ICONS[pkg.category as keyof typeof PACKAGE_CATEGORY_ICONS] || '📦'}
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">{pkg.name}</h3>
            <div className="text-xs bg-black/40 px-3 py-1 rounded-full text-white mt-1 inline-block">
              {VESTING_CATEGORIES[pkg.category as keyof typeof VESTING_CATEGORIES]}
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-200 text-sm mb-6 leading-relaxed relative z-10">{pkg.description}</p>
      
      {/* Vesting Details Grid */}
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

      {/* Allocation Info */}
      <div className="space-y-3 mb-4 relative z-10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Allocation:</span>
          <span className="text-white font-semibold bg-black/30 px-2 py-1 rounded">
            {hasAllocationLimits ? 
              `${formatNumber(Number(pkg.minAllocation) / 10**18)} - ${formatNumber(Number(pkg.maxAllocation) / 10**18)} AUR` : 
              'Flexible Amounts'
            }
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Available:</span>
          <span className="text-white font-semibold">
            {pkg.maxAllocations ? 
              `${getAvailableSlots(pkg)} / ${pkg.maxAllocations} slots` : 
              'Unlimited Participation'
            }
          </span>
        </div>
      </div>

      {/* Progress Bar - Only show if there are limits */}
      {pkg.maxAllocations && (
        <div className="relative z-10">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Package Capacity</span>
            <span>{getProgressPercentage(pkg).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(getProgressPercentage(pkg), 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Select Button */}
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

// Premium Package Selection Modal
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
  onPackageSelect: (packageId: number, amount: string) => void
  isProcessing: boolean
}) {
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null)
  const [allocationAmount, setAllocationAmount] = useState('')
  const [step, setStep] = useState<'select' | 'allocate'>('select')
  const [customAmount, setCustomAmount] = useState(true)

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg)
    setStep('allocate')
    setAllocationAmount('')
    setCustomAmount(true)
  }

  const handleBack = () => {
    if (step === 'allocate') {
      setStep('select')
      setSelectedPackage(null)
      setAllocationAmount('')
      setCustomAmount(true)
    } else {
      onClose()
    }
  }

  const handleAllocationSubmit = () => {
    if (!selectedPackage || !allocationAmount) return
    onPackageSelect(selectedPackage.packageId, allocationAmount)
  }

  const isAmountValid = () => {
    if (!selectedPackage || !allocationAmount) return false
    const amount = parseFloat(allocationAmount)
    
    // No limits - any positive amount is valid
    return amount > 0 && !isNaN(amount)
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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {step === 'select' ? 'Select Vesting Package' : 'Flexible Token Allocation'}
              </h2>
              <p className="text-gray-400 text-lg">
                {step === 'select' 
                  ? 'Choose your preferred vesting schedule - No allocation limits' 
                  : `Allocate any amount to ${selectedPackage?.name}`
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
              // Package Selection Grid
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
              // Flexible Allocation Form
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
                        <div className="text-white font-bold text-xl">
                          {selectedPackage.maxAllocations ? 'Limited' : 'Unlimited'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  {/* Flexible Amount Input */}
                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-600">
                    <label className="block text-gray-400 text-lg font-semibold mb-4">
                      Enter Your Desired Allocation Amount (AUR)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={allocationAmount}
                        onChange={(e) => setAllocationAmount(e.target.value)}
                        placeholder="Enter any amount you wish to vest..."
                        className="w-full bg-gray-800 border-2 border-gray-600 rounded-xl px-6 py-5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all duration-300 text-xl font-semibold pr-24"
                        min="2000"
                        step="any"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-gray-400 text-lg font-semibold">AUR</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-gray-400 mt-3">
                      <span>Minimum: 2000 AUR</span>
                      <span>Maximum: Your available balance</span>
                    </div>
                    
                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {[100, 1000, 5000, 10000].map((amount) => (
                        <motion.button
                          key={amount}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setAllocationAmount(amount.toString())}
                          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-200"
                        >
                          {formatNumber(amount)}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Vesting Summary */}
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

                  {/* Commit Button */}
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

// Main Premium Vesting Portal Component
export default function AURLINKVestingPortal() {
  // Wagmi hooks
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  // State
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [network, setNetwork] = useState<Network>('arbitrum')
  const [vestingInfo, setVestingInfo] = useState<VestingInfo | null>(null)
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null)
  const [availablePackages, setAvailablePackages] = useState<any[]>([])
  const [showPackageSelection, setShowPackageSelection] = useState(false)
  const [loading, setLoading] = useState(false)

  const contractAddress = CONTRACT_ADDRESSES[network] as `0x${string}`

  /* ============================
     DYNAMIC CONTRACT DATA LOADING
  ============================ */
  const loadVestingInfo = useCallback(async () => {
    if (!publicClient || !address) {
      setVestingInfo(null)
      return
    }

    try {
      const info = await publicClient.readContract({
        address: contractAddress,
        abi: AURLINK_VESTING_ABI,
        functionName: 'getVestingInfo',
        args: [address]
      }) as any[]

      // Only set vesting info if user actually has a schedule
      if (info[0] > 0) {
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
  }, [publicClient, address, contractAddress])

  const loadAvailablePackages = useCallback(async () => {
    if (!publicClient) {
      // If contract not available, use empty array - packages will be loaded dynamically
      setAvailablePackages([])
      return
    }

    try {
      const packages = await publicClient.readContract({
        address: contractAddress,
        abi: AURLINK_VESTING_ABI,
        functionName: 'getActivePackages',
      }) as any[]
      
      setAvailablePackages(packages)
    } catch (error) {
      console.error('Failed to load packages from contract:', error)
      setAvailablePackages([])
    }
  }, [publicClient, contractAddress])

  const loadGlobalStats = useCallback(async () => {
    if (!publicClient) {
      // Set minimal default stats if contract unavailable
      setGlobalStats({
        totalAllocated: 0n,
        totalReleased: 0n,
        totalParticipants: 0n,
        totalReleasable: 0n
      })
      return
    }

    try {
      // Try to get token info from contract
      const tokenInfo = await publicClient.readContract({
        address: contractAddress,
        abi: AURLINK_VESTING_ABI,
        functionName: 'getTokenInfo',
      }) as any[]

      setGlobalStats({
        totalAllocated: BigInt(tokenInfo[1] || 0), // totalVested
        totalReleased: BigInt(tokenInfo[2] || 0),  // totalReleased
        totalParticipants: 0n, // Would need separate tracking
        totalReleasable: BigInt(tokenInfo[2] || 0) - BigInt(tokenInfo[1] || 0)
      })
    } catch (error) {
      console.error('Failed to load global stats from contract:', error)
      // Set zero stats - will be updated dynamically as users participate
      setGlobalStats({
        totalAllocated: 0n,
        totalReleased: 0n,
        totalParticipants: 0n,
        totalReleasable: 0n
      })
    }
  }, [publicClient, contractAddress])

  /* ============================
     FLEXIBLE PACKAGE SELECTION
  ============================ */
  const handlePackageSelection = async (packageId: number, amount: string) => {
    if (!isConnected || !walletClient || !address) {
      setErrorMessage('Please connect your wallet')
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      // Convert amount to wei (assuming 18 decimals)
      const amountWei = BigInt(parseFloat(amount) * 10**18)
      const startTime = Math.floor(Date.now() / 1000)

      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: AURLINK_VESTING_ABI,
        functionName: 'allocateVesting',
        args: [address, packageId, amountWei, startTime],
      })

      setSuccessMessage('Committing to flexible vesting... Waiting for confirmation...')
      
      const receipt = await publicClient?.waitForTransactionReceipt({ hash })
      
      if (receipt?.status === 'success') {
        setSuccessMessage(`✅ Successfully committed ${amount} AUR to flexible vesting!`)
        setShowPackageSelection(false)
        // Reload data to reflect changes
        await loadVestingInfo()
        await loadGlobalStats()
      } else {
        throw new Error('Transaction failed')
      }

    } catch (error: any) {
      console.error('Vesting commitment failed:', error)
      setErrorMessage(error.message || error.shortMessage || 'Transaction failed')
    } finally {
      setIsProcessing(false)
    }
  }

  /* ============================
     DYNAMIC PACKAGE GENERATION
  ============================ */
  const dynamicPackages = useMemo(() => {
    // If contract provides packages, use them
    if (availablePackages.length > 0) {
      return availablePackages
    }

    // Generate dynamic packages based on common vesting strategies
    const basePackages = [
      {
        packageId: 1,
        name: "Flexible Short-term",
        description: "Perfect for testing waters with minimal lock-up period",
        cliff: 30 * 24 * 60 * 60, // 1 month
        duration: 90 * 24 * 60 * 60, // 3 months
        category: 4,
        maxAllocations: null, // Unlimited
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 2,
        name: "Balanced Medium-term", 
        description: "Ideal balance between commitment and flexibility",
        cliff: 90 * 24 * 60 * 60, // 3 months
        duration: 360 * 24 * 60 * 60, // 12 months
        category: 1,
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 3,
        name: "Committed Long-term",
        description: "For maximum ecosystem alignment and long-term growth",
        cliff: 180 * 24 * 60 * 60, // 6 months
        duration: 720 * 24 * 60 * 60, // 24 months
        category: 3,
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 4,
        name: "Strategic Partner",
        description: "Extended vesting for deep ecosystem commitment",
        cliff: 365 * 24 * 60 * 60, // 12 months
        duration: 1095 * 24 * 60 * 60, // 36 months
        category: 7,
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      }
    ]

    return basePackages
  }, [availablePackages])

  /* ============================
     Data Polling
  ============================ */
  useEffect(() => {
    if (!isConnected) return

    setLoading(true)
    Promise.all([
      loadVestingInfo(),
      loadAvailablePackages(),
      loadGlobalStats()
    ]).finally(() => {
      setLoading(false)
    })

    const interval = setInterval(() => {
      loadVestingInfo()
      loadGlobalStats()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [isConnected, loadVestingInfo, loadAvailablePackages, loadGlobalStats])

  /* ============================
     Token Release Function
  ============================ */
  const releaseTokens = async () => {
    if (!isConnected || !walletClient || !address) {
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
      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: AURLINK_VESTING_ABI,
        functionName: 'releaseTokens',
      })

      setSuccessMessage('Token release submitted! Waiting for confirmation...')
      
      const receipt = await publicClient?.waitForTransactionReceipt({ hash })
      
      if (receipt?.status === 'success') {
        const releasedAmount = formatTokenAmount(vestingInfo.releasableAmount)
        setSuccessMessage(`✅ Successfully released ${releasedAmount.toLocaleString()} AUR tokens!`)
        await loadVestingInfo()
        await loadGlobalStats()
      } else {
        throw new Error('Transaction failed')
      }

    } catch (error: any) {
      console.error('Token release failed:', error)
      setErrorMessage(error.message || error.shortMessage || 'Transaction failed')
    } finally {
      setIsProcessing(false)
    }
  }

  /* ============================
     Dynamic Stats Calculations
  ============================ */
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

  /* ============================
     Premium Render Component
  ============================ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Premium Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl text-white font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AurLink Flexible Vesting
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl">
              Unlimited participation, flexible amounts. 
              <span className="text-cyan-400 font-semibold"> Vest any amount you want</span> to support ecosystem growth.
            </p>
          </div>
          <CustomConnectButton />
        </div>

        {/* Network Selection */}
        <NetworkSelector network={network} setNetwork={setNetwork} />

        {/* Status Messages */}
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6"
          >
            <div className="text-red-400 text-sm">{errorMessage}</div>
          </motion.div>
        )}

        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6"
          >
            <div className="text-green-400 text-sm">{successMessage}</div>
          </motion.div>
        )}

        {!isConnected ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">Connect your wallet to access flexible vesting</div>
          </div>
        ) : loading ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">Loading dynamic vesting data...</div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Premium Package Selection Modal */}
            <PackageSelectionModal
              isOpen={showPackageSelection}
              onClose={() => setShowPackageSelection(false)}
              packages={dynamicPackages}
              onPackageSelect={handlePackageSelection}
              isProcessing={isProcessing}
            />

            {/* FLEXIBLE VESTING HERO SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl p-12 border border-cyan-500/30 shadow-2xl"
            >
              <div className="text-center max-w-4xl mx-auto">
                <div className="text-7xl mb-6">🚀</div>
                <h2 className="text-5xl font-bold text-white mb-6">
                  Unlimited Vesting Freedom
                </h2>
                <p className="text-gray-300 text-2xl mb-8 leading-relaxed">
                  No allocation limits. No participation caps. 
                  <span className="text-cyan-400 font-semibold"> Vest any amount</span> from micro to mega allocations. 
                  Every AUR token contributes to ecosystem health.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPackageSelection(true)}
                  className="px-14 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 text-2xl shadow-2xl"
                >
                  Start Flexible Vesting
                </motion.button>
                <p className="text-cyan-400 text-xl mt-6 font-semibold">
                  💫 Complete flexibility for ecosystem growth
                </p>
              </div>
            </motion.div>

            {/* DYNAMIC VESTING PACKAGES - ALWAYS VISIBLE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Flexible Vesting Strategies</h2>
                <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                  Choose from dynamic vesting packages designed for maximum flexibility. 
                  All packages support <span className="text-cyan-400">unlimited allocations</span> and participation.
                </p>
              </div>

              {/* Dynamic Packages Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-8">
                {dynamicPackages.map((pkg) => (
                  <PackageCard 
                    key={pkg.packageId} 
                    package={pkg} 
                    onSelect={() => setShowPackageSelection(true)}
                  />
                ))}
              </div>
            </motion.div>

            {/* DYNAMIC GLOBAL STATISTICS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Ecosystem Growth Metrics</h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {[
                  { label: 'Total Vested', value: formattedGlobalStats.totalAllocated, color: 'text-white', unit: 'AUR' },
                  { label: 'Total Released', value: formattedGlobalStats.totalReleased, color: 'text-cyan-400', unit: 'AUR' },
                  { label: 'Available to Claim', value: formattedGlobalStats.totalReleasable, color: 'text-green-400', unit: 'AUR' },
                  { label: 'Currently Locked', value: formattedGlobalStats.totalLocked, color: 'text-purple-400', unit: 'AUR' },
                  { label: 'Active Participants', value: formattedGlobalStats.totalParticipants, color: 'text-yellow-400', unit: '' },
                  { label: 'Ecosystem Health', value: formattedGlobalStats.averageAllocation > 0 ? 'Healthy' : 'Growing', color: 'text-blue-400', unit: '' },
                ].map((stat, index) => (
                  <StatsCard
                    key={index}
                    label={stat.label}
                    value={typeof stat.value === 'string' ? stat.value : formatNumber(stat.value)}
                    unit={stat.unit}
                    color={stat.color}
                  />
                ))}
              </div>
            </motion.div>

            {/* PERSONAL VESTING SCHEDULE (Dynamic - Only if exists) */}
            {hasVestingSchedule && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700 shadow-xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white">Your Vesting Schedule</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPackageSelection(true)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                  >
                    + Add More Vesting
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Total Committed', value: personalStats.totalAllocated, color: 'text-white', unit: 'AUR' },
                    { label: 'Total Released', value: personalStats.totalReleased, color: 'text-cyan-400', unit: 'AUR' },
                    { label: 'Available Now', value: personalStats.availableToRelease, color: 'text-green-400', unit: 'AUR' },
                    { label: 'Future Vesting', value: personalStats.lockedAmount, color: 'text-purple-400', unit: 'AUR' },
                  ].map((stat, index) => (
                    <StatsCard
                      key={index}
                      label={stat.label}
                      value={formatNumber(stat.value)}
                      unit={stat.unit}
                      color={stat.color}
                    />
                  ))}
                </div>

                {/* Vesting Progress */}
                {vestingInfo && (
                  <div className="mb-8">
                    <div className="flex justify-between text-gray-400 mb-3">
                      <span className="font-semibold">Overall Vesting Progress</span>
                      <span className="font-bold">{personalStats.vestingProgress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4 mb-3">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-4 rounded-full transition-all duration-1000 shadow-lg"
                        style={{ width: `${personalStats.vestingProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-gray-500 text-sm">
                      <span>Cliff Ends: {formatDate(Number(vestingInfo.cliffEnd))}</span>
                      <span>Vesting Complete: {formatDate(Number(vestingInfo.vestingEnd))}</span>
                    </div>
                  </div>
                )}

                {/* Token Release */}
                {personalStats.availableToRelease > 0 && (
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={releaseTokens}
                      disabled={isProcessing}
                      className="px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 text-lg shadow-2xl"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          Releasing {formatNumber(personalStats.availableToRelease)} AUR...
                        </div>
                      ) : (
                        `Release ${formatNumber(personalStats.availableToRelease)} AUR Tokens`
                      )}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}