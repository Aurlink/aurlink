'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { parseEther } from 'viem'
import { ConnectButton } from '@rainbow-me/rainbowkit'

/* ============================
   CONTRACT CONFIGURATION
   ============================ */
const TOKENSALE_CONTRACT_ADDRESS = '0x0d30315b2d4eee72176127061e070938aa058b3e ' as const
const BNB_CHAIN_ID = 56

// ✅ COMPLETE ABI WITH ALL FUNCTIONS FROM YOUR CONTRACT
const ERC20_ABI = [
  // Contribution function
  {
    "name": 'contribute',
    "type": 'function',
    "inputs": [],
    "outputs": [],
    "stateMutability": 'payable'
  },
  // View functions from your contract
  {
    "name": 'getRequiredBNB',
    "type": 'function',
    "inputs": [{ "name": 'usdAmount', "type": 'uint256' }],
    "outputs": [{ "name": '', "type": 'uint256' }],
    "stateMutability": 'view'
  },
  {
    "name": 'getCurrentPriceUSD',
    "type": 'function', 
    "inputs": [],
    "outputs": [{ "name": '', "type": 'uint256' }],
    "stateMutability": 'view'
  },
  {
    "name": 'getCurrentPriceBNB',
    "type": 'function',
    "inputs": [],
    "outputs": [{ "name": '', "type": 'uint256' }],
    "stateMutability": 'view'
  },
  {
    "name": 'generalProgress',
    "type": 'function',
    "inputs": [],
    "outputs": [{ "name": '', "type": 'uint256' }],
    "stateMutability": 'view'
  },
  {
    "name": 'tierProgress',
    "type": 'function',
    "inputs": [],
    "outputs": [{ "name": '', "type": 'uint256[4]' }],
    "stateMutability": 'view'
  },
  {
    "name": 'activeTierProgress',
    "type": 'function',
    "inputs": [],
    "outputs": [
      { "name": 'tier', "type": 'uint8' },
      { "name": 'progressBP', "type": 'uint256' },
      { "name": 'sold', "type": 'uint256' },
      { "name": 'allocation', "type": 'uint256' }
    ],
    "stateMutability": 'view'
  },
  {
    "name": 'isSaleActive',
    "type": 'function',
    "inputs": [],
    "outputs": [{ "name": '', "type": 'bool' }],
    "stateMutability": 'view'
  },
  {
    "name": 'getUserTokenBalance',
    "type": 'function',
    "inputs": [{ "name": 'user', "type": 'address' }],
    "outputs": [{ "name": '', "type": 'uint256' }],
    "stateMutability": 'view'
  },
  {
    "name": 'getUserContributionUSD',
    "type": 'function',
    "inputs": [{ "name": 'user', "type": 'address' }],
    "outputs": [{ "name": '', "type": 'uint256' }],
    "stateMutability": 'view'
  },
  {
    "name": 'getContractTokenBalance',
    "type": 'function',
    "inputs": [],
    "outputs": [{ "name": '', "type": 'uint256' }],
    "stateMutability": 'view'
  },
  {
    "name": 'getContractBNBBalance',
    "type": 'function',
    "inputs": [],
    "outputs": [{ "name": '', "type": 'uint256' }],
    "stateMutability": 'view'
  },
  {
    "name": 'getTierInfo',
    "type": 'function',
    "inputs": [{ "name": 'tier', "type": 'uint8' }],
    "outputs": [
      { "name": 'allocation', "type": 'uint256' },
      { "name": 'sold', "type": 'uint256' },
      { "name": 'priceUSD', "type": 'uint256' },
      { "name": 'maxUSD', "type": 'uint256' }
    ],
    "stateMutability": 'view'
  },
  // State variables
  {
    "name": 'totalSold',
    "type": 'function',
    "inputs": [],
    "outputs": [{ "name": '', "type": 'uint256' }],
    "stateMutability": 'view'
  },
  {
    "name": 'saleEnded',
    "type": 'function',
    "inputs": [],
    "outputs": [{ "name": '', "type": 'bool' }],
    "stateMutability": 'view'
  }
] as const

/* ============================
   Types
   ============================ */
interface Tier {
  number: number
  tokens: number
  price: number
  sold: number
  isActive: boolean
  isCompleted: boolean
}

interface IDOState {
  totalTokens: number
  totalSold: number
  totalRaised: number
  currentTier: number
  participants: number
  saleActive: boolean
}

/* ============================
   Utility helpers
   ============================ */
function formatNumber(num: number) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toString()
}

/* ============================
   Custom Connect Button Component
   ============================ */
const CustomConnectButton = () => (
  <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    }) => {
      const ready = mounted && authenticationStatus !== 'loading';
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus || authenticationStatus === 'authenticated');

      return (
        <div
          {...(!ready && {
            'aria-hidden': true,
            'style': {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            },
          })}
        >
          {(() => {
            if (!connected) {
              return (
                <button 
                  onClick={openConnectModal} 
                  type="button"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-200"
                >
                  Connect Wallet to Participate
                </button>
              );
            }

            if (chain.unsupported) {
              return (
                <button 
                  onClick={openChainModal} 
                  type="button"
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-700 transition-all duration-200"
                >
                  Wrong network - Switch to BNB Chain
                </button>
              );
            }

            return (
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={openChainModal}
                  style={{ display: 'flex', alignItems: 'center' }}
                  type="button"
                  className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {chain.hasIcon && (
                    <div
                      style={{
                        background: chain.iconBackground,
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        overflow: 'hidden',
                        marginRight: 8,
                      }}
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? 'Chain icon'}
                          src={chain.iconUrl}
                          style={{ width: 20, height: 20 }}
                        />
                      )}
                    </div>
                  )}
                  {chain.name}
                </button>

                <button 
                  onClick={openAccountModal} 
                  type="button"
                  className="py-2 px-4 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  {account.displayName}
                  {account.displayBalance
                    ? ` (${account.displayBalance})`
                    : ''}
                </button>
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
);

/* ============================
   Component
   ============================ */
export default function IDOPage() {
  // Wagmi hooks
  const { address, isConnected, chain } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  // IDO / tiers initial state
  const [idoState, setIdoState] = useState<IDOState>({
    totalTokens: 100_000_000,
    totalSold: 0,
    totalRaised: 0,
    currentTier: 1,
    participants: 0,
    saleActive: true
  })

  const [tiers, setTiers] = useState<Tier[]>([
    { number: 1, tokens: 20_000_000, price: 0.025, sold: 0, isActive: true, isCompleted: false },
    { number: 2, tokens: 30_000_000, price: 0.03, sold: 0, isActive: false, isCompleted: false },
    { number: 3, tokens: 20_000_000, price: 0.035, sold: 0, isActive: false, isCompleted: false },
    { number: 4, tokens: 30_000_000, price: 0.04, sold: 0, isActive: false, isCompleted: false }
  ])

  // purchase form
  const [purchaseState, setPurchaseState] = useState({
    amount: ''
  })

  // UI state
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [requiredBNB, setRequiredBNB] = useState<number>(0)
  const [userContribution, setUserContribution] = useState<number>(0)
  const [userTokenBalance, setUserTokenBalance] = useState<number>(0)

  // Derived
  const currentTier = useMemo(() => tiers.find(t => t.isActive) || tiers[0], [tiers])
  const progressPercentage = useMemo(() => {
    if (idoState.totalTokens === 0) return 0
    return (idoState.totalSold / idoState.totalTokens) * 100
  }, [idoState.totalSold, idoState.totalTokens])
  const tierProgressPercentage = useMemo(() => {
    if (currentTier.tokens === 0) return 0
    return (currentTier.sold / currentTier.tokens) * 100
  }, [currentTier.sold, currentTier.tokens])
  const isIDOCompleted = useMemo(() => {
    return idoState.totalSold >= idoState.totalTokens
  }, [idoState.totalSold, idoState.totalTokens])
  const isCorrectNetwork = chain?.id === BNB_CHAIN_ID

  // Calculate tokens for display
  const calculatedTokens = useMemo(() => {
    if (!purchaseState.amount || !currentTier) return 0
    const usdAmount = Number(purchaseState.amount)
    return usdAmount / currentTier.price
  }, [purchaseState.amount, currentTier])

  /* ---------------------
     ✅ GET BNB FROM CONTRACT
     --------------------- */
  const getRequiredBNBFromContract = useCallback(async (usdAmount: number) => {
    if (!publicClient || !usdAmount) return 0
    
    try {
      const usdAmountWei = BigInt(Math.floor(usdAmount * 1e18))
      
      const requiredBNB = await publicClient.readContract({
        address: TOKENSALE_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'getRequiredBNB',
        args: [usdAmountWei]
      })
      
      const bnbAmount = Number(requiredBNB) / 1e18
      setRequiredBNB(bnbAmount)
      return bnbAmount
    } catch (error) {
      console.error('Failed to get BNB from contract:', error)
      setRequiredBNB(0)
      return 0
    }
  }, [publicClient])

  /* ---------------------
     ✅ FIXED: Load Contract Data Using getTierInfo for All Progress
     --------------------- */
  const loadContractData = useCallback(async () => {
    if (!publicClient || !address) return
    
    try {
      // Check if sale is active
      const saleActive = await publicClient.readContract({
        address: TOKENSALE_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'isSaleActive',
        args: []
      })
      
      // Get tier info for ALL tiers (1-4)
      const tierPromises = [1, 2, 3, 4].map(tierNumber => 
        publicClient.readContract({
          address: TOKENSALE_CONTRACT_ADDRESS,
          abi: ERC20_ABI,
          functionName: 'getTierInfo',
          args: [tierNumber]
        })
      )
      
      const tierInfos = await Promise.all(tierPromises)
      
      // Get active tier
      const activeTierData = await publicClient.readContract({
        address: TOKENSALE_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'activeTierProgress',
        args: []
      })
      
      // Get current price
      const currentPriceUSD = await publicClient.readContract({
        address: TOKENSALE_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'getCurrentPriceUSD',
        args: []
      })
      
      // Get user contribution
      const userContributionUSD = await publicClient.readContract({
        address: TOKENSALE_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'getUserContributionUSD',
        args: [address]
      })
      
      // Get user token balance
      const userBalance = await publicClient.readContract({
        address: TOKENSALE_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'getUserTokenBalance',
        args: [address]
      })
      
      // Calculate total sold from all tiers
      let totalSoldFromTiers = 0
      let totalAllocationFromTiers = 0
      
      tierInfos.forEach((tierInfo, index) => {
        const tierSold = Number(tierInfo[1]) / 1e18 // sold
        const tierAllocation = Number(tierInfo[0]) / 1e18 // allocation
        totalSoldFromTiers += tierSold
        totalAllocationFromTiers += tierAllocation
      })
      
      const priceInUSD = Number(currentPriceUSD) / 1e18
      const userContributionNum = Number(userContributionUSD) / 1e18
      const userBalanceNum = Number(userBalance) / 1e18
      const currentActiveTier = Number(activeTierData[0])
      
      // Update IDO state with comprehensive tier data
      setIdoState(prev => ({ 
        ...prev, 
        saleActive,
        totalSold: totalSoldFromTiers,
        totalTokens: totalAllocationFromTiers,
        currentTier: currentActiveTier,
        totalRaised: totalSoldFromTiers * priceInUSD,
        participants: prev.participants // Keep existing or implement participant counting
      }))
      
      setUserContribution(userContributionNum)
      setUserTokenBalance(userBalanceNum)
      
      // Update ALL tiers with comprehensive data
      setTiers(prev => prev.map((tier, index) => {
        const tierInfo = tierInfos[index]
        return {
          number: tier.number,
          tokens: Number(tierInfo[0]) / 1e18, // allocation
          price: Number(tierInfo[2]) / 1e18,  // priceUSD
          sold: Number(tierInfo[1]) / 1e18,   // sold
          isActive: tier.number === currentActiveTier,
          isCompleted: Number(tierInfo[1]) >= Number(tierInfo[0]) // sold >= allocation
        }
      }))
      
    } catch (error) {
      console.error('Failed to load contract data:', error)
    }
  }, [publicClient, address])

  /* ---------------------
     ✅ Purchase Function
     --------------------- */
  const handlePurchase = useCallback(async () => {
    setErrorMessage(null)
    
    if (!isConnected || !address) {
      setErrorMessage('Please connect your wallet first')
      return
    }

    if (!walletClient) {
      setErrorMessage('Wallet not available - please refresh the page')
      return
    }

    if (!isCorrectNetwork) {
      setErrorMessage('Please switch to BNB Chain to participate')
      return
    }

    const usdAmount = Number(purchaseState.amount)
    if (!usdAmount || usdAmount <= 0) {
      setErrorMessage('Please enter a valid USD amount')
      return
    }

    if (usdAmount < 1) {
      setErrorMessage('Minimum purchase amount is $1')
      return
    }

    if (usdAmount > 100000) {
      setErrorMessage('Maximum purchase amount is $100,000')
      return
    }

    // Get BNB required from contract
    const purchaseBNB = await getRequiredBNBFromContract(usdAmount)
    if (purchaseBNB <= 0) {
      setErrorMessage('Failed to get BNB amount from contract')
      return
    }

    setIsProcessing(true)

    try {
      const transactionConfig: any = {
        address: TOKENSALE_CONTRACT_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'contribute',
        args: [],
        value: parseEther(purchaseBNB.toString())
      }

      const hash = await walletClient.writeContract(transactionConfig)
      const receipt = await publicClient.waitForTransactionReceipt({ 
        hash,
        confirmations: 1,
        timeout: 120000
      })
      
      if (receipt.status === 'success') {
        alert(`🎉 Purchase successful! ${calculatedTokens.toLocaleString()} $AUR sent to your wallet!`)
        setPurchaseState(prev => ({ ...prev, amount: '' }))
        setRequiredBNB(0)
        await loadContractData() // Reload all data
      } else {
        throw new Error('Transaction failed on the blockchain')
      }

    } catch (error: any) {
      console.error('❌ Purchase failed:', error)
      
      if (error?.name === 'UserRejectedRequestError' || 
          error?.code === 4001 || 
          error?.message?.includes('User denied') ||
          error?.message?.includes('rejected')) {
        setErrorMessage('Transaction cancelled - you rejected the request in your wallet')
      } 
      else if (error?.message?.includes('insufficient funds') || 
               error?.code === 'INSUFFICIENT_FUNDS') {
        setErrorMessage('Insufficient BNB balance - please add more BNB to your wallet')
      }
      else if (error?.message?.includes('Sale not active')) {
        setErrorMessage('Sale is not currently active')
      }
      else if (error?.message?.includes('Exceeds limit')) {
        setErrorMessage('Purchase amount exceeds your tier limit')
      }
      else if (error?.message?.includes('execution reverted')) {
        const revertMatch = error.message.match(/reverted with reason string ["'](.+?)["']/)
        if (revertMatch) {
          setErrorMessage(`Transaction failed: ${revertMatch[1]}`)
        } else {
          setErrorMessage('Transaction failed - please try again with different amount')
        }
      }
      else {
        setErrorMessage('Transaction failed - please try again or contact support if issue persists')
      }
    } finally {
      setIsProcessing(false)
    }
  }, [
    isConnected, address, walletClient, isCorrectNetwork, 
    purchaseState.amount, calculatedTokens, publicClient, 
    loadContractData, getRequiredBNBFromContract
  ])

  // Get BNB from contract when amount changes
  useEffect(() => {
    if (purchaseState.amount && Number(purchaseState.amount) > 0) {
      getRequiredBNBFromContract(Number(purchaseState.amount))
    } else {
      setRequiredBNB(0)
    }
  }, [purchaseState.amount, getRequiredBNBFromContract])

  // Load contract data when address changes
  useEffect(() => {
    loadContractData()
  }, [loadContractData])

  /* ---------------------
     UI Render
     --------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-purple-500/5 to-transparent pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-full mb-6">
            <span className="text-white font-semibold text-sm uppercase tracking-wider">
              {isIDOCompleted ? 'IDO Completed Successfully!' : 'BNB Chain IDO Live'}
            </span>
            <div className={`w-2 h-2 rounded-full animate-pulse ${isIDOCompleted ? 'bg-gray-400' : 'bg-green-400'}`} />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">$AUR Token IDO</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {isIDOCompleted ? 'Thank you — IDO fully subscribed.' : 'Secure your $AUR tokens now — tokens are sent directly to your wallet.'}
          </p>

          {/* User Info */}
          {isConnected && userContribution > 0 && (
            <div className="mt-4 p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-lg max-w-md mx-auto">
              <p className="text-cyan-400 text-sm">
                Your contribution: ${userContribution.toFixed(2)} | Your $AUR: {userTokenBalance.toLocaleString()}
              </p>
            </div>
          )}

          {/* Network Status */}
          {isConnected && !isCorrectNetwork && (
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg max-w-md mx-auto">
              <p className="text-yellow-400 text-sm">
                ⚠️ Please switch to BNB Chain to participate
              </p>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1 space-y-6">
            {/* Overall progress */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Total Raised</span>
                    <span className="text-white font-semibold">${Math.round(idoState.totalRaised).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, progressPercentage)}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>{formatNumber(Math.round(idoState.totalSold))} / {formatNumber(idoState.totalTokens)} $AUR</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-white">{idoState.participants.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Participants</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-400 animate-pulse">LIVE</p>
                    <p className="text-gray-400 text-sm">Status</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current round */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Current Round</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Token Price</p>
                  <p className="text-3xl font-bold text-cyan-400">${currentTier.price.toFixed(3)}</p>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Round Progress</span>
                    <span className="text-white font-semibold">{formatNumber(Math.round(currentTier.sold))} / {formatNumber(currentTier.tokens)} $AUR</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, tierProgressPercentage)}%` }} />
                  </div>
                </div>

                {/* Enhanced Tier Display */}
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                  <p className="text-cyan-400 text-sm text-center">
                    {currentTier.isCompleted ? 
                      '🎉 Tier completed! Moving to next tier...' : 
                      `Tier ${currentTier.number}: ${formatNumber(Math.round(currentTier.tokens - currentTier.sold))} $AUR remaining`
                    }
                  </p>
                  {currentTier.number < 4 && !currentTier.isCompleted && (
                    <p className="text-cyan-300 text-xs text-center mt-1">
                      Next tier: ${(tiers[currentTier.number]?.price || 0).toFixed(3)} per $AUR
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Token metrics */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Token Information</h3>
              <div className="space-y-3">
                {[
                  { label: 'Token Name', value: 'Aurlink' },
                  { label: 'Symbol', value: '$AUR' },
                  { label: 'Total Supply', value: '1,000,000,000' },
                  { label: 'IDO Allocation', value: '100,000,000' },
                  { label: 'Initial Market Cap', value: `$${Math.round((idoState.totalTokens * currentTier.price) / 1_000_000)}M` }
                ].map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                    <span className="text-gray-400">{metric.label}</span>
                    <span className="text-white font-semibold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
              <AnimatePresence mode="wait">
                {isIDOCompleted ? (
                  <motion.div key="completed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-green-400">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">IDO Successfully Completed!</h3>
                    <p className="text-gray-300 text-lg mb-6">All tokens have been allocated. Thank you for your participation!</p>
                    <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-xl p-6 border border-green-500/20 max-w-md mx-auto">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><p className="text-gray-400">Total Raised</p><p className="text-white font-semibold text-xl">${Math.round(idoState.totalRaised).toLocaleString()}</p></div>
                        <div><p className="text-gray-400">Participants</p><p className="text-white font-semibold text-xl">{idoState.participants.toLocaleString()}</p></div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="purchase" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <h2 className="text-3xl font-bold text-white mb-2">Purchase $AUR Tokens</h2>
                    <p className="text-gray-400 mb-8">Secure your $AUR tokens at the current price of <span className="text-cyan-400 font-semibold">${currentTier.price.toFixed(3)}</span></p>

                    {/* Payment Method */}
                    <div className="mb-6">
                      <label className="text-gray-300 font-semibold mb-3 block">Payment Method</label>
                      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-cyan-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                            <span className="text-yellow-400 text-lg">🟡</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold">BNB (BNB Chain)</p>
                            <p className="text-gray-400 text-sm">Pay with BNB - calculated by smart contract</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 font-semibold mb-2 block">Amount to Spend (USD)</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            min="0" 
                            step="0.01" 
                            value={purchaseState.amount} 
                            onChange={(e) => setPurchaseState(prev => ({ ...prev, amount: e.target.value }))} 
                            placeholder="0.00" 
                            className="w-full bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-4 text-white text-2xl font-bold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors" 
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">USD</div>
                        </div>
                      </div>

                      {/* Token Calculation */}
                      {purchaseState.amount && Number(purchaseState.amount) > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-cyan-500/20">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">You receive:</span>
                              <span className="text-2xl font-bold text-cyan-400">
                                {calculatedTokens.toLocaleString(undefined, { maximumFractionDigits: 2 })} $AUR
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">Rate: ${currentTier.price.toFixed(3)} per $AUR</p>
                          </div>

                          {/* BNB Required */}
                          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/20">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300">BNB Required:</span>
                              <span className="text-xl font-bold text-yellow-400">
                                {requiredBNB.toFixed(6)} BNB
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">Calculated by smart contract</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Error Message */}
                      {errorMessage && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                          <p className="text-red-400 text-sm">{errorMessage}</p>
                        </motion.div>
                      )}

                      {/* Action Buttons */}
                      <div className="space-y-4 pt-4">
                        {!isConnected ? (
                          <CustomConnectButton />
                        ) : !isCorrectNetwork ? (
                          <button 
                            onClick={() => {}} 
                            disabled
                            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-xl opacity-50 cursor-not-allowed"
                          >
                            Please Switch to BNB Chain
                          </button>
                        ) : (
                          <button 
                            onClick={handlePurchase}
                            disabled={isProcessing || !purchaseState.amount || Number(purchaseState.amount) <= 0}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isProcessing ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing Transaction...
                              </div>
                            ) : (
                              `Purchase $AUR Tokens`
                            )}
                          </button>
                        )}

                        {/* Info Box */}
                        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-600">
                          <div className="space-y-2 text-sm text-gray-400">
                            <p>💡 <span className="text-cyan-400">Instant Tokens:</span> $AUR tokens are sent directly to your wallet upon successful purchase</p>
                            <p>🔒 <span className="text-green-400">Secure:</span> Powered by smart contract on BNB Chain</p>
                            <p>⚡ <span className="text-yellow-400">Gas Efficient:</span> Low transaction fees on BNB Chain</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}