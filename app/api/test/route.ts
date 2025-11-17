// src/app/api/test/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    const tasks = await prisma.aITask.findMany()
    const metrics = await prisma.networkMetrics.findFirst()
    const subscriptions = await prisma.subscription.findMany()
    
    return NextResponse.json({
      success: true,
      data: {
        users: users.length,
        tasks: tasks.length,
        subscriptions: subscriptions.length,
        hashrate: metrics?.hashrate,
        activeNodes: metrics?.activeNodes
      },
      message: 'Database is working correctly! 🎉'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}