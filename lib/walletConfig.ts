import { createConfig, http } from 'wagmi'
import { arbitrum, polygon, bsc } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [arbitrum, polygon, bsc],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    }),
  ],
  transports: {
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL),
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL),
    [bsc.id]: http(process.env.NEXT_PUBLIC_BSC_RPC_URL),
  },
})