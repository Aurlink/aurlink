// components/docs/PerformanceMonitor.tsx
'use client'
import { useState, useEffect } from 'react'
import { ChartBarIcon, CpuChipIcon, BoltIcon } from '@heroicons/react/24/outline'

interface PerformanceMetrics {
  tps: number
  latency: number
  successRate: number
  activeConnections: number
  aiOptimizationGain: number
  gasSavings: number
}

const mockMetrics: PerformanceMetrics = {
  tps: 12500,
  latency: 142,
  successRate: 99.8,
  activeConnections: 15420,
  aiOptimizationGain: 0.15,
  gasSavings: 1250000
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(mockMetrics)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      // Simulate real-time metric updates
      setMetrics(prev => ({
        tps: prev.tps + (Math.random() - 0.5) * 100,
        latency: prev.latency + (Math.random() - 0.5) * 10,
        successRate: Math.min(99.9, prev.successRate + (Math.random() - 0.5) * 0.1),
        activeConnections: prev.activeConnections + Math.floor((Math.random() - 0.5) * 50),
        aiOptimizationGain: prev.aiOptimizationGain + (Math.random() - 0.5) * 0.01,
        gasSavings: prev.gasSavings + Math.floor((Math.random() - 0.5) * 10000)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [isLive])

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-400'
    if (value >= thresholds.warning) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-300 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Live Performance</h3>
          <p className="text-gray-600 dark:text-gray-400">Real-time network metrics</p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isLive 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
          }`}
        >
          {isLive ? 'Live' : 'Paused'}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {/* TPS */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BoltIcon className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">TPS</span>
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(metrics.tps, { good: 10000, warning: 5000 })}`}>
            {metrics.tps.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">Transactions / Second</div>
        </div>

        {/* Latency */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ChartBarIcon className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Latency</span>
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(metrics.latency, { good: 200, warning: 500 })}`}>
            {metrics.latency}ms
          </div>
          <div className="text-xs text-gray-500 mt-1">Average Response</div>
        </div>

        {/* Success Rate */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Success Rate</span>
          </div>
          <div className={`text-2xl font-bold ${getStatusColor(metrics.successRate, { good: 99.5, warning: 99 })}`}>
            {metrics.successRate}%
          </div>
          <div className="text-xs text-gray-500 mt-1">API Requests</div>
        </div>

        {/* Active Connections */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Connections</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {metrics.activeConnections.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">Active</div>
        </div>

        {/* AI Optimization */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CpuChipIcon className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Gain</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            +{(metrics.aiOptimizationGain * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">Performance</div>
        </div>

        {/* Gas Savings */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-5 h-5 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gas Saved</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {Math.round(metrics.gasSavings / 1000000)}M
          </div>
          <div className="text-xs text-gray-500 mt-1">Total</div>
        </div>
      </div>

      {/* Historical Chart Placeholder */}
      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">TPS History (24h)</span>
          <span className="text-xs text-gray-500">Live updating</span>
        </div>
        <div className="h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded flex items-center justify-center">
          <span className="text-gray-500 text-sm">Live chart would appear here</span>
        </div>
      </div>
    </div>
  )
}