// app/admin/layout.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, LogOut, Settings, Users, FileText, BarChart3 } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login?redirect=/admin')
          return
        }

        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        })

        if (response.ok) {
          const userData = await response.json()
          if (userData.role === 'admin') {
            setUser(userData)
          } else {
            router.push('/?error=unauthorized')
          }
        } else {
          router.push('/login?redirect=/admin')
        }
      } catch (error) {
        router.push('/login?redirect=/admin')
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAccess()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            Admin Portal
          </h1>
          <p className="text-gray-400 text-sm mt-1">AurLink Content Management</p>
        </div>
        
        <nav className="p-4 space-y-2">
          <a
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </a>
          <a
            href="/admin/blog"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FileText className="w-5 h-5" />
            Blog Management
          </a>
          <a
            href="/admin/users"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
            User Management
          </a>
          <a
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}