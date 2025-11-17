// lib/wagmi.ts
import { createConfig, fallback, http } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

// Multiple reliable BSC RPC endpoints
const BSC_RPC_ENDPOINTS = [
  'https://bsc-dataseed.binance.org/',
  'https://bsc-dataseed1.defibit.io/',
  'https://bsc-dataseed1.ninicoin.io/',
  'https://bsc-dataseed2.defibit.io/',
  'https://bsc-dataseed3.ninicoin.io/',
  'https://bsc.meowrpc.com',
]

export const config = getDefaultConfig({
  appName: 'Aurlink IDO',
  projectId: '6565a853c50892f2cde7bfca50688d4c', // Get from https://cloud.walletconnect.com/
  chains: [bsc],
  transports: {
    [bsc.id]: fallback(
      BSC_RPC_ENDPOINTS.map(url => http(url)),
      { rank: false }
    ),
  },
  ssr: true,
})