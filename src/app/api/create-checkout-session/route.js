import { NextResponse } from "next/server";
import Stripe from "stripe";

import { getProduct } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-12-15.clover",
});

const priceIdCache = new Map();

/**
 * Calculate total quantity across all cart items.
 *
 * @param {Array} items - Sanitized cart items.
 *
 * @returns {number} Total quantity.
 */
function calcTotalQty(items) {
    return items.reduce((sum, i) => sum + i.qty, 0);
}

/**
 * Get shipping options based on total quantity in the cart.
 * Applies free standard shipping for orders above a certain quantity and heavier express shipping for larger orders.
 *
 * @param {*} totalQty - Total quantity of items in the cart.
 *
 * @returns {Array} Array of shipping options for Stripe Checkout session.
 */
function getShippingOptions(totalQty) {
    const stdFreeFromQty = Number(process.env.STRIPE_SHIPPING_STANDARD_FREE_FROM_QTY ?? 3);
    const heavyFromQty = Number(process.env.STRIPE_SHIPPING_EXPRESS_HEAVY_FROM_QTY ?? 4);
    const stdAmount = Number(process.env.STRIPE_SHIPPING_STANDARD_PENCE ?? 395);
    const expressStdAmount = Number(process.env.STRIPE_SHIPPING_EXPRESS_STANDARD_PENCE ?? 595);
    const expressHvyAmount = Number(process.env.STRIPE_SHIPPING_EXPRESS_HEAVY_PENCE ?? 715);

    const toInt = (n) => (Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : 0);

    const isFreeStandard = totalQty >= stdFreeFromQty;
    const isHeavyExpress = totalQty >= heavyFromQty;

    const standardAmount = isFreeStandard ? 0 : toInt(stdAmount);
    const expressAmount = isHeavyExpress ? toInt(expressHvyAmount) : toInt(expressStdAmount);

    const standardLabel = isFreeStandard
        ? "Free Standard Shipping - Royal Mail Tracked 48"
        : "Standard Shipping - Royal Mail Tracked 48";

    return [
        {
            shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: standardAmount, currency: "gbp" },
                display_name: standardLabel,
                delivery_estimate: {
                    minimum: { unit: "business_day", value: 2 },
                    maximum: { unit: "business_day", value: 5 },
                },
            },
        },
        {
            shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: { amount: expressAmount, currency: "gbp" },
                display_name: "Express Shipping - Royal Mail Tracked 24",
                delivery_estimate: {
                    minimum: { unit: "business_day", value: 1 },
                    maximum: { unit: "business_day", value: 3 },
                },
            },
        },
    ];
}

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
 * API Route to create a Stripe Checkout Session.
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
        const requestedType = body?.purchaseType;
        const customerEmail = typeof body?.customerEmail === "string" ? body.customerEmail : null;

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
        const totalQty = calcTotalQty(sanitizedItems);

        const isSubscription = requestedType === "monthly";
        const lookupKeySuffix = isSubscription ? "monthly" : "one_off";
        const mode = isSubscription ? "subscription" : "payment";

        for (const { productId, qty } of sanitizedItems) {
            const product = getProduct(productId);

            if (!product) {
                throw new Error(`Unknown productId: ${productId}`);
            }

            if (!product.stripeLookupKeyBase) {
                throw new Error(`Missing stripeLookupKeyBase for productId: ${productId}`);
            }

            const lookupKey = `${product.stripeLookupKeyBase}_${lookupKeySuffix}`;
            const priceId = await getPriceIdByLookupKey(lookupKey);

            line_items.push({
                price: priceId,
                quantity: qty,
            });
        }

        if (isSubscription) {
            const shippingLookupKey =
                totalQty >= 3 ? "subscription_shipping_free" : "subscription_shipping_standard";

            const shippingPriceId = await getPriceIdByLookupKey(shippingLookupKey);

            if (!shippingPriceId) {
                throw new Error(
                    `Missing Stripe price for subscription shipping (lookup key: ${shippingLookupKey})`
                );
            }

            line_items.push({
                price: shippingPriceId,
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode,
            line_items,
            ...(customerEmail ? { customer_email: customerEmail } : {}),
            success_url: `${domain}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domain}/cart`,
            shipping_address_collection: {
                allowed_countries: ["GB"],
            },
            ...(mode === "payment" ? { shipping_options: getShippingOptions(totalQty) } : {}),
            billing_address_collection: "auto",
            phone_number_collection: { enabled: true },
            automatic_tax: { enabled: true },

            metadata: {
                purchaseType: isSubscription ? "subscription_create" : "one_off",
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
