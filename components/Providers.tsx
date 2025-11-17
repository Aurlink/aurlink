"use client";

import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { config } from "@/lib/wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#1D4ED8",
          accentColorForeground: "#ffffff",
          borderRadius: "large",
          overlayBlur: "small",
        })}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
