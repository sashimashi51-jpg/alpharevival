import dotenv from 'dotenv';
dotenv.config({ path: './.env', override: true });
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

// Validate Stripe Secret Key
if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('WARNING: STRIPE_SECRET_KEY is missing! Using test mode.');
    // Temporarily allow server to start without key for debugging
    // process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

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

// Root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'AlphaRevive API is running!' });
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

app.post('/create-payment-intent', async (req, res) => {
    const { items, email, shippingProtection } = req.body;
    // SERVER-SIDE SECURITY: Always calculate amount on server, ignore client 'amount'
    const orderAmount = calculateOrderAmount(items, shippingProtection);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: orderAmount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            // payment_method_types: ['card'], // Removed to enable PayPal/Google Pay via Dashboard
            metadata: {
                customer_email: email || 'guest@alpharevive.com',
                items: JSON.stringify(items?.map(i => ({ id: i.id, qty: i.quantity })) || [])
            },
            // Remove explicit payment_method_types to avoid 500 errors if methods aren't enabled in Stripe Dashboard
            // payment_method_types: [...] <--- Removed
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

const trackKlaviyoEvent = async (eventName, customerEmail, properties) => {
    if (!process.env.KLAVIYO_PRIVATE_KEY) return;

    try {
        const response = await fetch('https://a.klaviyo.com/api/events/', {
            method: 'POST',
            headers: {
                'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY.trim()}`,
                'accept': 'application/vnd.api+json',
                'content-type': 'application/vnd.api+json',
                'revision': '2024-10-15'
            },
            body: JSON.stringify({
                data: {
                    type: 'event',
                    attributes: {
                        properties: properties,
                        metric: {
                            data: {
                                type: 'metric',
                                attributes: { name: eventName }
                            }
                        },
                        profile: {
                            data: {
                                type: 'profile',
                                attributes: { email: customerEmail }
                            }
                        }
                    }
                }
            })
        });

        if (!response.ok) {
            const errBody = await response.text();
            console.error('Klaviyo event error:', errBody);
        } else {
            console.log(`✅ Klaviyo event "${eventName}" tracked for ${customerEmail}`);
        }
    } catch (error) {
        console.error('Klaviyo tracker exception:', error);
    }
};

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test');
    } catch (err) {
        console.log('Webhook signature verification failed:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('✅ PaymentIntent was successful!', paymentIntent.id);

            // Trigger Klaviyo Order Confirmation
            const email = paymentIntent.metadata?.customer_email;
            if (email && email !== 'guest@alpharevive.com') {
                await trackKlaviyoEvent('Placed Order', email, {
                    'order_id': paymentIntent.id,
                    'value': paymentIntent.amount / 100,
                    'currency': paymentIntent.currency.toUpperCase(),
                    'items': JSON.parse(paymentIntent.metadata?.items || '[]')
                });
            }
            break;
        case 'payment_intent.payment_failed':
            console.log('❌ Payment failed:', event.data.object.id);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
});

const PORT = process.env.PORT || 4242;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`🚀 AlphaRevive API running on ${HOST}:${PORT}!`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Stripe key present: ${process.env.STRIPE_SECRET_KEY ? 'YES' : 'NO'}`);
});
