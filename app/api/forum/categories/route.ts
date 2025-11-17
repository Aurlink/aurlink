// app/api/forum/categories/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with actual database query
  const categories = [
    {
      id: 1,
      name: "Technical Discussions",
      description: "Deep technical conversations and problem solving",
      threadCount: 12457,
      postCount: 89234
    },
    // ... more categories
  ];

  return NextResponse.json(categories);
}