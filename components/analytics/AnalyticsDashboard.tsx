// components/analytics/AnalyticsDashboard.tsx
'use client'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics')
        const data = await response.json()
        setAnalytics(data)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Views */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <h3 className="text-gray-400 text-sm font-medium mb-2">Total Views</h3>
        <p className="text-3xl font-bold text-white">{analytics?.totalViews || 0}</p>
        <p className="text-green-400 text-sm mt-1">+12% from last month</p>
      </div>

      {/* Average Read Time */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <h3 className="text-gray-400 text-sm font-medium mb-2">Avg. Read Time</h3>
        <p className="text-3xl font-bold text-white">{analytics?.avgReadTime || 0}m</p>
        <p className="text-cyan-400 text-sm mt-1">+2m engagement</p>
      </div>

      {/* Top Post */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <h3 className="text-gray-400 text-sm font-medium mb-2">Top Post</h3>
        <p className="text-white font-semibold truncate">{analytics?.topPost?.title || 'N/A'}</p>
        <p className="text-cyan-400 text-sm mt-1">{analytics?.topPost?.views || 0} views</p>
      </div>

      {/* Downloads */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
        <h3 className="text-gray-400 text-sm font-medium mb-2">Downloads</h3>
        <p className="text-3xl font-bold text-white">{analytics?.totalDownloads || 0}</p>
        <p className="text-purple-400 text-sm mt-1">+8 files this week</p>
      </div>
    </div>
  )
}