'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  DocumentTextIcon,
  CodeBracketIcon,
  CpuChipIcon,
  ArrowsRightLeftIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  AcademicCapIcon,
  WrenchIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlayCircleIcon,
  RocketLaunchIcon,
  BugAntIcon,
  CommandLineIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'

interface NavItem {
  name: string
  href: string
  icon: any
  badge?: 'new' | 'updated' | 'beta'
  description?: string
}

interface Section {
  title: string
  items: NavItem[]
  defaultOpen?: boolean
}

const quickLinks = [
  { name: 'Dashboard', href: '/dashboard', external: false },
  { name: 'GitHub', href: 'https://github.com/aurlink', external: true },
  { name: 'Status', href: 'https://status.aurlink.io', external: true },
  { name: 'Community', href: 'https://discord.gg/aurlink', external: true },
  { name: 'Blog', href: '/blog', external: false },
]

const sections: Section[] = [
  {
    title: 'Introduction',
    items: [
      { 
        name: 'Overview', 
        href: '/build/docs/overview', 
        icon: BookOpenIcon,
        description: 'Get started with Aurlink documentation'
      },
    ],
    defaultOpen: true
  },
  {
    title: 'Getting Started',
    items: [
      { 
        name: 'Quick Start', 
        href: '/build/docs/quick-start', 
        icon: RocketLaunchIcon,
        badge: 'new',
        description: '5-minute setup guide'
      },
      { 
        name: 'Introduction', 
        href: '/build/docs/introduction', 
        icon: BookOpenIcon,
        description: 'Comprehensive platform overview'
      },
    ],
    defaultOpen: true
  },
  {
    title: 'Core Concepts',
    items: [
      { 
        name: 'NeuraLink Consensus', 
        href: '/build/docs/core-concepts/neuralink-consensus', 
        icon: AcademicCapIcon,
        description: 'AI-powered consensus mechanism'
      },
      { 
        name: 'AurlinkVM', 
        href: '/build/docs/core-concepts/aurlinkvm', 
        icon: CodeBracketIcon,
        description: 'Virtual machine architecture'
      },
      { 
        name: 'Tokenomics & $AUR', 
        href: '/build/docs/core-concepts/tokenomics', 
        icon: DocumentTextIcon,
        description: 'Token economics and utility'
      },
      { 
        name: 'Aurlink Connect', 
        href: '/docs/core-concepts/aurlink-connect', 
        icon: CpuChipIcon,
        description: 'Cross-chain interoperability'
      },
      { 
        name: 'Neural Optimization Layer', 
        href: '/build/docs/core-concepts/neural-optimization-layer', 
        icon: CpuChipIcon,
        badge: 'beta',
        description: 'AI-driven performance optimization'
      },
    ]
  },
  {
    title: 'APIs & SDKs',
    items: [
      { 
        name: 'REST API', 
        href: '/build/docs/api/rest', 
        icon: CodeBracketIcon,
        description: 'RESTful API reference'
      },
      { 
        name: 'WebSocket API', 
        href: '/build/docs/api/websockets', 
        icon: ArrowsRightLeftIcon,
        description: 'Real-time WebSocket API'
      },
      { 
        name: 'JavaScript SDK', 
        href: '/build/docs/sdk/javascript', 
        icon: DocumentTextIcon,
        description: 'Node.js and browser SDK'
      },
      { 
        name: 'Python SDK', 
        href: '/build/docs/sdk/python', 
        icon: DocumentTextIcon,
        description: 'Python client library'
      },
    ]
  },
  {
    title: 'AI & Cross-Chain',
    items: [
      { 
        name: 'AI Features', 
        href: '/build/docs/ai-features', 
        icon: CpuChipIcon,
        badge: 'new',
        description: 'AI-powered capabilities'
      },
      { 
        name: 'Cross-Chain', 
        href: '/build/docs/cross-chain', 
        icon: ArrowsRightLeftIcon,
        description: 'Multi-chain operations'
      },
    ]
  },
  {
    title: 'Developer Tools',
    items: [
      { 
        name: 'Adaptive IDE', 
        href: '/build/docs/tools/adaptive-ide', 
        icon: WrenchIcon,
        badge: 'beta',
        description: 'AI-assisted development environment'
      },
      { 
        name: 'CLI Tools', 
        href: '/build/docs/tools/cli', 
        icon: CommandLineIcon,
        description: 'Command-line interface'
      },
      { 
        name: 'Testing Framework', 
        href: '/build/docs/tools/testing', 
        icon: BugAntIcon,
        description: 'Testing and debugging tools'
      },
    ]
  },
  {
    title: 'Smart Contracts',
    items: [
      { 
        name: 'Aurion Language Guide', 
        href: '/build/docs/smart-contracts/aurion-language', 
        icon: CodeBracketIcon,
        description: 'Smart contract programming language'
      },
    ]
  },
  {
    title: 'Learning',
    items: [
      { 
        name: 'Introduction', 
        href: '/build/docs/tutorial/introduction', 
        icon: SparklesIcon,
        description: 'Tutorials overview'
      },
      { 
        name: 'Tutorials', 
        href: '/build/docs/tutorials', 
        icon: BookOpenIcon,
        description: 'Step-by-step guides'
      },
      { 
        name: 'Examples Gallery', 
        href: '/build/docs/examples', 
        icon: BookOpenIcon,
        description: 'Code examples and snippets'
      },
      { 
        name: 'First AI dApp', 
        href: '/build/docs/tutorial/first-ai-dapp', 
        icon: SparklesIcon,
        badge: 'new',
        description: 'Build your first AI-powered dApp'
      },
      { 
        name: 'Interactive Playground', 
        href: '/components/docs/playground', 
        icon: PlayCircleIcon,
        description: 'Live code editor and testing'
      },
    ]
  },
  {
    title: 'Security',
    items: [
      { 
        name: 'Security Guidelines', 
        href: '/build/docs/security', 
        icon: ShieldCheckIcon,
        description: 'Security best practices'
      },
    ]
  },
]

const Badge = ({ type }: { type: 'new' | 'updated' | 'beta' }) => {
  const styles = {
    new: 'bg-green-500/20 text-green-400 border-green-500/30',
    updated: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    beta: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  }
  
  const labels = {
    new: 'New',
    updated: 'Updated',
    beta: 'Beta'
  }

  return (
    <span className={`px-1.5 py-0.5 text-xs rounded-full border ${styles[type]}`}>
      {labels[type]}
    </span>
  )
}

const ArrowTopRightOnSquareIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
)

export function SidebarNav() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Initialize sections and auto-open active section
  useEffect(() => {
    const initialOpenState: Record<string, boolean> = {}
    
    // Find active section and open it
    let activeSectionTitle = ''
    sections.forEach(section => {
      const isActive = section.items.some(item => pathname === item.href)
      if (isActive) {
        activeSectionTitle = section.title
      }
    })

    sections.forEach(section => {
      initialOpenState[section.title] = 
        section.defaultOpen || 
        section.title === activeSectionTitle ||
        searchQuery.length > 0 // Keep filtered sections open
    })
    
    setOpenSections(initialOpenState)
  }, [pathname, searchQuery])

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }))
  }

  // Filter sections based on search query
  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0)

  // Auto-close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen bg-gray-900/95 backdrop-blur-lg border-r border-gray-800 
        z-40 transition-transform duration-300 ease-in-out overflow-y-auto
        ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        w-80 lg:w-80 flex flex-col
      `}>
        <div className="flex-1 p-6">
          {/* Logo */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <DocumentTextIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white block group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-200">
                  Aurlink
                </span>
                <span className="text-sm text-gray-400">Documentation</span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-1 flex-1">
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <div key={section.title} className="mb-6">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full px-2 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider hover:text-white transition-colors group"
                  >
                    <span className="group-hover:text-purple-400 transition-colors">
                      {section.title}
                    </span>
                    {openSections[section.title] ? (
                      <ChevronDownIcon className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                    )}
                  </button>

                  {/* Section Items */}
                  {openSections[section.title] && (
                    <div className="mt-2 space-y-1">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon
                        
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-start gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 group border ${
                              isActive
                                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30 shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50 border-transparent hover:border-gray-700'
                            }`}
                          >
                            <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isActive ? 'text-purple-400' : 'text-gray-500 group-hover:text-gray-300'
                            }`} />
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`font-medium ${
                                  isActive ? 'text-purple-400' : 'text-gray-300 group-hover:text-white'
                                }`}>
                                  {item.name}
                                </span>
                                {item.badge && <Badge type={item.badge} />}
                              </div>
                              {item.description && (
                                <div className={`text-xs ${
                                  isActive ? 'text-purple-300/80' : 'text-gray-500 group-hover:text-gray-400'
                                }`}>
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MagnifyingGlassIcon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No results found</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-purple-400 hover:text-purple-300 text-sm mt-2"
                >
                  Clear search
                </button>
              </div>
            )}
          </nav>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 group"
                  >
                    <span>{link.name}</span>
                    <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  >
                    <span>{link.name}</span>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="p-4 border-t border-gray-800 bg-gray-800/20">
          <div className="text-xs text-gray-400">
            <div className="flex items-center justify-between">
              <span>Version 2.1.0</span>
              <span className="text-green-400">● Live</span>
            </div>
            <div className="text-gray-500 mt-1">Last updated: Dec 2024</div>
          </div>
        </div>
      </div>
    </>
  )
}