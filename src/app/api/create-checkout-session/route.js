import { NextResponse } from "next/server";
import Stripe from "stripe";

import { getProduct } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-12-15.clover",
});

const priceIdCache = new Map();

/**
 * Fetches the Stripe Price ID for a given lookup key.
 *
 * @param {string} lookupKey - The Stripe lookup key to search for.
 *
 * @returns {Promise<string>} - The Stripe Price ID.
 */
async function getPriceIdByLookupKey(lookupKey) {
    if (!lookupKey) {
        throw new Error("Missing Stripe lookup key");
    }

    const cached = priceIdCache.get(lookupKey);
    if (cached) {
        return cached;
    }

    const res = await stripe.prices.search({
        query: `lookup_key:'${lookupKey}' AND active:'true'`,
        limit: 1,
    });

    const price = res.data?.[0];
    if (!price?.id) {
        throw new Error(`No active Stripe price found for lookup key: ${lookupKey}`);
    }

    priceIdCache.set(lookupKey, price.id);

    return price.id;
}

/**
 * API Route to create a Stripe Checkout Session
 *
 * Handles POST requests to create a Stripe Checkout session
 * based on the cart items and purchase type sent in the request body.
 *
 * @route POST /api/create-checkout-session
 *
 * @param {Request} req - The incoming request object.
 *
 * @returns {NextResponse} - JSON response containing the Checkout URL or an error message.
 */
export async function POST(req) {
    try {
        const domain = process.env.NEXT_PUBLIC_BASE_URL;

        const body = await req.json().catch(() => ({}));
        const items = Array.isArray(body?.items) ? body.items : [];
        const purchaseType = body?.purchaseType === "monthly" ? "monthly" : "one_off";

        if (items.length === 0) {
            return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
        }

        const sanitizedItems = items
            .map((i) => ({
                productId: String(i?.productId || ""),
                qty: Number(i?.qty || 0),
            }))
            .filter((i) => i.productId && Number.isFinite(i.qty) && i.qty > 0);

        if (sanitizedItems.length === 0) {
            return NextResponse.json({ error: "No valid cart items" }, { status: 400 });
        }

        const line_items = [];

        for (const { productId, qty } of sanitizedItems) {
            const product = getProduct(productId);

            if (!product) {
                throw new Error(`Unknown productId: ${productId}`);
            }

            if (!product.stripeLookupKeyBase) {
                throw new Error(`Missing stripeLookupKeyBase for productId: ${productId}`);
            }

            const lookupKey = `${product.stripeLookupKeyBase}_${purchaseType}`;
            const priceId = await getPriceIdByLookupKey(lookupKey);

            line_items.push({
                price: priceId,
                quantity: qty,
            });
        }

        const mode = purchaseType === "monthly" ? "subscription" : "payment";

        const session = await stripe.checkout.sessions.create({
            mode,
            line_items,
            success_url: `${domain}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domain}/cart`,
            shipping_address_collection: {
                allowed_countries: ["GB"],
            },
            billing_address_collection: "auto",
            automatic_tax: { enabled: true },

            metadata: {
                purchaseType,
                cart: JSON.stringify(
                    sanitizedItems.map(({ productId, qty }) => ({ productId, qty }))
                ),
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Create checkout session error:", error);

        return NextResponse.json(
            { error: error?.message || "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
