// app/admin/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { FileText, Users, Eye, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalUsers: 0,
    pageViews: 0
  })

  useEffect(() => {
    // Fetch admin stats
    const fetchStats = async () => {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome to the AurLink admin portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Posts</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalPosts}</p>
            </div>
            <FileText className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Published</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.publishedPosts}</p>
            </div>
            <Eye className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Page Views</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.pageViews}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a
            href="/admin/blog/editor"
            className="bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Create New Post
          </a>
          <a
            href="/admin/users"
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Manage Users
          </a>
        </div>
      </div>
    </div>
  )
}