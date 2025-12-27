import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper to manually read buffer because Vercel/Next auto-parses body
// but Webhooks need raw body for signature verification.
export const config = {
    api: {
        bodyParser: false,
    },
};

const getRawBody = async (req) => {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    return Buffer.concat(buffers);
};

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

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).send('Method Not Allowed');
    }

    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('❌ STRIPE_WEBHOOK_SECRET is missing');
        return res.status(500).send('Webhook Secret Missing');
    }

    let event;

    try {
        const rawBody = await getRawBody(req);
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err) {
        console.log(`❌ Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
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
    } catch (err) {
        console.error("Webhook processing error:", err);
        return res.status(500).send("Processing Error");
    }

    res.status(200).send({ received: true });
}
