import { pool, getFallbackStorage } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Use database if available, otherwise fallback to in-memory storage
let storage;

const initializeStorage = async () => {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    storage = {
      async addSubscriber(email, referralCode = '') {
        const client = await pool.connect();
        try {
          // Get current count for position
          const countResult = await client.query('SELECT COUNT(*) FROM waitlist_subscribers');
          const position = parseInt(countResult.rows[0].count) + 1;

          const result = await client.query(
            `INSERT INTO waitlist_subscribers 
             (email, referral_code, position, confirmation_token) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [email, referralCode, position, uuidv4()]
          );
          
          return result.rows[0];
        } finally {
          client.release();
        }
      },

      async getSubscriber(email) {
        const client = await pool.connect();
        try {
          const result = await client.query(
            'SELECT * FROM waitlist_subscribers WHERE email = $1',
            [email]
          );
          return result.rows[0];
        } finally {
          client.release();
        }
      },

      async getWaitlistStats() {
        const client = await pool.connect();
        try {
          const countResult = await client.query('SELECT COUNT(*) FROM waitlist_subscribers');
          const recentResult = await client.query(
            'SELECT COUNT(*) FROM waitlist_subscribers WHERE created_at >= NOW() - INTERVAL \'7 days\''
          );
          
          return {
            total: parseInt(countResult.rows[0].count),
            last7Days: parseInt(recentResult.rows[0].count)
          };
        } finally {
          client.release();
        }
      },

      async getAllSubscribers() {
        const client = await pool.connect();
        try {
          const result = await client.query(
            'SELECT email, position, created_at FROM waitlist_subscribers ORDER BY position'
          );
          return result.rows;
        } finally {
          client.release();
        }
      }
    };
    
    console.log('✅ Using PostgreSQL database for storage');
  } catch (error) {
    console.log('⚠️  Database not available, using in-memory storage');
    storage = getFallbackStorage();
  }
};

// Initialize storage on startup
initializeStorage();

export const addToWaitlist = async (email, referralCode = '') => {
  if (!storage) await initializeStorage();
  return await storage.addSubscriber(email, referralCode);
};

export const getSubscriber = async (email) => {
  if (!storage) await initializeStorage();
  return await storage.getSubscriber(email);
};

export const getWaitlistStats = async () => {
  if (!storage) await initializeStorage();
  return await storage.getWaitlistStats();
};

export const getAllSubscribers = async () => {
  if (!storage) await initializeStorage();
  return await storage.getAllSubscribers();
};