import { NextResponse } from 'next/server';

/**
 * API route to fetch all products and their variants from Yotpo
 * 
 * This function handles GET requests to retrieve product data from Yotpo's API.
 * It fetches all products and their associated variants,
 * returning the combined data in a JSON response.
 * 
 * @returns {Response} JSON response containing the product and variant data
 * @route GET /api/yotpo/list-products
 */
export async function GET() {
    const STORE_ID = process.env.YOTPO_STORE_ID;
    const TOKEN = process.env.YOTPO_TOKEN;

    try {
        // Step 1: Fetch all products from Yotpo
        const productRes = await fetch(
            `https://api.yotpo.com/core/v3/stores/${STORE_ID}/products`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Yotpo-Token': TOKEN,
                },
            }
        );

        // If product fetch fails, return error response
        if (!productRes.ok) {
            const errText = await productRes.text();
            return NextResponse.json(
                { message: 'Product fetch failed', raw: errText },
                { status: 500 }
            );
        }

        const productData = await productRes.json();

        // Step 2: Fetch variants for each product in parallel
        const variantPromises = productData.products.map(async (product) => {
            const variantRes = await fetch(
                `https://api.yotpo.com/core/v3/stores/${STORE_ID}/products/${product.yotpo_id}/variants`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Yotpo-Token': TOKEN,
                    },
                }
            );

            let variants = [];
            // Only attach variants if the request succeeded
            if (variantRes.ok) {
                const variantData = await variantRes.json();
                variants = variantData.variants || [];
            }

            // Combine product with its variants
            return {
                ...product,
                variants,
            };
        });

        // Step 3: Resolve all variant fetch promises
        const productsWithVariants = await Promise.all(variantPromises);

        // Return the combined product and variant data
        return NextResponse.json({ products: productsWithVariants });
    } catch (error) {
        // Catch unexpected runtime errors and return a server error response
        return NextResponse.json(
            { message: 'Unexpected error', error: error.message },
            { status: 500 }
        );
    }
}