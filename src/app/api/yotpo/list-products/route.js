

import { NextResponse } from 'next/server';

export async function GET() {
  const STORE_ID = process.env.YOTPO_STORE_ID;
  const TOKEN = process.env.YOTPO_TOKEN;

  try {
    // Fetch products
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

    if (!productRes.ok) {
      const errText = await productRes.text();
      return NextResponse.json(
        { message: 'Product fetch failed', raw: errText },
        { status: 500 }
      );
    }

    const productData = await productRes.json();

    // Fetch variants for each product
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
      if (variantRes.ok) {
        const variantData = await variantRes.json();
        variants = variantData.variants || [];
      }

      return {
        ...product,
        variants,
      };
    });

    const productsWithVariants = await Promise.all(variantPromises);

    return NextResponse.json({ products: productsWithVariants });
  } catch (error) {
    return NextResponse.json(
      { message: 'Unexpected error', error: error.message },
      { status: 500 }
    );
  }
}