// components/layout/TopNavigation.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Menu, X, FileText, Code, BookOpen, 
  ExternalLink, ChevronDown, Search 
} from 'lucide-react'

interface TopNavigationProps {
  onMobileMenuToggle: () => void
}

export function TopNavigation({ onMobileMenuToggle }: TopNavigationProps) {
  const [isDocsOpen, setIsDocsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Documentation', 
      href: '/docs',
      children: [
        { name: 'Getting Started', href: '/docs/getting-started/introduction' },
        { name: 'API Reference', href: '/docs/api/rest' },
        { name: 'Tutorials', href: '/docs/tutorials' },
        { name: 'Examples', href: '/docs/examples' },
      ]
    },
    { name: 'White Paper', href: '/whitepaper' },
    { name: 'Blog', href: '/blog' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F2C]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Aurlink</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsDocsOpen(!isDocsOpen)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-cyan-400 bg-cyan-400/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        isDocsOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDocsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-[#1A1F3C] border border-white/10 rounded-xl shadow-xl backdrop-blur-xl">
                        <div className="p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
                            >
                              {child.name === 'Getting Started' && <BookOpen className="w-4 h-4" />}
                              {child.name === 'API Reference' && <Code className="w-4 h-4" />}
                              {child.name === 'Tutorials' && <FileText className="w-4 h-4" />}
                              {child.name === 'Examples' && <ExternalLink className="w-4 h-4" />}
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link
              href="/docs/getting-started/introduction"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}