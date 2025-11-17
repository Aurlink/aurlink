'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useAccount, useDisconnect, useChainId } from 'wagmi'

interface WalletContextType {
  address: string | undefined
  isConnected: boolean
  chainId: number | undefined
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        chainId,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
