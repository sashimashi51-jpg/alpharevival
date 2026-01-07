import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { payment_intent } = req.query;

    if (!payment_intent) {
        return res.status(400).json({ error: 'Missing payment_intent parameter' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('❌ STRIPE_SECRET_KEY is missing');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        // Retrieve payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

        res.status(200).json({
            id: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status
        });
    } catch (error) {
        console.error('❌ Get payment intent error:', error);
        res.status(500).json({ error: error.message });
    }
}
