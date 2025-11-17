'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import dashboard from "../components/dashboard";

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('🔐 Client-side login check...')

    // Simple client-side validation - NO API CALLS
    const cleanEmail = email.trim().toLowerCase()
    const cleanPassword = password.trim()

    // Check credentials directly
    if (cleanEmail === 'admin@aurlink.com' && cleanPassword === 'admin123') {
      console.log('✅ Login successful!')
      
      // Store auth in sessionStorage
      sessionStorage.setItem('adminAuth', 'true')
      sessionStorage.setItem('adminUser', JSON.stringify({
        email: cleanEmail,
        name: 'Aurlink Admin'
      }))
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 500)
      
    } else {
      console.log('❌ Invalid credentials')
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setEmail('admin@aurlink.com')
    setPassword('admin123')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400">Client-side authentication</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm font-medium">{error}</p>
                <p className="text-gray-400 text-xs mt-2">
                  Use: admin@aurlink.com / admin123
                </p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  placeholder="admin@aurlink.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  placeholder="admin123"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="px-4 bg-gray-600 text-white font-semibold py-3 rounded-xl hover:bg-gray-500 transition-all duration-200"
              >
                Demo
              </button>
            </div>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
            <p className="text-cyan-400 text-sm text-center">
              <strong>Demo Credentials:</strong><br />
              Email: admin@aurlink.com<br />
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}