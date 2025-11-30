// In routes/subscription.js - update the POST /subscribe handler
router.post('/subscribe', async (req, res) => {
  try {
    const { email, referralCode = '', customMessage = null } = req.body;

    console.log('📥 Subscription attempt:', { email, referralCode });

    // Validate email
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }

    // Check if already subscribed
    const existingSubscriber = await getSubscriber(email);
    if (existingSubscriber) {
      return res.status(409).json({
        error: 'This email is already on our waitlist!',
        position: existingSubscriber.position
      });
    }

    // Add to waitlist
    const subscriber = await addToWaitlist(email, referralCode);
    
    console.log('✅ Added to waitlist:', email, 'Position:', subscriber.position);

    // Send confirmation email with optional custom message
    try {
      await sendConfirmationEmail(email, subscriber.position, customMessage);
      console.log('✅ Confirmation email sent to:', email);
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
      // Don't fail the request if email fails
    }

    res.json({
      success: true,
      message: 'Successfully joined the waitlist! 🎉',
      position: subscriber.position,
      totalSubscribers: await getWaitlistStats(),
      emailSent: true
    });

  } catch (error) {
    console.error('❌ Subscription error:', error.message);
    
    if (error.message.includes('already subscribed') || error.message.includes('duplicate key')) {
      return res.status(409).json({
        error: 'This email is already on our waitlist!'
      });
    }

    res.status(500).json({
      error: 'Failed to join waitlist. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

import { sendPremiumEmail, EmailTemplates } from '../services/premiumEmailService.js';

// Update the POST /subscribe route
router.post('/subscribe', async (req, res) => {
  try {
    const { email, referralCode = '', userName = 'Innovator', customMessage = null } = req.body;

    console.log('📥 Premium subscription attempt:', { email, userName });

    // Validate email
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }

    // Check if already subscribed
    const existingSubscriber = await getSubscriber(email);
    if (existingSubscriber) {
      return res.status(409).json({
        error: 'This email is already on our waitlist!',
        position: existingSubscriber.position
      });
    }

    // Add to waitlist
    const subscriber = await addToWaitlist(email, referralCode);
    
    console.log('✅ Added to premium waitlist:', email, 'Position:', subscriber.position);

    // Send premium welcome email
    try {
      await sendPremiumEmail(email, EmailTemplates.WELCOME, {
        position: subscriber.position,
        customMessage: customMessage,
        userName: userName
      });
      console.log('✅ Premium welcome email sent to:', email);
    } catch (emailError) {
      console.error('❌ Premium email failed:', emailError.message);
      // Don't fail the request if email fails
    }

    res.json({
      success: true,
      message: 'Successfully joined the exclusive waitlist! 🎉',
      position: subscriber.position,
      totalSubscribers: await getWaitlistStats(),
      emailSent: true
    });

  } catch (error) {
    console.error('❌ Premium subscription error:', error.message);
    
    if (error.message.includes('already subscribed') || error.message.includes('duplicate key')) {
      return res.status(409).json({
        error: 'This email is already on our waitlist!'
      });
    }

    res.status(500).json({
      error: 'Failed to join waitlist. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Premium broadcast route
router.post('/admin/broadcast-premium', async (req, res) => {
  try {
    // Authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { templateType, subject, message, ctaLink, ctaText } = req.body;

    if (!templateType || !subject || !message) {
      return res.status(400).json({ 
        error: 'Template type, subject, and message are required',
        availableTemplates: Object.values(EmailTemplates)
      });
    }

    const subscribers = await getAllSubscribers();
    let sentCount = 0;
    let failedCount = 0;
    const failedEmails = [];

    // Send to each subscriber
    for (const subscriber of subscribers) {
      try {
        await sendPremiumEmail(subscriber.email, templateType, {
          subject: subject,
          message: message,
          ctaLink: ctaLink,
          ctaText: ctaText,
          userName: subscriber.userName || 'Innovator'
        });
        sentCount++;
        console.log(`✅ Premium email sent to: ${subscriber.email}`);
      } catch (error) {
        failedCount++;
        failedEmails.push(subscriber.email);
        console.error(`❌ Failed to send to: ${subscriber.email}`, error.message);
      }
    }

    res.json({
      success: true,
      message: `Premium broadcast completed!`,
      stats: {
        total: subscribers.length,
        sent: sentCount,
        failed: failedCount,
        failedEmails: failedEmails
      },
      templateUsed: templateType
    });

  } catch (error) {
    console.error('❌ Premium broadcast error:', error);
    res.status(500).json({ error: 'Failed to send premium broadcast' });
  }
});