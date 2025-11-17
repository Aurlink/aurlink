import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers' // ← your Wagmi + RainbowKit wrapper
import { wagmi } from '@/lib/wagmi'

export const metadata: Metadata = {
  title: 'Aurlink - Blockchain Infrastructure',
  description:
    'AI-powered blockchain infrastructure for the next generation of decentralized applications',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans antialiased">
        {/* Wrap everything with Wagmi/RainbowKit Providers */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
