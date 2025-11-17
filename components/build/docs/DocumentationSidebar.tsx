// components/docs/DocumentationSidebar.tsx
'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { 
  BookOpen, Brain, Code, Cpu, Database, Zap, Settings, Shield,
  ChevronDown, ChevronRight, Home, GitBranch, Wallet
} from 'lucide-react'

const navigation = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    items: [
      { title: 'Introduction', href: '/docs/getting-started/introduction' },
      { title: 'Quick Start', href: '/docs/getting-started/quickstart' },
      { title: 'Architecture Overview', href: '/docs/getting-started/architecture' },
    ]
  },
  {
    title: 'Core Concepts',
    icon: Brain,
    items: [
      { title: 'NeuraLink Consensus', href: '/docs/core-concepts/neuralink-consensus' },
      { title: 'AurlinkVM', href: '/docs/core-concepts/aurlinkvm' },
      { title: 'Tokenomics & $AUR', href: '/docs/core-concepts/tokenomics' },
      { title: 'Cross-Chain Interoperability', href: '/docs/core-concepts/cross-chain' },
      { title: 'Neural Optimization Layer', href: '/docs/core-concepts/neural-optimization' },
    ]
  },
  {
    title: 'Smart Contracts',
    icon: Code,
    items: [
      { title: 'Aurion Language Guide', href: '/docs/smart-contracts/aurion-guide' },
      { title: 'Solidity on Aurlink', href: '/docs/smart-contracts/solidity' },
      { title: 'AI Precompiles', href: '/docs/smart-contracts/ai-precompiles' },
      { title: 'Testing & Deployment', href: '/docs/smart-contracts/testing-deployment' },
    ]
  },
  {
    title: 'API Reference',
    icon: Database,
    items: [
      { title: 'REST API', href: '/docs/api/rest' },
      { title: 'JSON-RPC', href: '/docs/api/json-rpc' },
      { title: 'WebSocket API', href: '/docs/api/websocket' },
      { title: 'GraphQL', href: '/docs/api/graphql' },
    ]
  }
]

export function DocumentationSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState(['getting-started'])

  const toggleSection = (title: string) => {
    setOpenSections(prev => 
      prev.includes(title) 
        ? prev.filter(s => s !== title)
        : [...prev, title]
    )
  }

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-white/10 bg-[#0A0F2C] h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-8">
          {navigation.map((section) => {
            const IconComponent = section.icon
            const isOpen = openSections.includes(section.title.toLowerCase())
            
            return (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title.toLowerCase())}
                  className="flex items-center gap-3 w-full text-left text-white font-semibold mb-3 hover:text-cyan-400 transition-colors"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="flex-1">{section.title}</span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="space-y-2 ml-7">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {item.title}
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <div className="space-y-2">
            <a href="/whitepaper" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              <BookOpen className="w-4 h-4" />
              White Paper
            </a>
            <a href="/docs/tutorials" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              <Code className="w-4 h-4" />
              Tutorials
            </a>
            <a href="/docs/examples" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              <Settings className="w-4 h-4" />
              Examples
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}