import { NextRequest, NextResponse } from 'next/server'
import { query } from '../../../../lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    let whereClause = 'WHERE 1=1'
    const params: any[] = [limit, offset]

    if (category) {
      params.push(category)
      whereClause += ` AND category = $${params.length}`
    }

    if (featured === 'true') {
      whereClause += ` AND featured = true`
    }

    const postsResult = await query(
      `SELECT * FROM blog_posts 
       ${whereClause} 
       ORDER BY published_at DESC 
       LIMIT $1 OFFSET $2`,
      params
    )

    const totalResult = await query(
      `SELECT COUNT(*) FROM blog_posts ${whereClause}`,
      params.slice(2) // Remove limit and offset for count
    )

    return NextResponse.json({
      posts: postsResult.rows,
      total: parseInt(totalResult.rows[0].count),
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, slug, excerpt, content, category, author, featured, read_time } = await request.json()

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !category || !read_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await query(
      `INSERT INTO blog_posts 
       (title, slug, excerpt, content, category, author, featured, read_time) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [title, slug, excerpt, content, category, author || 'Aurlink Team', featured || false, read_time]
    )

    return NextResponse.json({ post: result.rows[0] }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating post:', error)
    if (error.code === '23505') { // Unique violation
      return NextResponse.json(
        { error: 'Post with this slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}