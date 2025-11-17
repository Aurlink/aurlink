// components/docs/MobileMenu.tsx
'use client'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const mobileMenuSections = [
    {
      title: 'Getting Started',
      items: [
        { name: 'Quick Start', href: '/docs/quick-start', badge: 'new' },
        { name: 'Installation', href: '/docs/installation' },
        { name: 'Tutorials', href: '/docs/tutorials' }
      ]
    },
    {
      title: 'API Reference',
      items: [
        { name: 'REST API', href: '/docs/api/rest' },
        { name: 'WebSocket API', href: '/docs/api/websockets' },
        { name: 'GraphQL API', href: '/docs/api/graphql', badge: 'beta' },
        { name: 'API Explorer', href: '/docs/api/explorer' }
      ]
    },
    {
      title: 'SDKs',
      items: [
        { name: 'JavaScript/TypeScript', href: '/docs/sdk/javascript' },
        { name: 'Python', href: '/docs/sdk/python' },
        { name: 'Go', href: '/docs/sdk/go' },
        { name: 'Rust', href: '/docs/sdk/rust' }
      ]
    },
    {
      title: 'Features',
      items: [
        { name: 'AI Features', href: '/docs/ai-features' },
        { name: 'Cross-Chain', href: '/docs/cross-chain' },
        { name: 'Smart Contracts', href: '/docs/smart-contracts' }
      ]
    }
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'new': return 'bg-green-500'
      case 'beta': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">Aurlink</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-8">
                {mobileMenuSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className={`px-2 py-1 text-xs rounded-full text-white ${getBadgeColor(item.badge)}`}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
                <div className="space-y-2">
                  <a
                    href="https://dashboard.aurlink.io"
                    className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">Dashboard</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Manage your apps</div>
                  </a>
                  <a
                    href="https://status.aurlink.io"
                    className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">Status</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">System status</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}