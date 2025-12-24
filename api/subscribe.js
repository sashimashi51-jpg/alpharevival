// Vercel Serverless Function for Klaviyo email subscription
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, source } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if Klaviyo credentials exist
    if (!process.env.KLAVIYO_PRIVATE_KEY || !process.env.KLAVIYO_LIST_ID) {
        console.error('Missing Klaviyo credentials');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
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
            console.error('Klaviyo Profile Creation Error:', JSON.stringify(errorData, null, 2));
            return res.status(500).json({ error: 'Failed to subscribe' });
        }

        const profileData = await response.json();
        const profileId = profileData.data.id;

        // Add to list
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
            console.error('Failed to add to list:', JSON.stringify(listError, null, 2));
        }

        return res.status(200).json({ success: true, message: 'Successfully subscribed!' });
    } catch (error) {
        console.error('Subscription error:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
