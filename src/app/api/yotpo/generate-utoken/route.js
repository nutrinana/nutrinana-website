export async function POST(req) {
  const storeId = process.env.YOTPO_STORE_ID;
  const secret = process.env.YOTPO_API_SECRET;

  if (!storeId || !secret) {
    return new Response(JSON.stringify({ message: 'Yotpo credentials not configured' }), {
      status: 500,
    });
  }

  try {
    const yotpoRes = await fetch(`https://api.yotpo.com/core/v3/stores/${storeId}/access_tokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret }),
    });

    if (!yotpoRes.ok) {
      const error = await yotpoRes.json();
      return new Response(JSON.stringify({ message: 'Yotpo request failed', error }), {
        status: yotpoRes.status,
      });
    }

    const data = await yotpoRes.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Yotpo token generation error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}