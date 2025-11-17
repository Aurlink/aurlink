// app/blog/posts/[id]/page.tsx
import { notFound } from 'next/navigation'
import { Calendar, User, Clock, Share2, Download, FileText } from 'lucide-react'

// This would typically come from your database
const blogPosts = {
  '1': {
    id: 1,
    title: "NeuraLink Consensus: Technical Deep Dive",
    content: `Full blog post content here...`,
    excerpt: "Exploring the AI-powered consensus mechanism that achieves 90% fault prediction accuracy and 15% TPS gains.",
    category: "Technology",
    author: "Protocol Team",
    date: "2025-01-15",
    readTime: "8 min read",
    featuredImage: "/api/placeholder/800/400",
    attachments: [
      { name: "Technical_Specifications.pdf", size: "2.4 MB", url: "#" },
      { name: "Performance_Metrics.xlsx", size: "1.2 MB", url: "#" }
    ]
  }
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts[params.id as keyof typeof blogPosts]
  
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="text-center mb-12">
          <div className="inline-block bg-cyan-500/20 text-cyan-400 px-4 py-1 rounded-full text-sm font-medium mb-6">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">{post.excerpt}</p>
          
          <div className="flex items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-2xl mb-12 flex items-center justify-center">
          <div className="text-white/50 text-center">
            <div className="text-4xl mb-2">🖼️</div>
            <p>Featured Image</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            {post.content}
          </div>
        </div>

        {/* Attachments */}
        {post.attachments && post.attachments.length > 0 && (
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-12">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Download Resources
            </h3>
            <div className="space-y-3">
              {post.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-gray-400 text-sm">{file.size}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-xl transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Actions */}
        <div className="flex items-center justify-between py-6 border-t border-b border-white/10">
          <button className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
            <Share2 className="w-4 h-4" />
            Share Article
          </button>
          
          <div className="flex items-center gap-4">
            <button className="p-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
              💜
            </button>
            <button className="p-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
              🔄
            </button>
            <button className="p-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors">
              📑
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}