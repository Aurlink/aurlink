// app/admin/blog/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  status: 'draft' | 'published'
  createdAt: string
  views: number
}

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/admin/blog/posts', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.ok) {
      const data = await response.json()
      setPosts(data)
    }
  }

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    const token = localStorage.getItem('token')
    const response = await fetch(`/api/admin/blog/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    if (response.ok) {
      fetchPosts() // Refresh list
    }
  }

  const toggleStatus = async (postId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    const token = localStorage.getItem('token')
    
    const response = await fetch(`/api/admin/blog/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    
    if (response.ok) {
      fetchPosts() // Refresh list
    }
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog Management</h1>
          <p className="text-gray-400">Manage and publish blog posts</p>
        </div>
        <a
          href="/admin/blog/editor"
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Post
        </a>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left p-4 text-gray-300 font-semibold">Title</th>
              <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
              <th className="text-left p-4 text-gray-300 font-semibold">Created</th>
              <th className="text-left p-4 text-gray-300 font-semibold">Views</th>
              <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id} className="border-b border-gray-700 hover:bg-gray-750">
                <td className="p-4 text-white font-medium">{post.title}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'published' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {post.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {post.status}
                  </span>
                </td>
                <td className="p-4 text-gray-300">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-gray-300">{post.views}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <a
                      href={`/admin/blog/editor?id=${post.id}`}
                      className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4 text-blue-400" />
                    </a>
                    <button
                      onClick={() => toggleStatus(post.id, post.status)}
                      className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      {post.status === 'published' ? 
                        <EyeOff className="w-4 h-4 text-yellow-400" /> : 
                        <Eye className="w-4 h-4 text-green-400" />
                      }
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}