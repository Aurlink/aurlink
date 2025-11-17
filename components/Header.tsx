// components/Header.tsx
'use client'
import Link from 'next/link'
import { DropdownMenu } from './docs/DropdownMenu'
import { MobileMenu } from './docs/MobileMenu'
import { ThemeToggle } from './ThemeToggle'
import { VersionSelector } from './docs/VersionSelector'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Aurlink</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <DropdownMenu />
            <a
              href="/pricing"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="/blog"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              Blog
            </a>
            <a
              href="/support"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              Support
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center gap-3">
              <VersionSelector />
              <ThemeToggle />
              <a
                href="https://dashboard.aurlink.io"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
              >
                Dashboard
              </a>
            </div>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}