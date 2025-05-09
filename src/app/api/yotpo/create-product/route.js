export async function GET() {
  const storeId = process.env.YOTPO_STORE_ID;
  const secret = process.env.YOTPO_API_SECRET;

  if (!storeId || !secret) {
    return new Response(JSON.stringify({ message: 'Yotpo credentials not configured' }), {
      status: 500,
    });
  }

  // Step 1: Get access token
  const tokenRes = await fetch(`https://api.yotpo.com/core/v3/stores/${storeId}/access_tokens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.json();
    return new Response(JSON.stringify({ message: 'Failed to generate utoken', err }), {
      status: 500,
    });
  }

  const { access_token } = await tokenRes.json();

  // Step 2: Create a sample product
  const product = {
    external_id: 'activated-granola-mfc',
    name: 'Nutrinana\'s Activated Granola - Mixed Fruits & Coconut',
    description: 'Nutrinana\'s Activated Granola is a delicious and nutritious blend of mixed fruits and coconut, perfect for breakfast or a snack.',
    url: 'https://www.nutrinana.co.uk/activated-granola',
    image_url: 'https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg',
    price: 8.50,
    currency: 'GBP',
    sku: 'X',
  };

  const createRes = await fetch(`https://api.yotpo.com/core/v3/stores/${storeId}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Yotpo-Token': access_token,
    },
    body: JSON.stringify({ product }),
  });

  if (!createRes.ok) {
    const err = await createRes.json();
    return new Response(JSON.stringify({ message: 'Product creation failed', err }), {
      status: 500,
    });
  }

  const data = await createRes.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
