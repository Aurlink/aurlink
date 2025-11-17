// app/blog/editor/page.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bold, Italic, List, ListOrdered, Link, Image, FileText,
  Video, Code, Quote, Undo, Redo, Save, Eye, Upload,
  X, Plus, Type, Layout, Settings, Shield
} from 'lucide-react'

// Types
interface User {
  id: string
  email: string
  role: 'user' | 'admin'
  name: string
}

interface BlogPost {
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  featuredImage: File | null
  attachments: File[]
  status: 'draft' | 'published'
  seoTitle: string
  seoDescription: string
}

export default function BlogEditor() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState<BlogPost>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technology',
    tags: [],
    featuredImage: null,
    attachments: [],
    status: 'draft',
    seoTitle: '',
    seoDescription: ''
  })

  const [currentTag, setCurrentTag] = useState('')
  const [isPreview, setIsPreview] = useState(false)

  // Check user authentication and role
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login?redirect=/blog/editor')
          return
        }

        // Verify token and get user data
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          
          // Redirect if not admin
          if (userData.role !== 'admin') {
            router.push('/blog?error=unauthorized')
          }
        } else {
          router.push('/login?redirect=/blog/editor')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login?redirect=/blog/editor')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin()) return
    
    const file = e.target.files?.[0]
    if (file) {
      setPost(prev => ({ ...prev, featuredImage: file }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin()) return
    
    const files = Array.from(e.target.files || [])
    setPost(prev => ({ 
      ...prev, 
      attachments: [...prev.attachments, ...files] 
    }))
  }

  const removeAttachment = (index: number) => {
    if (!isAdmin()) return
    
    setPost(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  const addTag = () => {
    if (!isAdmin()) return
    
    if (currentTag && !post.tags.includes(currentTag)) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (!isAdmin()) return
    
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const formatText = (format: string) => {
    if (!isAdmin()) return
    
    const textarea = document.getElementById('content') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = post.content.substring(start, end)
    
    let formattedText = selectedText
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `_${selectedText}_`
        break
      case 'code':
        formattedText = `\`${selectedText}\``
        break
      case 'link':
        formattedText = `[${selectedText}](url)`
        break
    }
    
    const newContent = post.content.substring(0, start) + formattedText + post.content.substring(end)
    setPost(prev => ({ ...prev, content: newContent }))
  }

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!isAdmin()) {
      alert('Only administrators can save or publish blog posts')
      return
    }

    // Prevent publishing if not admin
    if (status === 'published' && !isAdmin()) {
      alert('Only administrators can publish blog posts')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('title', post.title)
      formData.append('content', post.content)
      formData.append('excerpt', post.excerpt)
      formData.append('category', post.category)
      formData.append('status', status)
      formData.append('tags', JSON.stringify(post.tags))
      formData.append('seoTitle', post.seoTitle)
      formData.append('seoDescription', post.seoDescription)
      
      if (post.featuredImage) {
        formData.append('featuredImage', post.featuredImage)
      }
      
      post.attachments.forEach(file => {
        formData.append('attachments', file)
      })

      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        alert(`Post ${status === 'published' ? 'published' : 'saved as draft'} successfully!`)
        router.push('/blog')
      } else {
        const error = await response.json()
        alert(`Failed to save post: ${error.message}`)
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Failed to save post. Please try again.')
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Checking permissions...</p>
        </div>
      </div>
    )
  }

  // Show unauthorized message if not admin
  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-500/20 border border-red-500/50 rounded-2xl p-6">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h2>
            <p className="text-gray-300 mb-4">
              You need administrator privileges to access the blog editor.
            </p>
            <button
              onClick={() => router.push('/blog')}
              className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl transition-colors"
            >
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Editor Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold">New Blog Post</h1>
                <span className="flex items-center gap-1 bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-lg text-sm">
                  <Shield className="w-3 h-3" />
                  Admin Mode
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Eye className="w-4 h-4" />
                {isPreview ? 'Edit' : 'Preview'}
              </button>
              
              <button
                onClick={() => handleSubmit('draft')}
                className="flex items-center gap-2 px-4 py-2 border border-cyan-500 text-cyan-400 rounded-xl hover:bg-cyan-500/10 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              
              <button
                onClick={() => handleSubmit('published')}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-semibold transition-colors"
              >
                <Upload className="w-4 h-4" />
                Publish
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Image Upload */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Image className="w-5 h-5 text-cyan-400" />
                Featured Image
              </h3>
              <div className="flex items-center gap-4">
                {post.featuredImage ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(post.featuredImage)}
                      alt="Featured"
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setPost(prev => ({ ...prev, featuredImage: null }))}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-20 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center">
                    <Image className="w-6 h-6 text-white/40" />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => imageInputRef.current?.click()}
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
                  >
                    Upload Image
                  </button>
                  <p className="text-gray-400 text-sm mt-1">Recommended: 1200x630px</p>
                </div>
              </div>
            </div>

            {/* Title & Excerpt */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a compelling title..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={post.excerpt}
                  onChange={(e) => setPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of your post..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              {/* Toolbar */}
              <div className="border-b border-white/10 p-4 flex items-center gap-2 flex-wrap">
                <button onClick={() => formatText('bold')} className="p-2 hover:bg-white/10 rounded-lg">
                  <Bold className="w-4 h-4" />
                </button>
                <button onClick={() => formatText('italic')} className="p-2 hover:bg-white/10 rounded-lg">
                  <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-white/20"></div>
                <button onClick={() => formatText('link')} className="p-2 hover:bg-white/10 rounded-lg">
                  <Link className="w-4 h-4" />
                </button>
                <button onClick={() => formatText('code')} className="p-2 hover:bg-white/10 rounded-lg">
                  <Code className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-white/20"></div>
                <button className="p-2 hover:bg-white/10 rounded-lg">
                  <List className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg">
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg">
                  <Quote className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-white/20"></div>
                <button 
                  onClick={() => imageInputRef.current?.click()}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <Image className="w-4 h-4" />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6">
                {isPreview ? (
                  <div className="prose prose-invert max-w-none">
                    <h1>{post.title}</h1>
                    <p className="text-gray-300">{post.excerpt}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                ) : (
                  <textarea
                    id="content"
                    value={post.content}
                    onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Start writing your post... You can use Markdown for formatting."
                    rows={20}
                    className="w-full bg-transparent border-none focus:outline-none resize-none font-mono text-sm"
                  />
                )}
              </div>
            </div>

            {/* File Attachments */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                File Attachments
              </h3>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-dashed border-white/20 rounded-xl hover:bg-white/10 transition-colors mb-4"
              >
                <Plus className="w-4 h-4" />
                Add Files
              </button>

              {post.attachments.length > 0 && (
                <div className="space-y-2">
                  {post.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-cyan-400" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-gray-400 text-sm">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Publishing Settings */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" />
                Publishing
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={post.category}
                    onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Tokenomics">Tokenomics</option>
                    <option value="Business">Business</option>
                    <option value="Development">Development</option>
                    <option value="Research">Research</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={addTag}
                      className="bg-cyan-500 hover:bg-cyan-400 px-3 rounded-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-lg text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-cyan-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                SEO Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={post.seoTitle}
                    onChange={(e) => setPost(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="Optimized title for search engines..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    SEO Description
                  </label>
                  <textarea
                    value={post.seoDescription}
                    onChange={(e) => setPost(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="Meta description for search results..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}