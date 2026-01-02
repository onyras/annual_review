export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
  const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          reactivate_existing: true,
          send_welcome_email: false,
          utm_source: 'annual-reflection-guide',
          utm_medium: 'website',
          tags: ['reflection-guide-download'],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Beehiiv API error:', data);
      return res.status(response.status).json({ error: data.message || 'Subscription failed' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
