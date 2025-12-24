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

app.use(cors());

// Webhook requires raw body
app.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

const calculateOrderAmount = (items) => {
    let total = 0;
    if (items && Array.isArray(items)) {
        items.forEach(item => {
            let price = 0;
            if (item.id === '1-month') price = 6900;
            else if (item.id === '3-month') price = 10900;
            else if (item.id === '6-month') price = 18900;
            else if (item.title === 'Priority Shipping Protection') price = 297;

            if (price > 0) {
                total += price * item.quantity;
            } else if (item.price) {
                total += Math.round(item.price * 100) * item.quantity;
            }
        });
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

// Contact form email
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER || '"AlphaRevive Contact" <noreply@alpharevive.com>',
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
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

        console.log('✅ Subscription complete!');
        res.status(200).json({ success: true, message: 'Successfully subscribed!' });
    } catch (error) {
        console.error('❌ Subscription error:', error.message);
        console.error('Full error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/create-payment-intent', async (req, res) => {
    const { items, amount, email } = req.body;
    const orderAmount = amount ? Math.round(amount * 100) : calculateOrderAmount(items);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: orderAmount,
            currency: 'usd',
            // Enable all payment methods
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'always'
            },
            // Add metadata for tracking
            metadata: {
                customer_email: email || 'guest@alpharevive.com',
                items: JSON.stringify(items?.map(i => ({ id: i.id, qty: i.quantity })) || [])
            },
            // Enable specific payment methods
            payment_method_types: [
                'card',
                'klarna',
                'afterpay_clearpay',
                'paypal',
                'us_bank_account'
            ],
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
