// components/docs/ApiChangelog.tsx
'use client'
import { useState } from 'react'
import { ExclamationTriangleIcon, CheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

interface ChangeEntry {
  version: string
  date: string
  type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security'
  description: string
  breaking: boolean
  migrationGuide?: string
  endpoints?: string[]
}

const changelog: ChangeEntry[] = [
  {
    version: '1.3.0',
    date: '2024-01-15',
    type: 'added',
    description: 'Neural Optimization Layer with real-time AI inference endpoints',
    breaking: false,
    endpoints: ['/ai/inference', '/ai/models']
  },
  {
    version: '1.3.0',
    date: '2024-01-15',
    type: 'added',
    description: 'Cross-chain connectivity with Aurlink Connect',
    breaking: false,
    endpoints: ['/connect/route', '/connect/execute']
  },
  {
    version: '1.2.0',
    date: '2024-01-05',
    type: 'changed',
    description: 'Improved transaction gas estimation with AI optimization',
    breaking: false,
    endpoints: ['/transactions/send']
  },
  {
    version: '1.2.0',
    date: '2024-01-05',
    type: 'deprecated',
    description: 'Legacy price prediction endpoint in favor of AI inference',
    breaking: false,
    migrationGuide: '/docs/migration/1.2.0-price-prediction',
    endpoints: ['/v1/predict/price']
  },
  {
    version: '1.1.0',
    date: '2023-12-20',
    type: 'removed',
    description: 'WebSocket v1 protocol support',
    breaking: true,
    migrationGuide: '/docs/migration/1.1.0-websockets',
    endpoints: ['/ws/v1']
  },
  {
    version: '1.1.0',
    date: '2023-12-20',
    type: 'fixed',
    description: 'Memory leak in long-lived WebSocket connections',
    breaking: false,
    endpoints: ['/ws/v2']
  },
  {
    version: '1.0.0',
    date: '2023-12-01',
    type: 'security',
    description: 'Enhanced API key validation and rate limiting',
    breaking: false,
    endpoints: ['*']
  }
]

export function ApiChangelog() {
  const [filter, setFilter] = useState<'all' | ChangeEntry['type']>('all')
  const [showBreakingOnly, setShowBreakingOnly] = useState(false)

  const filteredChanges = changelog.filter(entry => {
    if (showBreakingOnly && !entry.breaking) return false
    if (filter !== 'all' && entry.type !== filter) return false
    return true
  })

  const getTypeColor = (type: ChangeEntry['type']) => {
    switch (type) {
      case 'added': return 'bg-green-500/20 text-green-400'
      case 'changed': return 'bg-yellow-500/20 text-yellow-400'
      case 'deprecated': return 'bg-orange-500/20 text-orange-400'
      case 'removed': return 'bg-red-500/20 text-red-400'
      case 'fixed': return 'bg-blue-500/20 text-blue-400'
      case 'security': return 'bg-purple-500/20 text-purple-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getTypeIcon = (type: ChangeEntry['type']) => {
    switch (type) {
      case 'added': return '➕'
      case 'changed': return '🔄'
      case 'deprecated': return '⚠️'
      case 'removed': return '🗑️'
      case 'fixed': return '🔧'
      case 'security': return '🔒'
      default: return '📝'
    }
  }

  const changeTypes: { id: ChangeEntry['type'] | 'all'; name: string; count: number }[] = [
    { id: 'all', name: 'All Changes', count: changelog.length },
    { id: 'added', name: 'Added', count: changelog.filter(c => c.type === 'added').length },
    { id: 'changed', name: 'Changed', count: changelog.filter(c => c.type === 'changed').length },
    { id: 'deprecated', name: 'Deprecated', count: changelog.filter(c => c.type === 'deprecated').length },
    { id: 'removed', name: 'Removed', count: changelog.filter(c => c.type === 'removed').length },
    { id: 'fixed', name: 'Fixed', count: changelog.filter(c => c.type === 'fixed').length },
    { id: 'security', name: 'Security', count: changelog.filter(c => c.type === 'security').length }
  ]

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">API Changelog</h3>
          <p className="text-gray-600 dark:text-gray-400">Track changes, updates, and migration guides</p>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-300 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            {changeTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setFilter(type.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === type.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {type.name} ({type.count})
              </button>
            ))}
          </div>

          {/* Breaking Changes Toggle */}
          <label className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
            <input
              type="checkbox"
              checked={showBreakingOnly}
              onChange={(e) => setShowBreakingOnly(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Breaking Changes Only
            </span>
          </label>
        </div>
      </div>

      {/* Changelog Entries */}
      <div className="p-6">
        <div className="space-y-6">
          {filteredChanges.map((entry, index) => (
            <div
              key={`${entry.version}-${index}`}
              className={`p-4 rounded-lg border ${
                entry.breaking
                  ? 'bg-red-500/10 border-red-500/20'
                  : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(entry.type)}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        v{entry.version}
                      </h4>
                      <span className={`px-2 py-1 rounded text-xs capitalize ${getTypeColor(entry.type)}`}>
                        {entry.type}
                      </span>
                      {entry.breaking && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                          <ExclamationTriangleIcon className="w-3 h-3" />
                          Breaking
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Released {entry.date}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {entry.description}
              </p>

              {/* Affected Endpoints */}
              {entry.endpoints && (
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Affected Endpoints:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {entry.endpoints.map(endpoint => (
                      <code
                        key={endpoint}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {endpoint}
                      </code>
                    ))}
                  </div>
                </div>
              )}

              {/* Migration Guide */}
              {entry.migrationGuide && (
                <a
                  href={entry.migrationGuide}
                  className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors text-sm"
                >
                  <InformationCircleIcon className="w-4 h-4" />
                  View Migration Guide
                </a>
              )}
            </div>
          ))}

          {filteredChanges.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <CheckIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No changes match your current filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Version Summary */}
      <div className="p-6 border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Current Version: v1.3.0</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-600 dark:text-gray-400">Stable Since</div>
            <div className="font-semibold text-gray-900 dark:text-white">2024-01-15</div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">Next Planned</div>
            <div className="font-semibold text-gray-900 dark:text-white">v1.4.0 (Q1 2024)</div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">Support Until</div>
            <div className="font-semibold text-gray-900 dark:text-white">2024-06-15</div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">Breaking Changes</div>
            <div className="font-semibold text-red-500">1 in last 3 versions</div>
          </div>
        </div>
      </div>
    </div>
  )
}