// app/blog/page.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  FileText, Image, Upload, Search, Calendar, User, 
  ArrowRight, BookOpen, BarChart3, Download,
  Shield, Zap, Brain, Globe
} from 'lucide-react'

const featuredPosts = [
  {
    id: 1,
    title: "NeuraLink Consensus: Technical Deep Dive",
    excerpt: "Exploring the AI-powered consensus mechanism that achieves 90% fault prediction accuracy and 15% TPS gains.",
    category: "Technology",
    author: "Protocol Team",
    date: "2025-01-15",
    readTime: "8 min read",
    image: "/api/placeholder/400/250",
    featured: true
  },
  {
    id: 2,
    title: "Aurlink Tokenomics: Complete Analysis",
    excerpt: "Detailed breakdown of $AUR distribution, utility, and economic model for investors and developers.",
    category: "Tokenomics",
    author: "Economics Team",
    date: "2025-01-12",
    readTime: "6 min read",
    image: "/api/placeholder/400/250",
    featured: true
  }
]

const recentPosts = [
  {
    id: 3,
    title: "Cross-Chain Interoperability with Aurlink Connect",
    excerpt: "How AI-powered routing reduces slippage by 25% across major blockchain networks.",
    category: "Technology",
    author: "Engineering Team",
    date: "2025-01-10",
    readTime: "5 min read"
  },
  {
    id: 4,
    title: "Enterprise Adoption: RWA Tokenization Strategy",
    excerpt: "Our approach to compliant real-world asset tokenization targeting $1B in assets by 2028.",
    category: "Business",
    author: "Partnerships Team",
    date: "2025-01-08",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Developer Tools & SDK Overview",
    excerpt: "Comprehensive guide to Aurlink's developer ecosystem and $1M grants program.",
    category: "Development",
    author: "Developer Relations",
    date: "2025-01-05",
    readTime: "4 min read"
  }
]

const resources = [
  {
    title: "Whitepaper v1.3",
    description: "Complete technical documentation",
    icon: FileText,
    downloads: "2.4K",
    type: "PDF",
    size: "4.2 MB"
  },
  {
    title: "Technical Specifications",
    description: "Architecture and API docs",
    icon: BookOpen,
    downloads: "1.8K",
    type: "PDF",
    size: "3.1 MB"
  },
  {
    title: "Investment Deck",
    description: "Current investor presentation",
    icon: BarChart3,
    downloads: "1.2K",
    type: "PDF", 
    size: "2.8 MB"
  }
]

export default function BlogHomepage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
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
              <Link 
                href="/blog/editor" 
                className="bg-gradient-to-r from-purple-500 to-cyan-400 px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                New Post
              </Link>
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
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
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
                      {post.date}
                    </div>
                    <Link 
                      href={`/blog/posts/${post.id}`}
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
        </section>

        {/* Recent Posts & Resources Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8">Latest Updates</h2>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <article key={post.id} className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
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
                      {post.date}
                    </div>
                    <Link 
                      href={`/blog/posts/${post.id}`}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Resources */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Resources
              </h3>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <resource.icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-cyan-400 transition-colors">
                          {resource.title}
                        </p>
                        <p className="text-gray-400 text-sm">{resource.description}</p>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-lg">
                      <Download className="w-4 h-4 text-cyan-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {['Technology', 'Tokenomics', 'Business', 'Development', 'Research', 'Community'].map((category) => (
                  <Link
                    key={category}
                    href={`/blog/category/${category.toLowerCase()}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <span className="group-hover:text-cyan-400 transition-colors">{category}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

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

      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">Aurlink</span>
              </div>
              <p className="text-gray-400 text-sm">
                Building the future of AI-powered blockchain infrastructure.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Blog</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/blog/technology" className="block hover:text-cyan-400 transition-colors">Technology</Link>
                <Link href="/blog/tokenomics" className="block hover:text-cyan-400 transition-colors">Tokenomics</Link>
                <Link href="/blog/business" className="block hover:text-cyan-400 transition-colors">Business</Link>
                <Link href="/blog/resources" className="block hover:text-cyan-400 transition-colors">Resources</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/whitepaper" className="block hover:text-cyan-400 transition-colors">Whitepaper</Link>
                <Link href="/docs" className="block hover:text-cyan-400 transition-colors">Documentation</Link>
                <Link href="/api" className="block hover:text-cyan-400 transition-colors">API Reference</Link>
                <Link href="/github" className="block hover:text-cyan-400 transition-colors">GitHub</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/twitter" className="block hover:text-cyan-400 transition-colors">Twitter</Link>
                <Link href="/discord" className="block hover:text-cyan-400 transition-colors">Discord</Link>
                <Link href="/telegram" className="block hover:text-cyan-400 transition-colors">Telegram</Link>
                <Link href="/contact" className="block hover:text-cyan-400 transition-colors">Contact</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Aurlink Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}