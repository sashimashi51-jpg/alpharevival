import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items, shippingProtection) => {
    let productTotal = 0;
    let giftItem = null;

    if (items && Array.isArray(items)) {
        items.forEach(item => {
            if (item.id === 'free-gift-needle') {
                giftItem = item;
            } else {
                let price = 0;
                // Match the actual product IDs from ProductPage.jsx
                if (item.id === '1-month') price = 5499; // $54.99
                else if (item.id === '2-month') price = 7999; // $79.99
                else if (item.id === '4-month') price = 12999; // $129.99
                else if (item.id === 'ebook-upsell') price = 2000; // $20.00
                // Fallback: use item.price from cart if ID not recognized
                else if (item.price) {
                    price = Math.round(item.price * 100); // Convert dollars to cents
                }

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

    // Shipping Logic: Free if total >= $75 (7500 cents)
    if (total > 0 && total < 7500) {
        total += 695;
    }

    // Shipping Protection Logic
    if (shippingProtection) {
        total += 297;
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
        const { items, email, shippingProtection } = req.body;
        // SERVER-SIDE SECURITY: Always calculate amount on server, ignore client 'amount'
        const orderAmount = calculateOrderAmount(items, shippingProtection);

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
