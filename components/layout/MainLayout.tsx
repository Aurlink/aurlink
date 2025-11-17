// components/layout/MainLayout.tsx
'use client'
import { useState } from 'react'
import { TopNavigation } from '@/components/layout/TopNavigation'
import { MobileMenu } from '@/components/layout/MobileMenu'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0A0F2C]">
      <TopNavigation onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Main content area - starts below fixed navigation */}
      <main className="pt-16"> {/* This pushes content below fixed nav */}
        {children}
      </main>
    </div>
  )
}