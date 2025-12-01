'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import CustomConnectButton from '../../../components/CustomConnectButton'
import { 
  CONTRACT_ADDRESSES, 
  ERC20_ABI, 
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

// VESTING CONTRACT ABI (Updated for the new contract)
const AURLINK_VESTING_ABI = [
  // User functions
  "function createVestingForSelf(uint256 packageId, uint256 amount) external",
  "function releaseTokens() external",
  
  // View functions
  "function getVestingInfo(address) external view returns (uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint8)",
  "function getActivePackages() external view returns ((uint256 packageId, string name, string description, uint256 cliff, uint256 duration, uint8 category, bool isActive)[])",
  "function getTokenInfo() external view returns (uint256,uint256,uint256,uint256,uint256)",
  "function calculateReleasableAmount(address) external view returns (uint256)",
  "function calculateVestedAmount(address) external view returns (uint256)",
  "function hasExistingVesting(address) external view returns (bool)",
  "function hasSufficientApproval(address,uint256) external view returns (bool)",
  "function hasSufficientBalance(address,uint256) external view returns (bool)",
  "function getUserVestingSummary(address) external view returns (uint256,string,uint256,uint256,uint256,uint256,uint256)",
  
  // Admin functions (for reference)
  "function allocateVesting(address,uint256,uint256,uint256) external",
  "function releaseTokensFor(address) external",
  "function pause() external",
  "function unpause() external",
] as const

// AUR Token Address (Replace with your actual token address)
const AURLINK_TOKEN_ADDRESS = '0xYourAURTokenAddress' as `0x${string}`

// Dynamic Package Card Component
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
              {VESTING_CATEGORIES[pkg.category as keyof typeof VESTING_CATEGORIES] || 'Flexible'}
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
            Flexible Amounts
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Participation:</span>
          <span className="text-white font-semibold">
            Unlimited
          </span>
        </div>
      </div>

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
  onPackageSelect: (packageId: number, amount: string) => Promise<void>
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

  const handleAllocationSubmit = async () => {
    if (!selectedPackage || !allocationAmount) return
    await onPackageSelect(selectedPackage.packageId, allocationAmount)
  }

  const isAmountValid = () => {
    if (!selectedPackage || !allocationAmount) return false
    const amount = parseFloat(allocationAmount)
    
    // Minimum 2000 AUR as per your UI
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
                        <div className="text-white font-bold text-xl">Unlimited</div>
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
                      {[2000, 5000, 10000, 25000].map((amount) => (
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
                          Creating Vesting Schedule...
                        </div>
                      ) : (
                        `Commit ${allocationAmount || '0'} AUR to Vesting`
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
  const [tokenBalance, setTokenBalance] = useState<bigint>(0n)

  // Contract addresses
  const contractAddress = '0x7915248af8b1a155a59b11d5da0a62311e02cc98' as `0x${string}`
  // REPLACE with your actual AUR token address:
  const aurTokenAddress = '0x13888BD6d7Fa8CCfD669fC09826Bb8acC1C68855' as `0x${string}`

  // Token approval function
  const approveTokens = useCallback(async (amountWei: bigint): Promise<boolean> => {
    if (!walletClient || !publicClient || !address) return false
    
    try {
      // Check existing allowance first
      const currentAllowance = await publicClient.readContract({
        address: aurTokenAddress,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: [address, contractAddress],
      }) as bigint
      
      // If already approved enough, skip
      if (currentAllowance >= amountWei) {
        return true
      }
      
      // Approve tokens
      const hash = await walletClient.writeContract({
        address: aurTokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [contractAddress, amountWei],
        gas: 100000n,
      })
      
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      return receipt?.status === 'success'
    } catch (error) {
      console.error('Token approval failed:', error)
      return false
    }
  }, [walletClient, publicClient, address, aurTokenAddress, contractAddress])

  // Load token balance
  const loadTokenBalance = useCallback(async () => {
    if (!publicClient || !address) {
      setTokenBalance(0n)
      return
    }

    try {
      const balance = await publicClient.readContract({
        address: aurTokenAddress,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address],
      }) as bigint
      
      setTokenBalance(balance)
    } catch (error) {
      console.error('Failed to load token balance:', error)
      setTokenBalance(0n)
    }
  }, [publicClient, address, aurTokenAddress])

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
        abi: ERC20_ABI,
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
      setAvailablePackages([])
      return
    }

    try {
      const packages = await publicClient.readContract({
        address: contractAddress,
        abi: ERC20_ABI,
        functionName: 'getActivePackages',
      }) as any[]
      
      // Transform contract data to match frontend format
      const formattedPackages = packages.map((pkg: any) => ({
        packageId: Number(pkg.packageId),
        name: pkg.name,
        description: pkg.description,
        cliff: BigInt(pkg.cliff),
        duration: BigInt(pkg.duration),
        category: Number(pkg.category),
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: pkg.isActive
      }))
      
      setAvailablePackages(formattedPackages)
    } catch (error) {
      console.error('Failed to load packages from contract:', error)
      setAvailablePackages([])
    }
  }, [publicClient, contractAddress])

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
        abi: ERC20_ABI,
        functionName: 'getTokenInfo',
      }) as any[]

      setGlobalStats({
        totalAllocated: BigInt(tokenInfo[1] || 0), // totalVested
        totalReleased: BigInt(tokenInfo[2] || 0),  // totalReleased
        totalParticipants: 0n,
        totalReleasable: BigInt(tokenInfo[2] || 0) - BigInt(tokenInfo[1] || 0)
      })
    } catch (error) {
      console.error('Failed to load global stats from contract:', error)
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
    if (!isConnected || !walletClient || !address || !publicClient) {
      setErrorMessage('Please connect your wallet')
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      // Validate amount
      const amountNumber = parseFloat(amount)
      if (isNaN(amountNumber) || amountNumber < 2000) {
        setErrorMessage('Minimum allocation is 2000 AUR')
        return
      }
      
      const amountWei = BigInt(Math.floor(amountNumber * 10**18))

      // Check token balance
      if (tokenBalance < amountWei) {
        setErrorMessage(`Insufficient AUR balance. You have ${formatTokenAmount(tokenBalance)} AUR`)
        return
      }

      // Check if user already has vesting
      try {
        const hasVesting = await publicClient.readContract({
          address: contractAddress,
          abi: ERC20_ABI,
          functionName: 'hasExistingVesting',
          args: [address],
        }) as boolean
        
        if (hasVesting) {
          setErrorMessage('You already have an active vesting schedule')
          return
        }
      } catch (error) {
        // Function might not exist in contract, continue
      }

      // Step 1: Approve tokens
      setSuccessMessage('Approving AUR tokens for vesting...')
      const approved = await approveTokens(amountWei)
      if (!approved) {
        setErrorMessage('Token approval failed. Please try again.')
        return
      }

      // Step 2: Create vesting
      setSuccessMessage('Creating your vesting schedule...')
      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi: ERC20_ABI,
        functionName: 'createVestingForSelf',
        args: [BigInt(packageId), amountWei],
        gas: 300000n,
      })

      setSuccessMessage('Vesting created! Waiting for confirmation...')
      
      const receipt = await publicClient.waitForTransactionReceipt({ 
        hash,
        timeout: 60000,
      })
      
      if (receipt?.status === 'success') {
        setSuccessMessage(`✅ Success! ${formatNumber(amountNumber)} AUR committed to vesting`)
        setShowPackageSelection(false)
        await loadVestingInfo()
        await loadGlobalStats()
        await loadTokenBalance() // Update balance after vesting
      } else {
        setErrorMessage('Transaction failed on-chain')
      }

    } catch (error: any) {
      console.error('Vesting creation failed:', error)
      
      // Better error messages
      if (error.message?.includes('revert')) {
        const revertMsg = error.message.match(/reverted with reason string "(.+)"/)?.[1] || 
                         error.message.match(/reverted with reason string '(.+)'/)?.[1] ||
                         'Contract rejected transaction'
        setErrorMessage(`Contract error: ${revertMsg}`)
      } else if (error.code === 4001) {
        setErrorMessage('Transaction rejected in wallet')
      } else if (error.message?.includes('insufficient funds')) {
        setErrorMessage('Insufficient ETH for gas fees')
      } else {
        setErrorMessage(error.shortMessage || error.message || 'Transaction failed')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  /* ============================
     DYNAMIC PACKAGE GENERATION - ALL 9 ECOSYSTEM PACKAGES
  ============================ */
  const dynamicPackages = useMemo(() => {
    // If contract provides packages, use them
    if (availablePackages.length > 0) {
      return availablePackages
    }

    // Generate ALL 9 ecosystem packages as fallback
    const basePackages = [
      {
        packageId: 1,
        name: "Early Contributors",
        description: "For early supporters and initial contributors to AurLink ecosystem",
        cliff: 180n * 24n * 60n * 60n, // 6 months
        duration: 720n * 24n * 60n * 60n, // 24 months
        category: 0, // EarlyContributors
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 2,
        name: "Ecosystem Development", 
        description: "Grants for ecosystem development and platform growth initiatives",
        cliff: 90n * 24n * 60n * 60n, // 3 months
        duration: 1080n * 24n * 60n * 60n, // 36 months
        category: 1, // EcosystemDevelopment
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 3,
        name: "Team & Advisors",
        description: "Vesting for core team members, advisors, and founders",
        cliff: 360n * 24n * 60n * 60n, // 12 months
        duration: 1080n * 24n * 60n * 60n, // 36 months
        category: 2, // TeamAdvisors
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 4,
        name: "Strategic Partners",
        description: "Vesting for strategic partners and institutional investors",
        cliff: 180n * 24n * 60n * 60n, // 6 months
        duration: 720n * 24n * 60n * 60n, // 24 months
        category: 3, // StrategicPartners
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 5,
        name: "Community Rewards",
        description: "Rewards for community members, ambassadors, and active participants",
        cliff: 30n * 24n * 60n * 60n, // 1 month
        duration: 360n * 24n * 60n * 60n, // 12 months
        category: 4, // CommunityRewards
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 6,
        name: "Liquidity Providers",
        description: "Incentives for liquidity providers and market makers",
        cliff: 30n * 24n * 60n * 60n, // 1 month
        duration: 180n * 24n * 60n * 60n, // 6 months
        category: 5, // LiquidityProvision
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 7,
        name: "Marketing & Development",
        description: "Allocations for marketing campaigns and development funds",
        cliff: 90n * 24n * 60n * 60n, // 3 months
        duration: 540n * 24n * 60n * 60n, // 18 months
        category: 6, // MarketingDevelopment
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 8,
        name: "Reserve Treasury",
        description: "Long-term treasury reserves for ecosystem sustainability",
        cliff: 360n * 24n * 60n * 60n, // 12 months
        duration: 1440n * 24n * 60n * 60n, // 48 months
        category: 7, // ReserveTreasury
        maxAllocations: null,
        currentAllocations: 0,
        minAllocation: null,
        maxAllocation: null,
        isActive: true
      },
      {
        packageId: 9,
        name: "Flexible Vesting",
        description: "Unlimited participation with flexible vesting terms for everyone",
        cliff: 0n, // No cliff
        duration: 360n * 24n * 60n * 60n, // 12 months
        category: 8, // FlexibleVesting
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
      loadGlobalStats(),
      loadTokenBalance()
    ]).finally(() => {
      setLoading(false)
    })

    const interval = setInterval(() => {
      loadVestingInfo()
      loadGlobalStats()
      loadTokenBalance()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [isConnected, loadVestingInfo, loadAvailablePackages, loadGlobalStats, loadTokenBalance])

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
        abi: ERC20_ABI,
        functionName: 'releaseTokens',
        gas: 200000n,
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
              Aurlink Ecosystem Vesting
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl">
              Complete ecosystem participation with flexible amounts. 
              <span className="text-cyan-400 font-semibold"> Choose from 9 vesting packages</span> to support ecosystem growth.
            </p>
            {isConnected && (
              <div className="mt-4 text-gray-400">
                Your AUR Balance: <span className="text-cyan-400 font-semibold">
                  {formatTokenAmount(tokenBalance)} AUR
                </span>
              </div>
            )}
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
            <div className="text-gray-400 text-xl mb-4">Connect your wallet to access ecosystem vesting</div>
          </div>
        ) : loading ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">Loading ecosystem vesting data...</div>
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

            {/* ECOSYSTEM VESTING HERO SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl p-12 border border-cyan-500/30 shadow-2xl"
            >
              <div className="text-center max-w-4xl mx-auto">
                <div className="text-7xl mb-6">🌐</div>
                <h2 className="text-5xl font-bold text-white mb-6">
                  Complete Ecosystem Vesting
                </h2>
                <p className="text-gray-300 text-2xl mb-8 leading-relaxed">
                  Choose from 9 specialized vesting packages designed for every ecosystem role.
                  <span className="text-cyan-400 font-semibold"> No allocation limits, unlimited participation.</span>
                  Every AUR token contributes to ecosystem health.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPackageSelection(true)}
                  disabled={hasVestingSchedule}
                  className="px-14 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 text-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {hasVestingSchedule ? 'Already Vesting' : 'Explore Ecosystem Packages'}
                </motion.button>
                {hasVestingSchedule && (
                  <p className="text-cyan-400 text-xl mt-6 font-semibold">
                    ✅ You already have an active vesting schedule
                  </p>
                )}
              </div>
            </motion.div>

            {/* ALL 9 ECOSYSTEM VESTING PACKAGES */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Complete Ecosystem Packages</h2>
                <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                  Choose from 9 specialized vesting packages for every role in the ecosystem.
                  All packages support <span className="text-cyan-400">unlimited allocations</span> and participation.
                </p>
              </div>

              {/* All 9 Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {dynamicPackages.map((pkg) => (
                  <PackageCard 
                    key={pkg.packageId} 
                    package={pkg} 
                    onSelect={() => !hasVestingSchedule && setShowPackageSelection(true)}
                  />
                ))}
              </div>

              {/* Package Categories Summary */}
              <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700 mt-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Package Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                    <div className="text-cyan-400 font-bold text-lg mb-2">Core Contributors</div>
                    <p className="text-gray-300 text-sm">Early Contributors, Team & Advisors</p>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                    <div className="text-purple-400 font-bold text-lg mb-2">Ecosystem Growth</div>
                    <p className="text-gray-300 text-sm">Ecosystem Development, Marketing</p>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-2xl border border-green-500/20">
                    <div className="text-green-400 font-bold text-lg mb-2">Community & Partners</div>
                    <p className="text-gray-300 text-sm">Strategic Partners, Community Rewards</p>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    <div className="text-blue-400 font-bold text-lg mb-2">Market Infrastructure</div>
                    <p className="text-gray-300 text-sm">Liquidity Providers</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                    <div className="text-yellow-400 font-bold text-lg mb-2">Long-term Reserves</div>
                    <p className="text-gray-300 text-sm">Reserve Treasury</p>
                  </div>
                  <div className="text-center p-4 bg-pink-500/10 rounded-2xl border border-pink-500/20">
                    <div className="text-pink-400 font-bold text-lg mb-2">Flexible Options</div>
                    <p className="text-gray-300 text-sm">Flexible Vesting for Everyone</p>
                  </div>
                </div>
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
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowPackageSelection(true)}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                    >
                      + Add More Vesting
                    </motion.button>
                  </div>
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