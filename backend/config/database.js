// db/config.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'aurlink_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'aurlink_waitlist',
  password: process.env.DB_PASSWORD || 'secure_password',
  port: process.env.DB_PORT || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Database queries
const dbQueries = {
  // Check if email exists
  findSubscriberByEmail: `SELECT id, email, confirmed FROM waitlist_subscribers WHERE email = $1`,
  
  // Create new subscriber
  createSubscriber: `
    INSERT INTO waitlist_subscribers 
    (email, referral_code, position, confirmation_token, source, metadata) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id, email, position, confirmation_token
  `,
  
  // Get total confirmed subscribers count
  getTotalSubscribers: `SELECT COUNT(*) as count FROM waitlist_subscribers WHERE confirmed = true`,
  
  // Get subscriber position
  getSubscriberPosition: `SELECT position FROM waitlist_subscribers WHERE email = $1 AND confirmed = true`,
  
  // Confirm subscription
  confirmSubscription: `UPDATE waitlist_subscribers SET confirmed = true WHERE confirmation_token = $1 RETURNING *`,
  
  // Update referral count
  incrementReferralCount: `UPDATE waitlist_subscribers SET referral_count = referral_count + 1 WHERE id = $1`,
  
  // Create referral relationship
  createReferral: `INSERT INTO referral_relationships (referrer_id, referred_id) VALUES ($1, $2)`,
  
  // Find subscriber by referral code
  findSubscriberByReferralCode: `SELECT id, email, referral_count FROM waitlist_subscribers WHERE referral_code = $1`,
  
  // Get all subscribers (for admin)
  getAllSubscribers: `SELECT email, position, referral_count, subscribed_at FROM waitlist_subscribers WHERE confirmed = true ORDER BY position`,
};

module.exports = { pool, dbQueries };