import nodemailer from 'nodemailer';

// Premium email templates
export const EmailTemplates = {
  WELCOME: 'welcome',
  ANNOUNCEMENT: 'announcement',
  UPDATE: 'update',
  EXCLUSIVE: 'exclusive',
  LAUNCH: 'launch'
};

export const sendPremiumEmail = async (email, templateType, data = {}) => {
  try {
    const { subject, html } = generatePremiumTemplate(templateType, data);
    
    // Try Resend first
    if (process.env.RESEND_API_KEY) {
      await sendViaResend(email, subject, html);
      return;
    }
    
    // Try SendGrid
    if (process.env.SENDGRID_API_KEY) {
      await sendViaSendGrid(email, subject, html);
      return;
    }
    
    // Try SMTP
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendViaSMTP(email, subject, html);
      return;
    }
    
    console.log('📧 Email content (no service configured):', { subject, to: email });
    
  } catch (error) {
    console.error('❌ Premium email failed:', error.message);
    throw new Error('Email service temporarily unavailable');
  }
};

const generatePremiumTemplate = (templateType, data) => {
  const templates = {
    [EmailTemplates.WELCOME]: generateWelcomeTemplate(data),
    [EmailTemplates.ANNOUNCEMENT]: generateAnnouncementTemplate(data),
    [EmailTemplates.UPDATE]: generateUpdateTemplate(data),
    [EmailTemplates.EXCLUSIVE]: generateExclusiveTemplate(data),
    [EmailTemplates.LAUNCH]: generateLaunchTemplate(data)
  };

  return templates[templateType] || templates[EmailTemplates.WELCOME];
};

// ==================== PREMIUM TEMPLATES ====================

const generateWelcomeTemplate = ({ position, customMessage, userName = 'Innovator' }) => ({
  subject: `🚀 Welcome to AURLINK - You're Position #${position}!`,
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AURLINK</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background: linear-gradient(135deg, #0A0F2C 0%, #1A2A4D 100%);">
    
    <!-- Main Container -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0A0F2C 0%, #1A2A4D 100%); min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <!-- Email Card -->
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #00F5FF 0%, #764ba2 100%); padding: 50px 40px; text-align: center;">
                            <table width="100%">
                                <tr>
                                    <td style="text-align: center;">
                                        <div style="background: rgba(255,255,255,0.2); border-radius: 20px; padding: 12px 24px; display: inline-block; margin-bottom: 20px;">
                                            <span style="color: white; font-size: 14px; font-weight: 600; letter-spacing: 1px;">PREMIUM ACCESS</span>
                                        </div>
                                        <h1 style="color: white; font-size: 42px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.1;">Welcome to<br>AURLINK</h1>
                                        <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 0; font-weight: 400;">The Future of AI-Powered Blockchain</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Position Badge -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <table width="100%" style="margin-top: -30px;">
                                <tr>
                                    <td align="center">
                                        <div style="background: linear-gradient(135deg, #FF6B6B 0%, #FFA726 100%); color: white; padding: 20px 40px; border-radius: 16px; display: inline-block; box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);">
                                            <div style="font-size: 14px; font-weight: 600; opacity: 0.9; margin-bottom: 5px;">YOUR POSITION</div>
                                            <div style="font-size: 48px; font-weight: 700; line-height: 1;">#${position}</div>
                                            <div style="font-size: 14px; font-weight: 500; opacity: 0.9;">in the Waitlist</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            
                            <!-- Welcome Message -->
                            <table width="100%">
                                <tr>
                                    <td style="padding-bottom: 30px;">
                                        <h2 style="color: #1A2A4D; font-size: 28px; font-weight: 600; margin: 0 0 15px 0;">Hello ${userName},</h2>
                                        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0;">
                                            Welcome to the forefront of blockchain innovation! You've joined an exclusive community 
                                            of visionaries shaping the future of decentralized AI infrastructure.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            ${customMessage ? `
                            <!-- Custom Message -->
                            <table width="100%" style="background: linear-gradient(135deg, #00F5FF10 0%, #764ba210 100%); border-radius: 16px; padding: 30px; margin: 30px 0; border-left: 4px solid #00F5FF;">
                                <tr>
                                    <td>
                                        <h3 style="color: #1A2A4D; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">🎯 Special Message from the Team</h3>
                                        <p style="color: #666; font-size: 15px; line-height: 1.6; margin: 0;">
                                            ${customMessage}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}

                            <!-- Benefits Grid -->
                            <table width="100%" style="margin: 40px 0;">
                                <tr>
                                    <td>
                                        <h3 style="color: #1A2A4D; font-size: 22px; font-weight: 600; margin: 0 0 25px 0; text-align: center;">Your Exclusive Benefits</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="50%" style="padding: 0 10px 20px 0;">
                                                    <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; text-align: center; height: 100%;">
                                                        <div style="font-size: 32px; margin-bottom: 10px;">🚀</div>
                                                        <h4 style="color: #1A2A4D; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Early Platform Access</h4>
                                                        <p style="color: #666; font-size: 13px; line-height: 1.4; margin: 0;">Be among the first to experience our revolutionary AVM technology</p>
                                                    </div>
                                                </td>
                                                <td width="50%" style="padding: 0 0 20px 10px;">
                                                    <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; text-align: center; height: 100%;">
                                                        <div style="font-size: 32px; margin-bottom: 10px;">💎</div>
                                                        <h4 style="color: #1A2A4D; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Founding Member Perks</h4>
                                                        <p style="color: #666; font-size: 13px; line-height: 1.4; margin: 0;">Special rewards, incentives, and recognition as an early supporter</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="50%" style="padding: 0 10px 0 0;">
                                                    <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; text-align: center; height: 100%;">
                                                        <div style="font-size: 32px; margin-bottom: 10px;">🤝</div>
                                                        <h4 style="color: #1A2A4D; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">VIP Community Access</h4>
                                                        <p style="color: #666; font-size: 13px; line-height: 1.4; margin: 0;">Connect with industry leaders and like-minded innovators</p>
                                                    </div>
                                                </td>
                                                <td width="50%" style="padding: 0 0 0 10px;">
                                                    <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; text-align: center; height: 100%;">
                                                        <div style="font-size: 32px; margin-bottom: 10px;">🎯</div>
                                                        <h4 style="color: #1A2A4D; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Influence Development</h4>
                                                        <p style="color: #666; font-size: 13px; line-height: 1.4; margin: 0;">Your feedback directly shapes our platform's evolution</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Next Steps -->
                            <table width="100%" style="background: linear-gradient(135deg, #00F5FF 0%, #764ba2 100%); border-radius: 16px; padding: 30px; color: white;">
                                <tr>
                                    <td>
                                        <h3 style="color: white; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">What's Next?</h3>
                                        <p style="color: rgba(255,255,255,0.9); font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
                                            We'll notify you via email as we approach our launch. In the meantime, join our community 
                                            channels to stay connected and get exclusive insights.
                                        </p>
                                        <table cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding-right: 15px;">
                                                    <a href="https://t.me/aurlinkupdates" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; display: inline-block; border: 1px solid rgba(255,255,255,0.3);">Join Telegram</a>
                                                </td>
                                                <td>
                                                    <a href="https://twitter.com/aurlink" style="background: white; color: #1A2A4D; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; display: inline-block;">Follow on Twitter</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Footer -->
                            <table width="100%" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="color: #999; font-size: 14px; margin: 0 0 10px 0;">
                                            You're receiving this email because you joined the AURLINK waitlist.
                                        </p>
                                        <p style="color: #999; font-size: 12px; margin: 0;">
                                            AURLINK Technologies • Building the Future of AI Blockchain<br>
                                            <a href="#" style="color: #00F5FF; text-decoration: none;">Unsubscribe</a> • 
                                            <a href="#" style="color: #00F5FF; text-decoration: none;">Privacy Policy</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>

                <!-- Signature -->
                <table width="100%" max-width="600" style="margin-top: 30px;">
                    <tr>
                        <td style="text-align: center;">
                            <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin: 0;">
                                Sent with 💙 by the AURLINK Team
                            </p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>
  `
});

const generateAnnouncementTemplate = ({ subject, message, ctaLink, ctaText }) => ({
  subject: `🎯 AURLINK Announcement: ${subject}`,
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AURLINK Announcement</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background: linear-gradient(135deg, #0A0F2C 0%, #1A2A4D 100%);">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #0A0F2C 0%, #1A2A4D 100%); min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #FF6B6B 0%, #FFA726 100%); padding: 50px 40px; text-align: center;">
                            <table width="100%">
                                <tr>
                                    <td style="text-align: center;">
                                        <div style="background: rgba(255,255,255,0.2); border-radius: 20px; padding: 12px 24px; display: inline-block; margin-bottom: 20px;">
                                            <span style="color: white; font-size: 14px; font-weight: 600; letter-spacing: 1px;">EXCLUSIVE UPDATE</span>
                                        </div>
                                        <h1 style="color: white; font-size: 36px; font-weight: 700; margin: 0 0 10px 0;">${subject}</h1>
                                        <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 0; font-weight: 400;">AURLINK Community Announcement</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            
                            <!-- Message -->
                            <table width="100%">
                                <tr>
                                    <td style="padding-bottom: 30px;">
                                        <p style="color: #666; font-size: 16px; line-height: 1.7; margin: 0;">
                                            ${message.replace(/\n/g, '<br>')}
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            ${ctaLink && ctaText ? `
                            <!-- CTA Button -->
                            <table width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${ctaLink}" style="background: linear-gradient(135deg, #00F5FF 0%, #764ba2 100%); color: white; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 8px 25px rgba(0, 245, 255, 0.3);">
                                            ${ctaText}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}

                            <!-- Footer -->
                            <table width="100%" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #eee;">
                                <tr>
                                    <td style="text-align: center;">
                                        <p style="color: #999; font-size: 14px; margin: 0;">
                                            Thank you for being part of the AURLINK revolution.<br>
                                            Together, we're building the future of blockchain.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>
  `
});

// Add more premium templates as needed...

// Email sending functions (same as before)
const sendViaResend = async (email, subject, html) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'AURLINK <onboarding@aurlink.xyz>',
      to: [email],
      subject: subject,
      html: html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend error: ${error}`);
  }
};

const sendViaSendGrid = async (email, subject, html) => {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email }] }],
      from: { email: 'onboarding@aurlink.xyz', name: 'AURLINK' },
      subject: subject,
      content: [{ type: 'text/html', value: html }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`SendGrid error: ${error}`);
  }
};

const sendViaSMTP = async (email, subject, html) => {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"AURLINK" <${process.env.SMTP_USER}>`,
    to: email,
    subject: subject,
    html: html,
  });
};