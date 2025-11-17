'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FileText, Plus, Settings, LogOut,
  BookOpen, Download, BarChart3
} from 'lucide-react'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check session storage
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated')
    const userData = sessionStorage.getItem('adminUser')
    
    console.log('🔐 Auth check:', { isAuthenticated, userData })

    if (!isAuthenticated) {
      console.log('❌ Not authenticated, redirecting to login')
      router.push('/admin/login')
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    setLoading(false)
    console.log('✅ Access granted to dashboard')
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated')
    sessionStorage.removeItem('adminUser')
    window.location.href = '/admin/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">
                  Welcome back, {user?.name || 'Admin'}!
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-2xl border border-green-500/20 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">🎉 Login Successful!</h2>
              <p className="text-green-400">You are now authenticated in the Admin Dashboard.</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: FileText, label: 'Total Posts', value: '0', color: 'blue' },
            { icon: BookOpen, label: 'Published', value: '0', color: 'green' },
            { icon: BarChart3, label: 'Featured', value: '0', color: 'purple' },
            { icon: Download, label: 'Resources', value: '0', color: 'cyan' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors group"
            >
              <FileText className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white group-hover:text-cyan-400">New Post</h3>
                <p className="text-gray-400 text-sm">Create a blog post</p>
              </div>
            </Link>
            
            <Link
              href="/admin/resources"
              className="flex items-center gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-colors group"
            >
              <Download className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="font-semibold text-white group-hover:text-purple-400">Resources</h3>
                <p className="text-gray-400 text-sm">Manage files</p>
              </div>
            </Link>
            
            <Link
              href="/admin/categories"
              className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors group"
            >
              <BookOpen className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="font-semibold text-white group-hover:text-green-400">Categories</h3>
                <p className="text-gray-400 text-sm">Organize content</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}