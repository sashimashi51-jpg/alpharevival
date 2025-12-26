// Vercel Serverless Function for Klaviyo email subscription
import nodemailer from 'nodemailer';

// Email configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

// Send ebook email to new subscribers
const sendEbookEmail = async (email) => {
    try {
        const transporter = createTransporter();
        await transporter.sendMail({
            from: process.env.SMTP_USER || '"AlphaRevive" <noreply@alpharevive.com>',
            to: email,
            subject: 'Your FREE CPR Protocol Guide is Here! 📚',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
                        .header h1 { margin: 0; font-size: 28px; }
                        .content { background: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb; }
                        .cta-button { display: inline-block; background: #16a34a; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                        .cta-button:hover { background: #15803d; }
                        .benefits { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
                        .benefits li { margin: 10px 0; }
                        .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎉 Welcome to the CPR Protocol!</h1>
                        </div>
                        <div class="content">
                            <h2>Your Guide to Drug-Free Hair Recovery</h2>
                            <p>Hi there,</p>
                            <p>Thank you for downloading the <strong>CPR Protocol Guide</strong>! You've just taken the first step toward understanding how to flip the switch on dormant hair follicles—without drugs.</p>
                            
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://alpharevive.com/resources/cpr-protocol-guide.pdf" class="cta-button">
                                    📥 Download Your Free Guide
                                </a>
                            </div>

                            <div class="benefits">
                                <h3>📖 Inside This Guide, You'll Discover:</h3>
                                <ul>
                                    <li>✓ The 3-phase activation system backed by science</li>
                                    <li>✓ Why drug-free methods work better long-term</li>
                                    <li>✓ The exact timeline for visible results</li>
                                    <li>✓ Common mistakes that sabotage regrowth</li>
                                    <li>✓ How to maintain results for life</li>
                                </ul>
                            </div>

                            <h3>🚀 Next Steps:</h3>
                            <ol>
                                <li>Download and read the guide (it takes about 15 minutes)</li>
                                <li>Identify which phase you're currently in</li>
                                <li>Follow the recommended protocol for your situation</li>
                            </ol>

                            <p style="margin-top: 30px;"><strong>Have questions?</strong> Reply to this email—we read every message.</p>
                            
                            <p>To your hair health,<br>
                            <strong>The AlphaRevive Team</strong></p>
                        </div>
                        <div class="footer">
                            <p>AlphaRevive - Clinical-Grade Hair Recovery Solutions</p>
                            <p>You're receiving this because you requested the CPR Protocol Guide.</p>
                            <p><a href="#" style="color: #16a34a;">Unsubscribe</a> | <a href="https://alpharevive.com" style="color: #16a34a;">Visit Our Website</a></p>
                        </div>
                    </div>
                </body>
                </html>
            `
        });
        console.log('✅ Ebook email sent to:', email);
        return true;
    } catch (error) {
        console.error('❌ Ebook email send error:', error);
        // Don't throw - we still want to return success to user even if email fails
        return false;
    }
};

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, source } = req.body;
    console.log('📧 Subscription request received:', { email, source });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        console.log('❌ Invalid email format');
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if Klaviyo credentials exist
    if (!process.env.KLAVIYO_PRIVATE_KEY || !process.env.KLAVIYO_LIST_ID) {
        console.error('❌ Missing Klaviyo credentials');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        console.log('🔄 Creating profile in Klaviyo...');
        // Create profile in Klaviyo
        const response = await fetch('https://a.klaviyo.com/api/profiles/', {
            method: 'POST',
            headers: {
                'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`,
                'Content-Type': 'application/json',
                'revision': '2024-07-15'
            },
            body: JSON.stringify({
                data: {
                    type: 'profile',
                    attributes: {
                        email: email,
                        properties: {
                            source: source || 'ebook_inline'
                        }
                    }
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Klaviyo Profile Creation Error:', JSON.stringify(errorData, null, 2));
            return res.status(500).json({ error: 'Failed to subscribe' });
        }

        const profileData = await response.json();
        const profileId = profileData.data.id;
        console.log('✅ Profile created:', profileId);

        // Add to list
        console.log('🔄 Adding to list:', process.env.KLAVIYO_LIST_ID);
        const listResponse = await fetch(
            `https://a.klaviyo.com/api/lists/${process.env.KLAVIYO_LIST_ID}/relationships/profiles/`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`,
                    'Content-Type': 'application/json',
                    'revision': '2024-07-15'
                },
                body: JSON.stringify({
                    data: [{ type: 'profile', id: profileId }]
                })
            }
        );

        if (!listResponse.ok) {
            const listError = await listResponse.json();
            console.error('❌ Failed to add to list:', JSON.stringify(listError, null, 2));
        } else {
            console.log('✅ Added to list successfully');
        }

        // Send ebook email to subscriber
        console.log('📧 Sending ebook email...');
        await sendEbookEmail(email);

        console.log('✅ Subscription complete!');
        return res.status(200).json({ success: true, message: 'Successfully subscribed!' });
    } catch (error) {
        console.error('❌ Subscription error:', error.message);
        console.error('Full error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
