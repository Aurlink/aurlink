// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server'

const searchPosts = async (query: string) => {
  // Simulate search logic - replace with your search service
  const allPosts = [
    {
      id: '1',
      title: "NeuraLink Consensus: Technical Deep Dive",
      excerpt: "Exploring the AI-powered consensus mechanism that achieves 90% fault prediction accuracy...",
      category: "Technology",
      author: "Protocol Team",
      date: "2025-01-15",
      readTime: "8 min read"
    },
    {
      id: '2', 
      title: "Aurlink Tokenomics: Complete Analysis",
      excerpt: "Detailed breakdown of $AUR distribution, utility, and economic model...",
      category: "Tokenomics", 
      author: "Economics Team",
      date: "2025-01-12",
      readTime: "6 min read"
    }
  ]

  const results = allPosts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    post.category.toLowerCase().includes(query.toLowerCase())
  )

  return results
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json([])
  }

  try {
    const results = await searchPosts(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json([])
  }
}