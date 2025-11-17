// components/docs/SdkPopularity.tsx
'use client'
import { useState, useEffect } from 'react'
import { ChartBarIcon, TrendingUpIcon, DownloadIcon } from '@heroicons/react/24/outline'

interface SdkStats {
  name: string
  package: string
  downloads: number
  weeklyTrend: number
  version: string
  lastUpdated: string
}

const initialStats: SdkStats[] = [
  {
    name: 'JavaScript/TypeScript',
    package: '@aurlink/sdk',
    downloads: 154289,
    weeklyTrend: 12.5,
    version: '1.3.0',
    lastUpdated: '2024-01-15'
  },
  {
    name: 'Python',
    package: 'aurlink-sdk',
    downloads: 89234,
    weeklyTrend: 8.2,
    version: '1.2.1',
    lastUpdated: '2024-01-18'
  },
  {
    name: 'Go',
    package: 'github.com/aurlink/sdk',
    downloads: 45678,
    weeklyTrend: 15.7,
    version: '1.1.0',
    lastUpdated: '2024-01-10'
  },
  {
    name: 'Rust',
    package: 'aurlink-sdk',
    downloads: 23456,
    weeklyTrend: 23.1,
    version: '0.9.0',
    lastUpdated: '2024-01-20'
  }
]

export function SdkPopularity() {
  const [stats, setStats] = useState<SdkStats[]>(initialStats)
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all'>('all')

  useEffect(() => {
    // Simulate real-time download updates
    const interval = setInterval(() => {
      setStats(prev => prev.map(sdk => ({
        ...sdk,
        downloads: sdk.downloads + Math.floor(Math.random() * 10),
        weeklyTrend: sdk.weeklyTrend + (Math.random() - 0.5) * 0.5
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getTotalDownloads = () => stats.reduce((total, sdk) => total + sdk.downloads, 0)

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">SDK Popularity</h3>
          <p className="text-gray-600 dark:text-gray-400">Real-time download statistics across all SDKs</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {getTotalDownloads().toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Downloads</div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2 mb-6">
        {(['weekly', 'monthly', 'all'] as const).map(time => (
          <button
            key={time}
            onClick={() => setTimeframe(time)}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              timeframe === time
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* SDK Stats Grid */}
      <div className="grid gap-4">
        {stats.map((sdk, index) => (
          <div
            key={sdk.package}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <DownloadIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{sdk.name}</h4>
                  <code className="text-sm text-gray-600 dark:text-gray-400">{sdk.package}</code>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {sdk.downloads.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">downloads</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                style={{
                  width: `${(sdk.downloads / getTotalDownloads()) * 100}%`
                }}
              ></div>
            </div>

            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="w-4 h-4 text-green-500" />
                <span>+{sdk.weeklyTrend.toFixed(1)}% this week</span>
              </div>
              <div className="flex items-center gap-4">
                <span>v{sdk.version}</span>
                <span>Updated {sdk.lastUpdated}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Installation Commands */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Installation</h4>
        <div className="grid gap-2">
          {stats.map(sdk => (
            <div key={sdk.package} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{sdk.name}</span>
              <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {sdk.package.includes('@') 
                  ? `npm install ${sdk.package}`
                  : sdk.package.includes('github.com')
                  ? `go get ${sdk.package}`
                  : `pip install ${sdk.package}`
                }
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}