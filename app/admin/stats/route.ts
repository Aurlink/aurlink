// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Mock stats data
    const stats = {
      totalPosts: 15,
      publishedPosts: 12,
      totalUsers: 842,
      pageViews: 15423
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}