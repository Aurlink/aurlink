// components/layout/MobileMenu.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ChevronRight, FileText, Code, BookOpen, ExternalLink } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Documentation', 
      href: '/docs',
      children: [
        { name: 'Getting Started', href: '/docs/getting-started/introduction' },
        { name: 'Core Concepts', href: '/docs/core-concepts/neuralink-consensus' },
        { name: 'API Reference', href: '/docs/api/rest' },
        { name: 'Tutorials', href: '/docs/tutorials' },
        { name: 'Examples', href: '/docs/examples' },
      ]
    },
    { name: 'White Paper', href: '/whitepaper' },
    { name: 'Blog', href: '/blog' },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-80 bg-[#0A0F2C] border-l border-white/10 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="text-white font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full">
          <nav className="space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-gray-400 font-semibold text-sm">
                      {item.name}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {child.name === 'Getting Started' && <BookOpen className="w-4 h-4" />}
                        {child.name === 'Core Concepts' && <Code className="w-4 h-4" />}
                        {child.name === 'API Reference' && <FileText className="w-4 h-4" />}
                        {child.name === 'Tutorials' && <BookOpen className="w-4 h-4" />}
                        {child.name === 'Examples' && <ExternalLink className="w-4 h-4" />}
                        {child.name}
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Get Started Button */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              href="/docs/getting-started/introduction"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-400 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}