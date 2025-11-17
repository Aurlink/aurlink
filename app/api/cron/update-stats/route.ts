// src/app/api/cron/update-stats/route.ts
import { NextResponse } from 'next/server'
import { query } from '@/lib/database'
import { ethers } from 'ethers'

export async function POST(request: Request) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

    // Get total participants
    const totalParticipants = await query('SELECT COUNT(*) as count FROM vesting_participants')
    
    // Calculate total allocated (sum of all allocations)
    const totalAllocatedResult = await query('SELECT SUM(total_allocated) as total FROM vesting_participants')
    
    // Calculate total claimed (sum of all claimed amounts)
    const totalClaimedResult = await query('SELECT SUM(claimed_amount) as total FROM vesting_participants')
    
    // Calculate average allocation
    const avgAllocationResult = await query('SELECT AVG(total_allocated) as avg FROM vesting_participants')

    // Calculate total unlocked (this would need more complex logic based on time)
    const now = Math.floor(Date.now() / 1000)
    const unlockedResult = await query(`
      SELECT SUM(
        CASE 
          WHEN $1 < cliff_end THEN 0
          WHEN $1 >= vesting_end THEN total_allocated - claimed_amount
          ELSE (total_allocated - claimed_amount) * 
               ($1 - cliff_end) / (vesting_end - cliff_end)
        END
      ) as total_unlocked
      FROM vesting_participants
    `, [now])

    // Update stats table
    await query(`
      INSERT INTO vesting_stats (
        total_allocated, total_unlocked, total_claimed, 
        total_participants, average_allocation
      ) VALUES ($1, $2, $3, $4, $5)
    `, [
      parseFloat(totalAllocatedResult[0].total || 0),
      parseFloat(unlockedResult[0].total_unlocked || 0),
      parseFloat(totalClaimedResult[0].total || 0),
      parseInt(totalParticipants[0].count),
      parseFloat(avgAllocationResult[0].avg || 0)
    ])

    return NextResponse.json({ 
      success: true, 
      message: 'Stats updated successfully' 
    })

  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      { success: false, error: 'Cron job failed' },
      { status: 500 }
    )
  }
}