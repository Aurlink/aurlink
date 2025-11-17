'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, bsc } from 'wagmi/chains';
import { WalletProvider } from '../contexts/WalletContext';

const config = getDefaultConfig({
  appName: 'Aurlink IDO Dashboard',
  projectId: '6565a853c50892f2cde7bfca50688d4c', // replace with your actual WC project ID
  chains: [mainnet, bsc],
  ssr: true,
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#0ed1d6', // Aurlink cyan
            accentColorForeground: '#ffffff',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          modalSize="compact"
        >
          <WalletProvider>{children}</WalletProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
