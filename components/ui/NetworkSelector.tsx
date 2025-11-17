import React from 'react'
import { NETWORK_CONFIG } from '../../utils/constants'
import { Network } from '../../types'

interface NetworkSelectorProps {
  network: Network
  setNetwork: (network: Network) => void
}

export default function NetworkSelector({ network, setNetwork }: NetworkSelectorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-gray-800/50 rounded-xl p-2 flex gap-2">
        {Object.entries(NETWORK_CONFIG).map(([key, net]) => (
          <button
            key={key}
            onClick={() => setNetwork(key as Network)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              network === key 
                ? 'bg-cyan-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{net.icon}</span>
              <span>{net.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}