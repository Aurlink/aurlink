'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function ConnectWalletButton() {
  return (
    <div className="flex justify-center items-center py-4">
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
          const ready = mounted && authenticationStatus !== 'loading'
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated')

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
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
                      className="px-6 py-2 text-white font-semibold rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all"
                    >
                      Connect Wallet
                    </button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      className="px-6 py-2 text-white font-semibold rounded-2xl bg-red-600 hover:bg-red-700"
                    >
                      Wrong Network
                    </button>
                  )
                }

                return (
                  <button
                    onClick={openAccountModal}
                    className="px-6 py-2 text-white font-semibold rounded-2xl bg-gray-800 hover:bg-gray-700"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    </div>
  )
}
