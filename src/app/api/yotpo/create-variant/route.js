export async function GET() {
    const storeId = process.env.YOTPO_STORE_ID;
    const secret = process.env.YOTPO_API_SECRET;

    const tokenRes = await fetch(`https://api.yotpo.com/core/v3/stores/${storeId}/access_tokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      return new Response(JSON.stringify({ message: 'Failed to generate access token', err }), {
        status: 500,
      });
    }

    const { access_token } = await tokenRes.json();

    const productId = '859099037'; // Correct parent product ID for Nutrinana's Activated Granola
    const endpoint = `https://api.yotpo.com/core/v3/stores/${storeId}/products/${productId}/variants`;

    // const variant = {
    //     external_id: 'activated-granola-bry',
    //     name: 'Berry Blend',
    //     description: 'A refreshing and antioxidant-rich blend of berries in activated granola.',
    //     url: 'https://www.nutrinana.co.uk/activated-granola',
    //     image_url: 'https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg',
    //     price: 8.50,
    //     currency: 'GBP',
    //     sku: 'NUTR-GRAN-BRY-500G',
    //     options: [
    //         { name: 'flavour', value: 'berry blend' }
    //     ],
    // };
    const variant = {
        external_id: 'activated-granola-mfc',
        name: 'Mixed Fruits & Coconut',
        description: 'A delicious and nutritious blend of mixed fruits and coconut.',
        url: 'https://www.nutrinana.co.uk/activated-granola',
        image_url: 'https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg',
        price: 8.50,
        currency: 'GBP',
        sku: 'NUTR-GRAN-MFC-500G',
        options: [
            { name: 'flavour', value: 'mixed fruits & coconut' }
        ],
    };

    try {
        const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Yotpo-Token': access_token,
        },
        body: JSON.stringify({ variant }),
        });

        if (!res.ok) {
            let raw;
            try {
                raw = await res.text();
            } catch (e) {
                raw = 'Could not parse error response';
            }
            console.error('Variant creation failed:', raw);
            return new Response(JSON.stringify({ message: 'Variant creation failed', raw }), {
                status: 500,
            });
        }

        const data = await res.json();
        return new Response(JSON.stringify({ message: 'Variant created successfully', data }), {
        status: 200,
        });
    } catch (error) {
        console.error('Error during variant creation:', error);
        return new Response(JSON.stringify({ message: 'Unexpected error occurred', error: error?.message }), {
        status: 500,
        });
    }
}