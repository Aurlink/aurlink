// Replace the WalletConnectButton component in your IDO page with this enhanced version:

function WalletConnectButton() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, error, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { chains, switchChain } = useSwitchChain()

  const metaMaskConnector = connectors.find(connector => connector.id === 'injected')
  const walletConnectConnector = connectors.find(connector => connector.id === 'walletConnect')

  // Get current network name
  const getCurrentNetworkName = () => {
    if (!chain) return 'Unknown'
    return chains.find(c => c.id === chain.id)?.name || chain.name
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {getCurrentNetworkName()}
          </div>
        </div>
        <button
          onClick={() => disconnect()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <button
          onClick={() => connect({ connector: metaMaskConnector })}
          disabled={isPending}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 flex-1"
        >
          <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
            <path d="M28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="#E2761B" stroke="#E2761B" strokeWidth="2"/>
            <path d="M20.5 13.5L19 16.5L21.5 17L20.5 13.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
            <path d="M11.5 13.5L10.5 17L13 16.5L11.5 13.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
            <path d="M18 19.5L17 21L20.5 22L21.5 20.5L18 19.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
            <path d="M10.5 20.5L11.5 22L15 21L14 19.5L10.5 20.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.5"/>
          </svg>
          {isPending ? 'Connecting...' : 'MetaMask'}
        </button>
        
        <button
          onClick={() => connect({ connector: walletConnectConnector })}
          disabled={isPending}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 flex-1"
        >
          <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#3B99FC"/>
            <path d="M12.5 9C15 11.5 17 14 19.5 16.5C17 16.5 14.5 16.5 12 16.5C12 14.5 12 12.5 12 10.5C12.1667 10 12.3333 9.5 12.5 9Z" fill="white"/>
            <path d="M19.5 23C17 20.5 15 18 12.5 15.5C15 15.5 17.5 15.5 20 15.5C20 17.5 20 19.5 20 21.5C19.8333 22 19.6667 22.5 19.5 23Z" fill="white"/>
          </svg>
          {isPending ? 'Connecting...' : 'WalletConnect'}
        </button>
      </div>
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">
          Connection failed: {error.message}
        </div>
      )}
    </div>
  )
}