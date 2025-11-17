'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // SIMPLE HARD-CODED LOGIN - NO API
    sessionStorage.setItem('adminAuth', 'true')
    sessionStorage.setItem('adminUser', JSON.stringify({
      email: email || 'admin@aurlink.com',
      name: 'Aurlink Admin'
    }))
    
    // Force redirect
    window.location.href = '/admin/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400">Enter any credentials to login</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Any email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Any password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-3 rounded-xl"
            >
              Login (No Validation)
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                sessionStorage.setItem('adminAuth', 'true')
                window.location.href = '/admin/dashboard'
              }}
              className="text-cyan-400 underline"
            >
              Or click here to skip login entirely
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}