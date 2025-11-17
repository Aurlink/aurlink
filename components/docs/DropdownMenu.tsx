// components/docs/DropdownMenu.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface MenuItem {
  name: string
  href: string
  description: string
  icon?: string
  badge?: 'new' | 'updated' | 'beta'
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

const menuSections: MenuSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        name: 'Quick Start',
        href: '/docs/quick-start',
        description: '5-minute guide to get started',
        icon: '🚀',
        badge: 'new'
      },
      {
        name: 'Installation',
        href: '/docs/installation',
        description: 'Setup and installation guides',
        icon: '📦'
      },
      {
        name: 'Tutorials',
        href: '/docs/tutorials',
        description: 'Step-by-step building guides',
        icon: '🎓'
      }
    ]
  },
  {
    title: 'API Reference',
    items: [
      {
        name: 'REST API',
        href: '/docs/api/rest',
        description: 'Complete REST API documentation',
        icon: '🔌'
      },
      {
        name: 'WebSocket API',
        href: '/docs/api/websockets',
        description: 'Real-time streaming API',
        icon: '📡'
      },
      {
        name: 'GraphQL API',
        href: '/docs/api/graphql',
        description: 'GraphQL API endpoint',
        icon: '🕸️',
        badge: 'beta'
      },
      {
        name: 'API Explorer',
        href: '/docs/api/explorer',
        description: 'Interactive API testing tool',
        icon: '🧪'
      }
    ]
  },
  {
    title: 'SDKs & Tools',
    items: [
      {
        name: 'JavaScript/TypeScript',
        href: '/docs/sdk/javascript',
        description: 'Node.js and browser SDK',
        icon: '🟨'
      },
      {
        name: 'Python SDK',
        href: '/docs/sdk/python',
        description: 'Python SDK for data science',
        icon: '🐍'
      },
      {
        name: 'Go SDK',
        href: '/docs/sdk/go',
        description: 'Go SDK for backend services',
        icon: '🐹'
      },
      {
        name: 'Rust SDK',
        href: '/docs/sdk/rust',
        description: 'Rust SDK for performance',
        icon: '🦀'
      },
      {
        name: 'CLI Tool',
        href: '/docs/tools/cli',
        description: 'Command line interface',
        icon: '💻'
      }
    ]
  },
  {
    title: 'Core Features',
    items: [
      {
        name: 'AI Features',
        href: '/docs/ai-features',
        description: 'Neural Optimization Layer',
        icon: '🧠'
      },
      {
        name: 'Cross-Chain',
        href: '/docs/cross-chain',
        description: 'Aurlink Connect bridge',
        icon: '🔗'
      },
      {
        name: 'Smart Contracts',
        href: '/docs/smart-contracts',
        description: 'Contract development guide',
        icon: '📄'
      },
      {
        name: 'Gas Optimization',
        href: '/docs/gas-optimization',
        description: 'AI-powered gas savings',
        icon: '⛽'
      }
    ]
  },
  {
    title: 'Integrations',
    items: [
      {
        name: 'Next.js',
        href: '/docs/integrations/nextjs',
        description: 'Next.js integration guide',
        icon: '▲'
      },
      {
        name: 'React',
        href: '/docs/integrations/react',
        description: 'React components and hooks',
        icon: '⚛️'
      },
      {
        name: 'Express.js',
        href: '/docs/integrations/express',
        description: 'Backend integration guide',
        icon: '🚂'
      },
      {
        name: 'Python Flask',
        href: '/docs/integrations/flask',
        description: 'Flask integration guide',
        icon: '🍵'
      },
      {
        name: 'Mobile Apps',
        href: '/docs/integrations/mobile',
        description: 'React Native and mobile',
        icon: '📱'
      }
    ]
  },
  {
    title: 'Resources',
    items: [
      {
        name: 'API Changelog',
        href: '/docs/changelog',
        description: 'Version history and updates',
        icon: '📝'
      },
      {
        name: 'Migration Guides',
        href: '/docs/migration',
        description: 'Upgrade and migration help',
        icon: '🔄'
      },
      {
        name: 'Security',
        href: '/docs/security',
        description: 'Security best practices',
        icon: '🔒'
      },
      {
        name: 'Rate Limits',
        href: '/docs/rate-limits',
        description: 'Usage limits and quotas',
        icon: '📊'
      },
      {
        name: 'Support',
        href: '/docs/support',
        description: 'Get help and support',
        icon: '💬'
      }
    ]
  }
]

export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'new': return 'bg-green-500 text-white'
      case 'updated': return 'bg-blue-500 text-white'
      case 'beta': return 'bg-purple-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
      >
        Documentation
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl z-50">
          <div className="p-4">
            {/* Search Header */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Menu Sections */}
            <div className="space-y-6">
              {menuSections.map((section) => (
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
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
                      >
                        <span className="text-lg flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className={`px-1.5 py-0.5 text-xs rounded-full ${getBadgeColor(item.badge)}`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links Footer */}
            <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://dashboard.aurlink.io"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">Dashboard</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Manage your apps</div>
                </a>
                <a
                  href="https://status.aurlink.io"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">Status</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">System status</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}