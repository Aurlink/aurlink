// components/docs/RateLimitMonitor.tsx
'use client'
import { useState, useEffect } from 'react'
import { ChartBarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface RateLimitUsage {
  used: number
  remaining: number
  limit: number
  resetTime: number
  endpoint: string
}

const mockUsage: RateLimitUsage[] = [
  { used: 450, remaining: 550, limit: 1000, resetTime: Date.now() + 1800000, endpoint: '/network/*' },
  { used: 120, remaining: 880, limit: 1000, resetTime: Date.now() + 1800000, endpoint: '/transactions/send' },
  { used: 780, remaining: 220, limit: 1000, resetTime: Date.now() + 1800000, endpoint: '/ai/inference' },
  { used: 150, remaining: 850, limit: 1000, resetTime: Date.now() + 1800000, endpoint: '/connect/*' }
]

export function RateLimitMonitor() {
  const [usage, setUsage] = useState<RateLimitUsage[]>(mockUsage)
  const [timeLeft, setTimeLeft] = useState<number>(1800) // 30 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Reset usage when timer reaches 0
          setUsage(prevUsage => prevUsage.map(u => ({
            ...u,
            used: 0,
            remaining: u.limit,
            resetTime: Date.now() + 1800000
          })))
          return 1800
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getUsagePercentage = (used: number, limit: number) => (used / limit) * 100
  const getUsageColor = (percentage: number) => {
    if (percentage < 60) return 'bg-green-500'
    if (percentage < 85) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rate Limit Monitor</h3>
          <p className="text-gray-600 dark:text-gray-400">Track your API usage across endpoints</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600 dark:text-gray-400">Resets in</div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{formatTime(timeLeft)}</div>
        </div>
      </div>

      <div className="space-y-4">
        {usage.map((endpointUsage, index) => {
          const percentage = getUsagePercentage(endpointUsage.used, endpointUsage.limit)
          const isNearLimit = percentage > 85

          return (
            <div key={endpointUsage.endpoint} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-gray-900 dark:text-white">
                    {endpointUsage.endpoint}
                  </code>
                  {isNearLimit && (
                    <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {endpointUsage.used.toLocaleString()} / {endpointUsage.limit.toLocaleString()} requests
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getUsageColor(percentage)}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{endpointUsage.remaining.toLocaleString()} remaining</span>
                <span>{percentage.toFixed(1)}% used</span>
              </div>

              {/* Usage Recommendations */}
              {isNearLimit && (
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300 text-sm">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <span className="font-medium">Approaching rate limit</span>
                  </div>
                  <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">
                    Consider upgrading your plan or optimizing request frequency
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Usage Tips */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Usage Tips</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Implement exponential backoff for retries</li>
          <li>• Cache frequently accessed data when possible</li>
          <li>• Use WebSocket connections for real-time data</li>
          <li>• Monitor usage with the headers: X-RateLimit-*</li>
        </ul>
      </div>

      {/* Response Headers Info */}
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Rate Limit Headers</h4>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 font-mono">
          <div>X-RateLimit-Limit: 1000</div>
          <div>X-RateLimit-Remaining: 550</div>
          <div>X-RateLimit-Reset: 1642726800</div>
        </div>
      </div>
    </div>
  )
}