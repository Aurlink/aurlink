'use client'

export default function TestPage() {
  // Force set authentication
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('adminAuth', 'true')
    sessionStorage.setItem('adminUser', JSON.stringify({
      email: 'test@aurlink.com',
      name: 'Test Admin'
    }))
    window.location.href = '/admin/dashboard'
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Setting up test authentication...</p>
      </div>
    </div>
  )
}