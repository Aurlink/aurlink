// lib/database.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result.rows
  } finally {
    client.release()
  }
}

export async function transaction(queries: { text: string; params?: any[] }[]) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    
    const results = []
    for (const { text, params } of queries) {
      const result = await client.query(text, params)
      results.push(result.rows)
    }
    
    await client.query('COMMIT')
    return results
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}