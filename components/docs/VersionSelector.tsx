// components/docs/VersionSelector.tsx
'use client'
import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const versions = [
  { id: 'v1.3.0', name: 'v1.3.0 (Latest)', status: 'stable', default: true },
  { id: 'v1.2.0', name: 'v1.2.0', status: 'stable' },
  { id: 'v1.1.0', name: 'v1.1.0', status: 'deprecated' },
  { id: 'v2.0.0-beta', name: 'v2.0.0 (Beta)', status: 'beta' }
]

export function VersionSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState(versions.find(v => v.default) || versions[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'text-green-400 bg-green-500/20'
      case 'beta': return 'text-yellow-400 bg-yellow-500/20'
      case 'deprecated': return 'text-red-400 bg-red-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
      >
        <span className="text-sm font-medium">{selectedVersion.name}</span>
        <span className={`px-2 py-1 text-xs rounded ${getStatusColor(selectedVersion.status)}`}>
          {selectedVersion.status}
        </span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">
              API Versions
            </div>
            {versions.map(version => (
              <button
                key={version.id}
                onClick={() => {
                  setSelectedVersion(version)
                  setIsOpen(false)
                  // In a real app, you'd update the API base URL here
                  console.log(`Switched to ${version.id}`)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedVersion.id === version.id
                    ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-sm font-medium">{version.name}</span>
                <span className={`px-2 py-1 text-xs rounded ${getStatusColor(version.status)}`}>
                  {version.status}
                </span>
              </button>
            ))}
          </div>
          
          <div className="border-t border-gray-300 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900/50">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <div className="font-semibold mb-1">Base URL:</div>
              <code className="break-all">
                https://api.aurlink.io/{selectedVersion.id.split('-')[0]}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}