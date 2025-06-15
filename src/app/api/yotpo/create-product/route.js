/**
 * API route to create or update a product in Yotpo.
 * 
 * It first attempts to create a new product using the Yotpo API.
 * If the product already exists, it retrieves the existing product's Yotpo ID
 * and updates the product with the latest data.
 * 
 * @returns {Response} JSON response containing the product creation or update result.
 * @route GET /api/yotpo/create-product
 */
export async function GET() {
  // Ensure required environment variables are configured
  const storeId = process.env.YOTPO_STORE_ID;
  const secret = process.env.YOTPO_API_SECRET;

  if (!storeId || !secret) {
    return new Response(JSON.stringify({ message: 'Yotpo credentials not configured' }), {
      status: 500,
    });
  }

  // Step 1: Get Yotpo access token using API secret
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

  // Step 2: Define the product to be created or updated
  const product = {
    external_id: 'activated-granola',
    name: 'Nutrinana\'s Activated Granola',
    description: 'Nutrinana\'s Activated Granola is a premium, hand-crafted blend of activated nuts and seeds, with natural ingredients designed to nourish your mornings.',
    url: 'https://www.nutrinana.co.uk/activated-granola',
    image_url: 'https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg',
    price: 8.50,
    currency: 'GBP',
    sku: 'NUTR-GRAN',
  };

  let productResponse;
  let existingProduct = false;

  // Attempt to create the product
  const createRes = await fetch(`https://api.yotpo.com/core/v3/stores/${storeId}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Yotpo-Token': access_token,
    },
    body: JSON.stringify({ product }),
  });

  // Handle creation failure (e.g., product already exists)
  if (!createRes.ok) {
    const err = await createRes.json();
    const alreadyExists = err.errors?.some(e => e.message?.toLowerCase().includes('already exists'));

    if (alreadyExists) {
      // Look up existing product details to retrieve Yotpo ID
      const lookupRes = await fetch(`https://api.yotpo.com/core/v3/stores/${storeId}/products?external_id=${product.external_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Yotpo-Token': access_token,
        },
      });

      // Handle lookup failure
      if (!lookupRes.ok) {
        const lookupErrText = await lookupRes.text();
        return new Response(JSON.stringify({ message: 'Product lookup failed', lookupErr: lookupErrText }), {
          status: 500,
        });
      }

      // Parse the lookup response to find the Yotpo ID
      const lookupData = await lookupRes.json();
      const yotpoId = lookupData.products?.[0]?.yotpo_id;

      // Handle case where Yotpo ID is not found
      if (!yotpoId) {
        return new Response(JSON.stringify({ message: 'Yotpo ID not found in lookup response' }), {
          status: 500,
        });
      }

      // Update the existing product with the latest data
      const updateRes = await fetch(`https://api.yotpo.com/core/v3/stores/${storeId}/products/${yotpoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Yotpo-Token': access_token,
        },
        body: JSON.stringify({ product }),
      });

      // Handle update failure
      if (!updateRes.ok) {
        const updateErrText = await updateRes.text();
        return new Response(JSON.stringify({ message: 'Product update failed', updateErr: updateErrText }), {
          status: 500,
        });
      }

      // Parse the update response
      // If the response is empty, it means the update was successful but no content is returned (204 No Content)
      existingProduct = true;
      const updateText = await updateRes.text();
      if (updateText.trim()) {
        try {
          productResponse = JSON.parse(updateText);
        } catch (e) {
          return new Response(JSON.stringify({ message: 'Product update response not valid JSON', raw: updateText }), {
            status: 500,
          });
        }
      } else {
        productResponse = { message: 'Product updated successfully (204 No Content)' };
      }
    } else {
      return new Response(JSON.stringify({ message: 'Product creation failed', err }), {
        status: 500,
      });
    }
  } 
  else {
    productResponse = await createRes.json();
  }

  // Respond with product creation or update result
  return new Response(JSON.stringify({ product: productResponse, existingProduct }), { status: 200 });
}
