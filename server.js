import dotenv from 'dotenv';
dotenv.config({ path: './.env', override: true });
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import nodemailer from 'nodemailer';

// Validate Stripe Secret Key
if (!process.env.STRIPE_SECRET_KEY) {
    console.error('CRITICAL ERROR: STRIPE_SECRET_KEY is missing in environment variables!');
    console.error('Please add STRIPE_SECRET_KEY to your .env file or hosting platform environment variables.');
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

// Email configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3000'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Webhook requires raw body
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

const calculateOrderAmount = (items, shippingProtection) => {
    let productTotal = 0;
    let giftItem = null;

    if (items && Array.isArray(items)) {
        items.forEach(item => {
            if (item.id === 'free-gift-needle') {
                giftItem = item;
            } else {
                let price = 0;
                if (item.id === '1-month') price = 6900;
                else if (item.id === '3-month') price = 10900;
                else if (item.id === '6-month') price = 18900;
                else if (item.id === 'ebook-upsell') price = 2000;

                if (price > 0) {
                    productTotal += price * item.quantity;
                }
            }
        });
    }

    let total = productTotal;

    // Handle Gift: Free if subtotal >= $116 (11600 cents), else $15
    if (giftItem) {
        if (productTotal >= 11600) {
            total += 0;
        } else {
            total += 1500 * giftItem.quantity;
        }
    }

    if (total > 0 && total < 8000) {
        total += 695;
    }

    if (shippingProtection) {
        total += 297;
    }

    return total > 0 ? total : 1400;
};

// Send order confirmation email
const sendOrderConfirmation = async (email, orderDetails) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER || '"AlphaRevive" <noreply@alpharevive.com>',
            to: email,
            subject: `Order Confirmation - ${orderDetails.orderNumber}`,
            html: `
                <h1>Thank you for your order!</h1>
                <p>Order Number: <strong>${orderDetails.orderNumber}</strong></p>
                <p>Total: $${(orderDetails.amount / 100).toFixed(2)}</p>
                <p>We'll send you shipping updates soon.</p>
            `
        });
        console.log('Order confirmation email sent to:', email);
    } catch (error) {
        console.error('Email send error:', error);
    }
};

// Send ebook email to new subscribers
const sendEbookEmail = async (email) => {
    try {
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

// Contact form email
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    const escapeHtml = (text) => {
        if (!text) return text;
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER || '"AlphaRevive Contact" <noreply@alpharevive.com>',
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            replyTo: email,
            subject: `New Contact Form Submission from ${safeName}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Message:</strong></p>
                <p>${safeMessage}</p>
            `
        });

        res.send({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).send({ error: 'Failed to send message' });
    }
});

// Email subscription endpoint for Klaviyo
app.post('/api/subscribe', async (req, res) => {
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
        console.error('❌ Missing Klaviyo credentials:', {
            hasPrivateKey: !!process.env.KLAVIYO_PRIVATE_KEY,
            hasListId: !!process.env.KLAVIYO_LIST_ID
        });
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
        res.status(200).json({ success: true, message: 'Successfully subscribed!' });
    } catch (error) {
        console.error('❌ Subscription error:', error.message);
        console.error('Full error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/create-payment-intent', async (req, res) => {
    const { items, email, shippingProtection } = req.body;
    // SERVER-SIDE SECURITY: Always calculate amount on server, ignore client 'amount'
    const orderAmount = calculateOrderAmount(items, shippingProtection);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: orderAmount,
            currency: 'usd',
            // Enable all payment methods automatically
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'always'
            },
            // Add metadata for tracking
            metadata: {
                customer_email: email || 'guest@alpharevive.com',
                items: JSON.stringify(items?.map(i => ({ id: i.id, qty: i.quantity })) || [])
            }
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error('Payment intent error:', error);
        res.status(500).send({ error: error.message });
    }
});

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful!', paymentIntent.id);

            // Send order confirmation email
            const email = paymentIntent.metadata.customer_email;
            if (email && email !== 'guest@alpharevive.com') {
                await sendOrderConfirmation(email, {
                    orderNumber: `REV-${Math.floor(10000 + Math.random() * 90000)}`,
                    amount: paymentIntent.amount
                });
            }
            break;
        case 'payment_intent.payment_failed':
            console.log('Payment failed:', event.data.object.id);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
