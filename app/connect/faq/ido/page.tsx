'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ---- Replace with your wallet context path if different ----
import { useWallet } from '@/contexts/WalletContext' // <-- adjust path as required
// -------------------------------------------------------------

/* ============================
   VESTING CONFIG (1-month cliff, 12 months total)
   ============================ */
const VESTING_CONFIG = {
  CLIFF_MONTHS: 1,
  VESTING_MONTHS: 12,
  IMMEDIATE_UNLOCK_PERCENT: 0 // no immediate unlock
} as const

/* ============================
   Types
   ============================ */
type PaymentMethod = 'crypto' | 'card' | 'bank'

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
  timeRemaining: string
  participants: number
}

interface VestingRecord {
  id: string
  wallet: string
  totalAmount: number
  claimedAmount: number
  immediateUnlocked: number
  vestedAmount: number
  vestingStart: string // ISO
  vestingMonths: number
  immediateUnlockPercent: number
  cliffMonths: number
  status?: 'pending' | 'allocated' | 'failed'
  tx?: string
  createdAt?: string
}

/* ============================
   Utility helpers
   ============================ */
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`

function formatNumber(num: number) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toString()
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

/* ============================
   Config (set API_BASE to your backend) 
   ============================ */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '' // e.g. 'https://api.yoursite.com'
const POLL_INTERVAL_MS = 15_000

/* ============================
   Component
   ============================ */
export default function IDOPage() {
  // Wallet
  const walletCtx = (useWallet && typeof useWallet === 'function') ? useWallet() : null
  const walletAddress = walletCtx?.address || walletCtx?.walletAddress || ''
  const connectWallet = walletCtx?.connect || (async () => { alert('Wallet connect not available') })
  const sendTransaction = walletCtx?.sendTransaction

  // IDO / tiers initial state
  const [idoState, setIdoState] = useState<IDOState>({
    totalTokens: 100_000_000,
    totalSold: 0,
    totalRaised: 0,
    currentTier: 1,
    timeRemaining: '07:23:45',
    participants: 0
  })

  const [tiers, setTiers] = useState<Tier[]>([
    { number: 1, tokens: 20_000_000, price: 0.025, sold: 0, isActive: true, isCompleted: false },
    { number: 2, tokens: 30_000_000, price: 0.03, sold: 0, isActive: false, isCompleted: false },
    { number: 3, tokens: 20_000_000, price: 0.035, sold: 0, isActive: false, isCompleted: false },
    { number: 4, tokens: 30_000_000, price: 0.04, sold: 0, isActive: false, isCompleted: false }
  ])

  // purchase form
  const [purchaseState, setPurchaseState] = useState({
    amount: '',
    network: 'polygon',
    paymentMethod: 'crypto' as PaymentMethod
  })

  // UI & vesting state
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [vestingRecords, setVestingRecords] = useState<VestingRecord[]>([])
  const [optimisticRecords, setOptimisticRecords] = useState<VestingRecord[]>([])

  const idempotencyRef = useRef<Record<string, string>>({})

  // Derived
  const currentTier = useMemo(() => tiers.find(t => t.isActive) || tiers[0], [tiers])
  const progressPercentage = useMemo(() => (idoState.totalSold / idoState.totalTokens) * 100, [idoState])
  const tierProgressPercentage = useMemo(() => (currentTier.sold / currentTier.tokens) * 100, [currentTier])
  const isIDOCompleted = idoState.totalSold >= idoState.totalTokens

  /* ---------------------
     fetchWithRetry
     --------------------- */
  const fetchWithRetry = useCallback(async (input: RequestInfo, init?: RequestInit, opts?: { retries?: number, retryDelayMs?: number }) => {
    const retries = opts?.retries ?? 3
    const baseDelay = opts?.retryDelayMs ?? 500
    let attempt = 0
    while (true) {
      try {
        const res = await fetch(input, init)
        if (!res.ok) {
          if (res.status >= 500 && attempt < retries) throw new Error(`Server ${res.status}`)
        }
        return res
      } catch (err) {
        attempt++
        if (attempt > retries) throw err
        const delay = baseDelay * Math.pow(2, attempt - 1)
        await sleep(delay)
      }
    }
  }, [])

  /* ---------------------
     Poll vesting records for wallet
     --------------------- */
  useEffect(() => {
    let mounted = true
    let intervalId: number | null = null

    const fetchRecords = async () => {
      if (!mounted) return
      if (!walletAddress) {
        setVestingRecords([])
        return
      }
      try {
        const url = `${API_BASE}/api/vesting?wallet=${encodeURIComponent(walletAddress)}`
        const res = await fetchWithRetry(url, { method: 'GET' }, { retries: 2 })
        if (!res.ok) throw new Error('Failed to fetch vestings')
        const data: VestingRecord[] = await res.json()
        if (mounted) {
          setVestingRecords(data)
        }
      } catch (err) {
        console.warn('Vesting fetch failed', err)
      }
    }

    fetchRecords()
    intervalId = window.setInterval(fetchRecords, POLL_INTERVAL_MS)

    return () => {
      mounted = false
      if (intervalId) clearInterval(intervalId)
    }
  }, [walletAddress, fetchWithRetry])

  /* ---------------------
     Vesting math: 1-month cliff + 12-month total
     Provided implementation integrated exactly
     --------------------- */
  const calculateUnlockedAmount = useCallback((r: VestingRecord) => {
    const now = new Date()
    const start = new Date(r.vestingStart)

    // months elapsed
    const monthsElapsed = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())

    // cliff
    if (monthsElapsed < VESTING_CONFIG.CLIFF_MONTHS) return 0

    const monthsAfterCliff = monthsElapsed - VESTING_CONFIG.CLIFF_MONTHS
    const vestingMonthsAfterCliff = VESTING_CONFIG.VESTING_MONTHS - VESTING_CONFIG.CLIFF_MONTHS

    if (monthsAfterCliff >= vestingMonthsAfterCliff) return r.totalAmount

    const vestedPortion = monthsAfterCliff / vestingMonthsAfterCliff
    return r.totalAmount * vestedPortion
  }, [])

  /* ---------------------
     Optimistic record creation + reconciliation
     --------------------- */
  const addOptimisticRecord = useCallback((r: VestingRecord) => {
    setOptimisticRecords(prev => [r, ...prev].slice(0, 50))
  }, [])

  useEffect(() => {
    // reconcile optimistic records with server records (server wins)
    if (!vestingRecords || vestingRecords.length === 0) return
    const serverIds = new Set(vestingRecords.map(v => v.id))
    setOptimisticRecords(prev => prev.filter(o => !serverIds.has(o.id)))
  }, [vestingRecords])

  /* ---------------------
     Perform tier sale (local optimistic update)
     --------------------- */
  const performTierSaleLocal = useCallback((tokenAmount: number, usdAmount: number) => {
    setTiers(prev => {
      const copy = prev.map(t => ({ ...t }))
      let remaining = tokenAmount
      let idx = copy.findIndex(t => t.isActive)
      if (idx === -1) idx = 0
      while (remaining > 0 && idx < copy.length) {
        const tier = copy[idx]
        const space = tier.tokens - tier.sold
        const take = Math.min(space, remaining)
        tier.sold += take
        remaining -= take
        if (tier.sold >= tier.tokens) {
          tier.isCompleted = true
          tier.isActive = false
          if (idx + 1 < copy.length) copy[idx + 1].isActive = true
        }
        idx++
      }
      return copy
    })

    setIdoState(prev => ({
      ...prev,
      totalSold: prev.totalSold + tokenAmount,
      totalRaised: prev.totalRaised + usdAmount,
      participants: prev.participants + 1
    }))
  }, [])

  /* ---------------------
     handlePurchase: creates purchase intent on backend (POST /api/purchase)
     Creates optimistic vesting record and relies on webhook/server to finalize
     --------------------- */
  const handlePurchase = useCallback(async () => {
    setErrorMessage(null)
    const usd = Number(purchaseState.amount)
    if (!usd || usd <= 0) {
      setErrorMessage('Enter a USD amount greater than 0')
      return
    }
    if (!currentTier) {
      setErrorMessage('Tier data not ready')
      return
    }

    const tokenAmount = +(usd / currentTier.price)
    if (tokenAmount > (currentTier.tokens - currentTier.sold)) {
      setErrorMessage(`Only ${(currentTier.tokens - currentTier.sold).toLocaleString()} $AUR remaining in this round.`)
      return
    }

    // idempotency
    const keyRef = `${walletAddress || 'guest'}:${usd}:${currentTier.number}`
    const idempotencyKey = idempotencyRef.current[keyRef] ?? uid()
    idempotencyRef.current[keyRef] = idempotencyKey

    setIsProcessing(true)

    // optimistic vesting record (12-month, 1-month cliff)
    const optimistic: VestingRecord = {
      id: `optimistic-${idempotencyKey}`,
      wallet: walletAddress || 'guest',
      totalAmount: tokenAmount,
      claimedAmount: 0,
      immediateUnlocked: 0,
      vestedAmount: tokenAmount,
      vestingStart: new Date().toISOString(),
      vestingMonths: VESTING_CONFIG.VESTING_MONTHS,
      immediateUnlockPercent: VESTING_CONFIG.IMMEDIATE_UNLOCK_PERCENT,
      cliffMonths: VESTING_CONFIG.CLIFF_MONTHS,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    addOptimisticRecord(optimistic)
    performTierSaleLocal(tokenAmount, usd)

    try {
      // call backend purchase API
      const resp = await fetchWithRetry(`${API_BASE}/api/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallet: walletAddress || 'guest',
          usdAmount: usd,
          network: purchaseState.network,
          paymentMethod: purchaseState.paymentMethod,
          tokenPrice: currentTier.price,
          clientIdempotencyKey: idempotencyKey,
          vesting: {
            vestingMonths: VESTING_CONFIG.VESTING_MONTHS,
            cliffMonths: VESTING_CONFIG.CLIFF_MONTHS,
            immediateUnlockPercent: VESTING_CONFIG.IMMEDIATE_UNLOCK_PERCENT
          }
        })
      }, { retries: 2, retryDelayMs: 600 })

      if (!resp.ok) {
        const txt = await resp.text()
        throw new Error(`Purchase API failed: ${resp.status} ${txt}`)
      }
      const data = await resp.json()
      // backend response shape can include: { success, id, redirectUrl, tx, status }
      // If redirectUrl => card/bank payment; navigate user
      if (data.redirectUrl) {
        // navigate to payment provider (server generated URL)
        window.location.href = data.redirectUrl
        return
      }

      // If the backend already allocated on-chain and returned tx, mark optimistic as allocated
      if (data.tx || data.txSig) {
        setOptimisticRecords(prev => prev.map(o => o.id === optimistic.id ? ({ ...o, status: 'allocated', tx: data.tx || data.txSig }) : o))
        // fetch server records soon to reconcile
        setTimeout(async () => {
          try {
            const r = await fetch(`${API_BASE}/api/vesting?wallet=${encodeURIComponent(walletAddress || 'guest')}`)
            if (r.ok) {
              const server = await r.json()
              setVestingRecords(server)
            }
          } catch (e) {
            // swallow
          }
        }, 1200)
        alert(`Purchase processed on-chain (tx: ${data.tx || data.txSig}).`)
        setPurchaseState(prev => ({ ...prev, amount: '' }))
        return
      }

      // else: intent created; backend will finalize via webhook and create vesting record
      alert('Purchase intent created. Allocation will be finalized once payment is confirmed.')
      setPurchaseState(prev => ({ ...prev, amount: '' }))
    } catch (err: any) {
      console.error('Purchase failed', err)
      setErrorMessage(String(err?.message ?? err))
      // mark optimistic as failed
      setOptimisticRecords(prev => prev.map(o => o.id === optimistic.id ? ({ ...o, status: 'failed' }) : o))
    } finally {
      setIsProcessing(false)
    }
  }, [API_BASE, addOptimisticRecord, calculateUnlockedAmount, currentTier, fetchWithRetry, performTierSaleLocal, purchaseState.amount, purchaseState.network, purchaseState.paymentMethod, walletAddress])

  /* ---------------------
     claimVestingServer: call backend to perform claim (recommended: server verifies wallet ownership)
     --------------------- */
  const claimVestingServer = useCallback(async (record: VestingRecord) => {
    setErrorMessage(null)
    try {
      const resp = await fetchWithRetry(`${API_BASE}/api/vesting/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vestingId: record.id, network: purchaseState.network })
      }, { retries: 2, retryDelayMs: 500 })

      if (!resp.ok) {
        const txt = await resp.text()
        throw new Error(`Claim API failed: ${resp.status} ${txt}`)
      }

      const data = await resp.json()
      alert(`Claim submitted: ${data.tx ?? 'server accepted claim'}`)
      // refresh vestings shortly
      setTimeout(async () => {
        try {
          const r = await fetch(`${API_BASE}/api/vesting?wallet=${encodeURIComponent(walletAddress || 'guest')}`)
          if (r.ok) {
            const payload = await r.json()
            setVestingRecords(payload)
          }
        } catch (e) { /* ignore */ }
      }, 1200)
    } catch (err) {
      console.error('Claim error', err)
      setErrorMessage(String(err))
    }
  }, [API_BASE, fetchWithRetry, purchaseState.network, walletAddress])

  /* ---------------------
     Merge optimistic + server records for display
     --------------------- */
  const mergedVestingRecords = useMemo(() => {
    const serverMap = new Map(vestingRecords.map(v => [v.id, v]))
    const merged: VestingRecord[] = [...vestingRecords]
    // include optimistic records that server doesn't have (still pending)
    for (const o of optimisticRecords) {
      if (!serverMap.has(o.id) && o.status !== 'failed') merged.unshift(o)
    }
    return merged
  }, [vestingRecords, optimisticRecords])

  /* ---------------------
     Render single vesting record (per your provided UI)
     --------------------- */
  const renderVestingRecord = (record: VestingRecord) => {
    const unlocked = calculateUnlockedAmount(record)
    const claimable = Math.max(0, unlocked - record.claimedAmount)
    const progressPct = Math.round((unlocked / record.totalAmount) * 100)

    const now = new Date()
    const start = new Date(record.vestingStart)
    const cliffEnd = new Date(start)
    cliffEnd.setMonth(cliffEnd.getMonth() + record.cliffMonths)

    const fullyVestedDate = new Date(start)
    fullyVestedDate.setMonth(fullyVestedDate.getMonth() + record.vestingMonths)

    const isBeforeCliff = now < cliffEnd
    const isFullyVested = now >= fullyVestedDate

    // next unlock: if before cliff => cliffEnd; if after and not fully vested => next month
    let nextUnlockDate = cliffEnd
    if (!isBeforeCliff && !isFullyVested) {
      const monthsVested = Math.floor((unlocked / record.totalAmount) * (record.vestingMonths - record.cliffMonths))
      nextUnlockDate = new Date(cliffEnd)
      nextUnlockDate.setMonth(nextUnlockDate.getMonth() + monthsVested + 1)
    }

    return (
      <div key={record.id} className="bg-gray-900/30 border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-white font-semibold">{record.totalAmount.toLocaleString()} $AUR allocated</div>
            <div className="text-xs text-gray-400 mt-1">Vesting: {record.vestingMonths} months with {record.cliffMonths}-month cliff</div>
            <div className="text-xs text-gray-400">Started: {new Date(record.vestingStart).toLocaleDateString()}</div>

            <div className="flex gap-2 mt-2">
              {isBeforeCliff && (
                <div className="inline-block px-2 py-1 text-xs bg-yellow-700/20 text-yellow-300 rounded">
                  Cliff: {Math.ceil((cliffEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} days
                </div>
              )}
              {!isBeforeCliff && !isFullyVested && (
                <div className="inline-block px-2 py-1 text-xs bg-blue-700/20 text-blue-300 rounded">Vesting Active</div>
              )}
              {isFullyVested && <div className="inline-block px-2 py-1 text-xs bg-green-700/20 text-green-300 rounded">Fully Vested</div>}
              {record.status === 'pending' && <div className="inline-block px-2 py-1 text-xs bg-orange-700/20 text-orange-300 rounded">Pending Allocation</div>}
              {record.status === 'failed' && <div className="inline-block px-2 py-1 text-xs bg-red-700/20 text-red-300 rounded">Failed</div>}
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-400">Claimable Now</div>
            <div className="text-lg font-semibold text-cyan-400">{claimable.toFixed(2)} $AUR</div>
            <div className="text-xs text-gray-500 mt-1">{progressPct}% vested</div>
          </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3 mt-3 relative">
          <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-3 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, progressPct)}%` }} />
          {/* cliff marker */}
          <div className="absolute top-0 w-1 h-3 bg-yellow-400" style={{ left: `${(record.cliffMonths / record.vestingMonths) * 100}%` }} />
        </div>

        {/* timeline labels */}
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <div className="text-center">
            <div>Start</div>
            <div className="text-[10px]">{new Date(record.vestingStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </div>

          <div className="text-center">
            <div className="text-yellow-400">Cliff</div>
            <div className="text-[10px]">{cliffEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </div>

          <div className="text-center">
            <div>Complete</div>
            <div className="text-[10px]">{fullyVestedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          </div>
        </div>

        {/* vesting details */}
        <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
          <div className="text-sm text-gray-300 mb-2">Vesting Schedule</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="text-gray-400">Cliff Period:</div>
            <div className="text-white">First {record.cliffMonths} month - 0%</div>

            <div className="text-gray-400">Vesting Period:</div>
            <div className="text-white">Next {record.vestingMonths - record.cliffMonths} months - Linear</div>

            <div className="text-gray-400">Monthly Unlock:</div>
            <div className="text-white">{((1 / (record.vestingMonths - record.cliffMonths)) * 100).toFixed(2)}% per month</div>

            <div className="text-gray-400">Next Unlock:</div>
            <div className="text-white">{isFullyVested ? 'Complete' : nextUnlockDate.toLocaleDateString()}</div>
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <button onClick={() => claimVestingServer(record)} disabled={claimable <= 0 || record.status !== 'allocated'} className="flex-1 py-2 px-3 bg-cyan-600 rounded-md text-white font-semibold disabled:opacity-50 hover:bg-cyan-700 transition-colors">
            {claimable > 0 ? `Claim ${claimable.toFixed(2)} $AUR` : 'Nothing to claim'}
          </button>

          <button onClick={() => { navigator.clipboard?.writeText(record.id); alert('Vesting record id copied') }} className="py-2 px-3 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 transition-colors">
            Copy ID
          </button>

          {record.tx && (
            <a href={`https://etherscan.io/tx/${record.tx}`} target="_blank" rel="noreferrer" className="py-2 px-3 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 transition-colors">View TX</a>
          )}
        </div>
      </div>
    )
  }

  /* ---------------------
     Vesting explanation component for purchase flow
     --------------------- */
  const VestingExplanation = () => (
    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-4 mt-4">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-cyan-400 text-sm">ℹ️</span>
        </div>
        <div>
          <h4 className="text-cyan-400 font-semibold mb-2">12-Month Vesting Schedule</h4>
          <div className="text-cyan-300/80 text-sm space-y-1">
            <div className="flex justify-between"><span>• Month 1:</span><span className="text-yellow-400">Cliff Period (0%)</span></div>
            <div className="flex justify-between"><span>• Month 2:</span><span>9.09% vested</span></div>
            <div className="flex justify-between"><span>• Month 3:</span><span>18.18% vested</span></div>
            <div className="flex justify-between"><span>• Month 6:</span><span>45.45% vested</span></div>
            <div className="flex justify-between"><span>• Month 12:</span><span className="text-green-400">100% vested</span></div>
          </div>
          <p className="text-cyan-300/60 text-xs mt-2">Tokens unlock linearly after the 1-month cliff. You can claim unlocked tokens at any time once they are unlocked.</p>
        </div>
      </div>
    </div>
  )

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
            <span className="text-white font-semibold text-sm uppercase tracking-wider">{isIDOCompleted ? 'IDO Completed Successfully!' : 'Initial DEX Offering Live'}</span>
            <div className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">$AUR Token IDO</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{isIDOCompleted ? 'Thank you — IDO fully subscribed.' : 'Secure your $AUR tokens now — tokens are sent vested to your wallet.'}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1 space-y-6">
            {/* overall progress */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">IDO Progress</h3>
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
                    <p className="text-2xl font-bold text-white">{idoState.timeRemaining}</p>
                    <p className="text-gray-400 text-sm">Time Remaining</p>
                  </div>
                </div>
              </div>
            </div>

            {/* current round */}
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

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                  <p className="text-cyan-400 text-sm text-center">{currentTier.sold >= currentTier.tokens ? 'Round completed successfully!' : `${formatNumber(Math.round(currentTier.tokens - currentTier.sold))} $AUR remaining`}</p>
                </div>
              </div>
            </div>

            {/* token metrics */}
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Token Information</h3>
              <div className="space-y-3">
                {[
                  { label: 'Token Name', value: 'Aurlink' },
                  { label: 'Symbol', value: '$AUR' },
                  { label: 'Total Supply', value: '100,000,000' },
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
                    <p className="text-gray-300 text-lg mb-6">All tokens have been allocated. Distribution & claims available in the dashboard.</p>
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

                    {/* network */}
                    <div className="mb-6">
                      <label className="text-gray-300 font-semibold mb-3 block">Select Network</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'polygon', name: 'Polygon', icon: '🟣' },
                          { id: 'bsc', name: 'BNB Chain', icon: '🟡' },
                          { id: 'solana', name: 'Solana', icon: '🟢' }
                        ].map(net => (
                          <button key={net.id} onClick={() => setPurchaseState(prev => ({ ...prev, network: net.id }))} className={`p-4 rounded-xl border-2 transition-all duration-200 ${purchaseState.network === net.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-600 bg-gray-900/50 hover:border-gray-500'}`}>
                            <div className="text-2xl mb-2">{net.icon}</div>
                            <p className="text-white font-semibold text-sm">{net.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* amount */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-300 font-semibold mb-2 block">Amount to Spend (USD)</label>
                        <div className="relative">
                          <input type="number" min="0" step="0.01" value={purchaseState.amount} onChange={(e) => setPurchaseState(prev => ({ ...prev, amount: e.target.value }))} placeholder="0.00" className="w-full bg-gray-900/50 border border-gray-600 rounded-xl px-4 py-4 text-white text-2xl font-bold focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-colors" />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">USD</div>
                        </div>
                      </div>

                      {/* token calculation */}
                      {purchaseState.amount && Number(purchaseState.amount) > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-cyan-500/20">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">You receive:</span>
                            <span className="text-2xl font-bold text-cyan-400">{(Number(purchaseState.amount) / currentTier.price).toLocaleString(undefined, { maximumFractionDigits: 2 })} $AUR</span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">Rate: 1 $AUR = ${currentTier.price} USD</p>
                        </motion.div>
                      )}

                      {/* vesting explanation */}
                      {VESTING_CONFIG.VESTING_MONTHS > 0 && <VestingExplanation />}

                      {/* payment method */}
                      <div className="mt-3">
                        <label className="text-gray-300 font-semibold mb-3 block">Payment Method</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { id: 'crypto', label: 'Crypto', icon: '💠' },
                            { id: 'card', label: 'Card', icon: '💳' },
                            { id: 'bank', label: 'Bank', icon: '🏦' }
                          ].map(m => (
                            <button key={m.id} onClick={() => setPurchaseState(prev => ({ ...prev, paymentMethod: m.id as PaymentMethod }))} className={`p-3 rounded-xl border-2 ${purchaseState.paymentMethod === m.id ? 'border-purple-500 bg-purple-500/10' : 'border-gray-600 bg-gray-900/50'}`}>
                              <div className="text-lg mb-1">{m.icon}</div>
                              <div className="text-white font-semibold text-sm">{m.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {errorMessage && <div className="text-red-400 text-sm mt-2">{errorMessage}</div>}

                      {/* wallet / purchase */}
                      <div className="mt-4">
                        {!walletAddress ? (
                          <div className="space-y-3">
                            <button onClick={() => connectWallet && connectWallet()} className="w-full py-4 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-200 text-lg">Connect Wallet</button>

                            <div className="flex gap-3">
                              <button onClick={handlePurchase} disabled={isProcessing || !purchaseState.amount || Number(purchaseState.amount) <= 0 || currentTier.sold >= currentTier.tokens} className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50">
                                {isProcessing ? 'Processing…' : 'Purchase as Guest (Simulated Intent)'}
                              </button>
                              <button onClick={() => alert('Guest purchases are simulated — connect wallet for real purchases')} className="py-3 px-3 bg-gray-700 rounded-xl text-gray-300">Learn</button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-sm text-gray-400 mb-2">Connected: <span className="text-white font-mono ml-2">{walletAddress.slice(0, 8)}…{walletAddress.slice(-6)}</span></div>
                            <button onClick={handlePurchase} disabled={isProcessing || !purchaseState.amount || Number(purchaseState.amount) <= 0 || currentTier.sold >= currentTier.tokens} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50">{isProcessing ? 'Processing Purchase…' : `Purchase $AUR Tokens`}</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* vesting records */}
            <div className="mt-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Your Vesting Records ({mergedVestingRecords.length})</h3>
              {mergedVestingRecords.length === 0 ? (
                <p className="text-gray-400">No vesting allocations found for this wallet yet. Purchases will appear here after confirmation.</p>
              ) : (
                <div className="space-y-4">
                  {mergedVestingRecords.map(r => renderVestingRecord(r))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* recent activity */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Purchases</h3>
          <div className="text-center text-gray-400">{isIDOCompleted ? 'IDO completed successfully.' : 'Purchases are being processed by backend — allocations finalized after payment confirmation.'}</div>
        </motion.div>
      </div>
    </div>
  )
}
