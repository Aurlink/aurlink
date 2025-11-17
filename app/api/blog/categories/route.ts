import { NextResponse } from 'next/server'
import { query } from '../../../../lib/db'

export async function GET() {
  try {
    const result = await query(`
      SELECT c.*, COUNT(p.id) as post_count
      FROM blog_categories c
      LEFT JOIN blog_posts p ON c.name = p.category
      GROUP BY c.id, c.name, c.slug, c.description, c.created_at
      ORDER BY c.name
    `)

    return NextResponse.json({ categories: result.rows })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}