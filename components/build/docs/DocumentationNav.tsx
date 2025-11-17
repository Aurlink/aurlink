// components/docs/DocumentationNav.tsx
'use client'
import { useState } from 'react'
import { Search, Menu, X, BookOpen, Github, Discord } from 'lucide-react'

export function DocumentationNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F2C]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Aurlink Docs</span>
            </a>
            
            {/* Version Selector */}
            <div className="hidden md:flex items-center gap-2">
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-cyan-400">
                <option value="v1.3">v1.3 (Latest)</option>
                <option value="v1.2">v1.2</option>
                <option value="v1.1">v1.1</option>
              </select>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Latest</span>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-cyan-400/30 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline text-sm">Search docs...</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 bg-white/10 rounded text-xs">⌘K</kbd>
            </button>

            {/* Community Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/aurlink"
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/aurlink"
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Discord className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto mt-20">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documentation, APIs, tutorials..."
                className="w-full pl-12 pr-4 py-4 bg-[#1A1F3C] border border-cyan-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}