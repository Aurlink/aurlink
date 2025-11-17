// src/components/DeploymentStatus.tsx
'use client'
import { useEffect, useState } from 'react'

interface DeploymentStatusProps {
  transactionHash: string
  network: string
}

export function DeploymentStatus({ transactionHash, network }: DeploymentStatusProps) {
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending')
  const [confirmations, setConfirmations] = useState(0)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/transaction/status?hash=${transactionHash}&network=${network}`)
        const data = await response.json()
        
        setStatus(data.status)
        setConfirmations(data.confirmations)
        
        if (data.status === 'pending' && data.confirmations < 12) {
          // Continue polling until confirmed
          setTimeout(checkStatus, 5000)
        }
      } catch (error) {
        console.error('Error checking transaction status:', error)
      }
    }

    checkStatus()
  }, [transactionHash, network])

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Deployment Status</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Transaction:</span>
          <a 
            href={getExplorerUrl(network, transactionHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00F5FF] hover:text-cyan-400 text-sm"
          >
            View on Explorer
          </a>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Status:</span>
          <span className={`font-semibold ${
            status === 'confirmed' ? 'text-green-400' :
            status === 'failed' ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {status.toUpperCase()}
          </span>
        </div>
        
        {status === 'pending' && (
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Confirmations:</span>
            <span className="text-white">{confirmations}/12</span>
          </div>
        )}
        
        {status === 'pending' && (
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-[#00F5FF] transition-all duration-500"
              style={{ width: `${(confirmations / 12) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}