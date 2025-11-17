import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export const query = (text: string, params?: any[]) => pool.query(text, params)

// Add the missing export that other files are looking for
export const savePaymentRecord = async (paymentData: any) => {
  try {
    const { userId, amount, currency, status, paymentMethod, transactionId } = paymentData
    
    const result = await query(
      `INSERT INTO payments (user_id, amount, currency, status, payment_method, transaction_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [userId, amount, currency, status, paymentMethod, transactionId]
    )
    
    return result.rows[0]
  } catch (error) {
    console.error('Error saving payment record:', error)
    throw error
  }
}

// Add other common database functions that might be needed
export const getUserById = async (userId: string) => {
  const result = await query('SELECT * FROM users WHERE id = $1', [userId])
  return result.rows[0]
}

export const updatePaymentStatus = async (transactionId: string, status: string) => {
  const result = await query(
    'UPDATE payments SET status = $1, updated_at = NOW() WHERE transaction_id = $2 RETURNING *',
    [status, transactionId]
  )
  return result.rows[0]
}

export default pool