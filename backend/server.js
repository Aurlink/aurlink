import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
const waitlist = new Map();
let subscriberCount = 0;

// Simple email validation
const isValidEmail = (email) => {
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    subscribers: subscriberCount,
    message: 'AURLINK Backend is running!'
  });
});

// GET endpoint for testing
app.get('/api/subscribe', (req, res) => {
  res.json({
    message: 'AURLINK Waitlist API is working! 🚀',
    instructions: 'Use POST to subscribe to the waitlist',
    example: {
      method: 'POST',
      url: '/api/subscribe',
      body: {
        email: 'your-email@example.com',
        referralCode: 'optional-code'
      }
    },
    currentStats: {
      totalSubscribers: subscriberCount
    }
  });
});

// POST endpoint for subscriptions
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, referralCode = '' } = req.body;

    console.log('📥 Subscription attempt:', email);

    // Validate email
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Check if already subscribed
    if (waitlist.has(email)) {
      const existing = waitlist.get(email);
      return res.status(409).json({
        success: false,
        error: 'This email is already on our waitlist!',
        position: existing.position
      });
    }

    // Add to waitlist
    subscriberCount++;
    const subscriber = {
      id: subscriberCount,
      email,
      referralCode,
      position: subscriberCount,
      createdAt: new Date().toISOString(),
      confirmed: true
    };

    waitlist.set(email, subscriber);

    console.log('✅ Added to waitlist:', email, 'Position:', subscriber.position);

    // Success response
    res.json({
      success: true,
      message: 'Successfully joined the waitlist! 🎉',
      position: subscriber.position,
      totalSubscribers: subscriberCount
    });

  } catch (error) {
    console.error('❌ Subscription error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to join waitlist. Please try again.'
    });
  }
});

// Get waitlist stats
app.get('/api/waitlist/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      total: subscriberCount,
      last7Days: subscriberCount,
      timestamp: new Date().toISOString()
    }
  });
});

// Export waitlist data
app.get('/api/waitlist/export', (req, res) => {
  const subscribers = Array.from(waitlist.values());
  res.json({
    success: true,
    data: subscribers,
    count: subscribers.length,
    exportedAt: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET  /health',
      'GET  /api/subscribe',
      'POST /api/subscribe',
      'GET  /api/waitlist/stats',
      'GET  /api/waitlist/export'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AURLINK Backend running on port ${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
  console.log(`✅ API test: http://localhost:${PORT}/api/subscribe`);
  console.log(`✅ Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   GET  http://localhost:${PORT}/api/subscribe`);
  console.log(`   POST http://localhost:${PORT}/api/subscribe`);
  console.log(`   GET  http://localhost:${PORT}/api/waitlist/stats`);
});