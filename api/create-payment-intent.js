import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
            }
        });
    }
    return total > 0 ? total : 1400; // Fallback to safe minimum
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('❌ STRIPE_SECRET_KEY is missing');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { items, email } = req.body;
        // SERVER-SIDE SECURITY: Always calculate amount on server, ignore client 'amount'
        const orderAmount = calculateOrderAmount(items);

        // Create PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: orderAmount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                customer_email: email || 'guest@alpharevive.com',
                items: JSON.stringify(items?.map(i => ({ id: i.id, qty: i.quantity })) || [])
            },
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error('❌ Payment intent error:', error);
        res.status(500).json({ error: error.message });
    }
}
