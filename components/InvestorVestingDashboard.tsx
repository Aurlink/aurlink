// src/components/InvestorVestingDashboard.tsx
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useWallet } from '../../contexts/WalletContext' // adjust path
import { motion } from 'framer-motion'

interface VestingRecord {
  id: string
  wallet: string
  totalAmount: number
  claimedAmount: number
  vestingStart: string
  vestingMonths: number
  cliffMonths: number
  immediateUnlockPercent: number
  status?: string
  tx?: string
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || ''

function calculateUnlocked(r: VestingRecord) {
  const VESTING_CONFIG = { CLIFF_MONTHS: 1, VESTING_MONTHS: 12, IMMEDIATE_UNLOCK_PERCENT: 0 }
  const now = new Date()
  const start = new Date(r.vestingStart)
  const monthsElapsed = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth())
  if (monthsElapsed < VESTING_CONFIG.CLIFF_MONTHS) return 0
  const monthsAfterCliff = monthsElapsed - VESTING_CONFIG.CLIFF_MONTHS
  const vestAfter = VESTING_CONFIG.VESTING_MONTHS - VESTING_CONFIG.CLIFF_MONTHS
  if (monthsAfterCliff >= vestAfter) return r.totalAmount
  return r.totalAmount * (monthsAfterCliff / vestAfter)
}

export default function InvestorVestingDashboard() {
  const wallet = (useWallet && typeof useWallet === 'function') ? useWallet() : null
  const address = wallet?.address || ''
  const [records, setRecords] = useState<VestingRecord[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if (!address) return
    let mounted = true
    const fetchRecords = async () => {
      setLoading(true)
      try {
        const r = await fetch(`${API_BASE}/api/vesting?wallet=${encodeURIComponent(address)}`)
        if (!r.ok) throw new Error('fail')
        const data = await r.json()
        if (mounted) setRecords(data)
      } catch(e){ console.warn(e) } finally { if (mounted) setLoading(false) }
    }
    fetchRecords()
    const id = setInterval(fetchRecords, 15_000)
    return ()=>{ mounted=false; clearInterval(id) }
  }, [address])

  const totals = useMemo(()=>{
    let total=0, unlocked=0, claimed=0
    for(const r of records){ total+=r.totalAmount; unlocked+=calculateUnlocked(r); claimed+=r.claimedAmount || 0 }
    return { total, unlocked, locked: total - unlocked, claimed }
  }, [records])

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h3 className="text-lg text-white mb-4">Investor Vesting Dashboard</h3>
      {!address ? <div className="text-gray-400">Connect wallet to view vesting records.</div> : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-sm text-gray-400">Total Allocated</div>
              <div className="text-white font-semibold">{totals.total.toLocaleString()}</div>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-sm text-gray-400">Unlocked</div>
              <div className="text-white font-semibold">{Math.round(totals.unlocked).toLocaleString()}</div>
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <div className="text-sm text-gray-400">Locked</div>
              <div className="text-white font-semibold">{Math.round(totals.locked).toLocaleString()}</div>
            </div>
          </div>

          <div className="space-y-4">
            {records.length===0 && <div className="text-gray-400">No vesting records yet.</div>}
            {records.map(r=> {
              const unlocked = calculateUnlocked(r)
              const claimable = Math.max(0, unlocked - (r.claimedAmount || 0))
              const progress = Math.round((unlocked / r.totalAmount)*100)
              const cliffEnd = new Date(r.vestingStart); cliffEnd.setMonth(cliffEnd.getMonth() + r.cliffMonths)
              const fully = new Date(r.vestingStart); fully.setMonth(fully.getMonth() + r.vestingMonths)
              return (
                <motion.div layout key={r.id} className="bg-gray-900 p-4 rounded border border-gray-700">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-white font-semibold">{r.totalAmount.toLocaleString()} $AUR</div>
                      <div className="text-xs text-gray-400">Start: {new Date(r.vestingStart).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400">Cliff ends: {cliffEnd.toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Claimable</div>
                      <div className="text-white font-semibold">{claimable.toFixed(2)}</div>
                      <div className="text-xs text-gray-500 mt-1">{progress}% vested</div>
                    </div>
                  </div>
                  <div className="bg-gray-700 h-2 rounded-full mt-3 overflow-hidden">
                    <div style={{ width: `${Math.min(100,progress)}%` }} className="h-2 bg-gradient-to-r from-green-500 to-cyan-500" />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-2 bg-cyan-600 rounded text-white disabled:opacity-50" disabled={claimable<=0}>Claim {claimable.toFixed(2)}</button>
                    <button className="px-3 py-2 bg-gray-700 rounded text-gray-300" onClick={()=>{ navigator.clipboard?.writeText(r.id); alert('Copied') }}>Copy ID</button>
                    {r.tx && <a className="px-3 py-2 bg-gray-700 rounded text-gray-300" href={r.tx.startsWith('0x') ? `https://etherscan.io/tx/${r.tx}` : '#'} target="_blank" rel="noreferrer">View TX</a>}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
