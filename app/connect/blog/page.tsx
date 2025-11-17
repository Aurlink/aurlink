'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FileText, Image, Search, Calendar, User, 
  ArrowRight, BookOpen, BarChart3, Download,
  Shield, Zap, Brain, Globe
} from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  featured: boolean
  read_time: string
  published_at: string
  created_at: string
  updated_at: string
}

interface Resource {
  id: number
  title: string
  description: string
  file_url: string
  file_type: string
  file_size: string
  download_count: number
  icon_name: string
}

export default function BlogHomepage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogData()
  }, [])

  const fetchBlogData = async () => {
    try {
      setLoading(true)
      
      // Fetch featured posts
      const featuredResponse = await fetch('/api/blog/posts?featured=true&limit=2')
      const featuredData = await featuredResponse.json()
      setFeaturedPosts(featuredData.posts || [])

      // Fetch recent posts
      const recentResponse = await fetch('/api/blog/posts?limit=5')
      const recentData = await recentResponse.json()
      setRecentPosts(recentData.posts || [])

      // Fetch resources
      const resourcesResponse = await fetch('/api/blog/resources')
      const resourcesData = await resourcesResponse.json()
      setResources(resourcesData.resources || [])

    } catch (error) {
      console.error('Error fetching blog data:', error)
    } finally {
      setLoading(false)
    }
  }

  const iconMap = {
    FileText, BookOpen, BarChart3, Download, Shield, Zap, Brain, Globe
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading blog content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header - Same as before but with real data */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Aurlink Blog</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/blog" className="text-cyan-400 font-semibold">Home</Link>
              <Link href="/blog/technology" className="text-gray-300 hover:text-white transition-colors">Technology</Link>
              <Link href="/blog/tokenomics" className="text-gray-300 hover:text-white transition-colors">Tokenomics</Link>
              <Link href="/blog/business" className="text-gray-300 hover:text-white transition-colors">Business</Link>
              <Link href="/blog/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link>
            </nav>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Aurlink <span className="text-cyan-400">Insights</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Latest updates, technical deep dives, and resources from the Aurlink ecosystem. 
            Stay informed about AI-powered blockchain innovation.
          </p>
        </section>

        {/* Featured Posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Articles</h2>
            <Link href="/blog/featured" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {featuredPosts.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No featured articles yet</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for updates</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-all group">
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-400/20 relative">
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Image className="w-12 h-12 text-white/50" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-sm">{post.read_time}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <User className="w-4 h-4" />
                        {post.author}
                        <Calendar className="w-4 h-4 ml-2" />
                        {new Date(post.published_at).toLocaleDateString()}
                      </div>
                      <Link 
                        href={`/blog/posts/${post.slug}`}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
                      >
                        Read more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Recent Posts & Resources Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">Latest Updates</h2>
            {recentPosts.length === 0 ? (
              <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No articles published yet</p>
                <p className="text-gray-500 text-sm mt-2">Content coming soon</p>
              </div>
            ) : (
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <article key={post.id} className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-sm">{post.read_time}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <User className="w-4 h-4" />
                        {post.author}
                        <Calendar className="w-4 h-4 ml-2" />
                        {new Date(post.published_at).toLocaleDateString()}
                      </div>
                      <Link 
                        href={`/blog/posts/${post.slug}`}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
                      >
                        Read more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Resources */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Resources
              </h3>
              {resources.length === 0 ? (
                <p className="text-gray-400 text-sm">No resources available</p>
              ) : (
                <div className="space-y-4">
                  {resources.map((resource) => {
                    const IconComponent = iconMap[resource.icon_name as keyof typeof iconMap] || FileText
                    return (
                      <div key={resource.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <p className="font-semibold group-hover:text-cyan-400 transition-colors">
                              {resource.title}
                            </p>
                            <p className="text-gray-400 text-sm">{resource.description}</p>
                          </div>
                        </div>
                        <a 
                          href={resource.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-lg"
                          onClick={() => {
                            // Increment download count
                            fetch(`/api/blog/resources/${resource.id}/download`, { method: 'POST' })
                          }}
                        >
                          <Download className="w-4 h-4 text-cyan-400" />
                        </a>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Categories */}
            <CategoriesSidebar />

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-2xl border border-cyan-500/30 p-6">
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="text-gray-300 text-sm mb-4">
                Get the latest Aurlink news and technical updates delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500"
                />
                <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 rounded-xl transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Same as before */}
      <footer className="border-t border-white/10 mt-16">
        {/* ... footer content ... */}
      </footer>
    </div>
  )
}

// Categories Sidebar Component
function CategoriesSidebar() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
      <h3 className="text-xl font-bold mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category: any) => (
          <Link
            key={category.id}
            href={`/blog/category/${category.slug}`}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
          >
            <span className="group-hover:text-cyan-400 transition-colors">
              {category.name} {category.post_count > 0 && `(${category.post_count})`}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}