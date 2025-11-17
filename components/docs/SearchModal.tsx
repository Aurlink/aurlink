// components/docs/SearchModal.tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlassIcon, XMarkIcon, DocumentTextIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

interface SearchResult {
  id: string
  title: string
  description: string
  category: 'api' | 'sdk' | 'guide' | 'ai'
  path: string
  relevance: number
}

const mockResults: SearchResult[] = [
  {
    id: 'rest-api',
    title: 'REST API Reference',
    description: 'Complete REST API documentation for all endpoints',
    category: 'api',
    path: '/docs/api/rest',
    relevance: 0.95
  },
  {
    id: 'quick-start',
    title: 'Quick Start Guide',
    description: 'Get started in 5 minutes with basic examples',
    category: 'guide', 
    path: '/docs/quick-start',
    relevance: 0.90
  },
  {
    id: 'ai-inference',
    title: 'AI Inference API',
    description: 'Perform AI predictions and analytics',
    category: 'ai',
    path: '/docs/ai-features',
    relevance: 0.85
  },
  {
    id: 'js-sdk',
    title: 'JavaScript SDK',
    description: 'TypeScript/JavaScript SDK documentation',
    category: 'sdk',
    path: '/docs/sdk/javascript', 
    relevance: 0.80
  },
  {
    id: 'python-sdk',
    title: 'Python SDK',
    description: 'Python SDK for data science and research',
    category: 'sdk',
    path: '/docs/sdk/python',
    relevance: 0.75
  },
  {
    id: 'websockets',
    title: 'WebSocket API',
    description: 'Real-time data streaming documentation',
    category: 'api',
    path: '/docs/api/websockets',
    relevance: 0.70
  }
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    const filtered = mockResults
      .filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase()) ||
        result.category.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 8)

    setResults(filtered)
  }, [query])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'api': return CodeBracketIcon
      case 'sdk': return CodeBracketIcon  
      case 'ai': return DocumentTextIcon
      default: return DocumentTextIcon
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'api': return 'text-blue-400 bg-blue-500/20'
      case 'sdk': return 'text-green-400 bg-green-500/20'
      case 'ai': return 'text-purple-400 bg-purple-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50"
          >
            <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder-gray-400 text-lg px-12 py-4 focus:outline-none focus:ring-0"
                />
                <button
                  onClick={onClose}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="border-t border-gray-700 max-h-96 overflow-y-auto">
                  {results.map((result, index) => {
                    const Icon = getCategoryIcon(result.category)
                    return (
                      <motion.a
                        key={result.id}
                        href={result.path}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-4 p-4 hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-b-0"
                        onClick={onClose}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(result.category)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-semibold truncate">
                              {result.title}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded capitalize ${getCategoryColor(result.category)}`}>
                              {result.category}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {result.description}
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            {result.path}
                          </div>
                        </div>
                      </motion.a>
                    )
                  })}
                </div>
              )}

              {/* Empty State */}
              {query && results.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  <DocumentTextIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-2">Try different keywords or check the documentation index</p>
                </div>
              )}

              {/* Quick Navigation */}
              {!query && (
                <div className="p-6 border-t border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Quick Navigation
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="/docs/quick-start"
                      className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
                      onClick={onClose}
                    >
                      <div className="text-white font-medium">Quick Start</div>
                      <div className="text-gray-400 text-sm">Get started in 5 minutes</div>
                    </a>
                    <a
                      href="/docs/api/rest"
                      className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
                      onClick={onClose}
                    >
                      <div className="text-white font-medium">REST API</div>
                      <div className="text-gray-400 text-sm">Complete API reference</div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}