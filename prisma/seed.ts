// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.transaction.deleteMany()
  await prisma.aITaskLog.deleteMany()
  await prisma.aITask.deleteMany()
  await prisma.networkMetrics.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.user.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verificationToken.deleteMany()

  console.log('✅ Cleared existing data')

  // Create test user
  const testUser = await prisma.user.create({
    data: {
      email: 'demo@aurlink.io',
      name: 'Demo User',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created test user')

  // Create subscription
  await prisma.subscription.create({
    data: {
      userId: testUser.id,
      plan: 'PROFESSIONAL',
      status: 'ACTIVE',
      renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  })

  console.log('✅ Created subscription')

  // Create sample AI tasks
  await prisma.aITask.createMany({
    data: [
      {
        name: 'Neural Network Training',
        type: 'TRAINING',
        status: 'RUNNING',
        progress: 75,
        userId: testUser.id,
        startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        name: 'Image Recognition Model',
        type: 'INFERENCE',
        status: 'COMPLETED',
        progress: 100,
        userId: testUser.id,
        startedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
      {
        name: 'Language Model Deployment',
        type: 'DEPLOYMENT',
        status: 'QUEUED',
        progress: 0,
        userId: testUser.id,
      },
    ],
  })

  console.log('✅ Created AI tasks')

  // Add logs for tasks
  const tasks = await prisma.aITask.findMany()
  for (const task of tasks) {
    await prisma.aITaskLog.create({
      data: {
        taskId: task.id,
        message: `Task ${task.name} ${task.status.toLowerCase()}`,
        level: 'INFO',
      },
    })
  }

  console.log('✅ Added task logs')

  // Create network metrics
  await prisma.networkMetrics.create({
    data: {
      hashrate: 2400000,
      activeNodes: 892,
      apiCalls: 45200,
    },
  })

  console.log('✅ Created network metrics')

  // Create sample transactions
  await prisma.transaction.createMany({
    data: [
      {
        type: 'AI_INFERENCE',
        amount: 0.45,
        status: 'COMPLETED',
        userId: testUser.id,
      },
      {
        type: 'MODEL_TRAINING',
        amount: 2.10,
        status: 'COMPLETED',
        userId: testUser.id,
      },
      {
        type: 'SUBSCRIPTION',
        amount: 99.00,
        status: 'COMPLETED',
        userId: testUser.id,
      },
    ],
  })

  console.log('✅ Created transactions')

  console.log('🎉 Database seeding completed successfully!')
  console.log('📧 Test user: demo@aurlink.io')
  console.log('📊 Sample data created:')
  console.log('   - 1 User')
  console.log('   - 1 Subscription')
  console.log('   - 3 AI Tasks')
  console.log('   - 3 Transactions')
  console.log('   - Network Metrics')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })