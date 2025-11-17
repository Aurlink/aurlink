'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Wallet } from 'lucide-react'

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openAccountModal,
        openChainModal,
        mounted,
      }) => {
        const connected = mounted && account && chain

        return (
          <div
            aria-hidden={!mounted}
            className="transition-all"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg"
                  >
                    <Wallet className="w-4 h-4" />
                    Connect Wallet
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="px-4 py-2 bg-red-600/90 hover:bg-red-700 text-white rounded-xl font-semibold"
                  >
                    Wrong Network
                  </button>
                )
              }

              return (
                <button
                  onClick={openAccountModal}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-800/80 border border-gray-700 text-white rounded-xl hover:border-cyan-500 transition-all"
                >
                  <Wallet className="w-4 h-4 text-cyan-400" />
                  {account.displayName}
                </button>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
