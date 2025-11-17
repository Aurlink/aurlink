// app/api/forum/threads/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with actual database query
  const threads = [
    {
      id: 1,
      title: "Getting started with Aurion language",
      author: { name: "DevExpert", avatar: "/avatars/1.png" },
      category: "Smart Contracts",
      replies: 124,
      views: 2400,
      activity: "2 hours ago",
      solved: true,
      pinned: true
    },
    // ... more threads
  ];

  return NextResponse.json(threads);
}