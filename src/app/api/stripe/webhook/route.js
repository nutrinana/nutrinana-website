import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-12-15.clover" });

function safeLog(...args) {
    console.log(...args);
}

/**
 * Builds an order playload from a Stripe Checkout Session object.
 *
 * @param {object} session - The Stripe Checkout Session object.
 *
 * @returns {object} - The order payload formatted for Hutch.
 */
function buildOrderPayloadFromSession(session) {
    const shipping = session.shipping_details || session.customer_details || {};

    const address = shipping?.address || {};

    const lineItems = session.line_items?.data || [];
    const items = lineItems.map((li) => {
        const price = li.price || {};
        const product = price.product || {};
        const productMetadata = product?.metadata || {};
        const priceMetadata = price?.metadata || {};

        const sku =
            productMetadata.sku || priceMetadata.sku || productMetadata.productId || undefined;

        return {
            sku,
            quantity: li.quantity ?? 1,
            name: li.description || product?.name || undefined,
            stripe: {
                lineItemId: li.id,
                priceId: price.id,
                productId: typeof product === "string" ? product : product?.id,
            },
        };
    });

    const checkoutSessionId = session.id;
    const paymentIntentId =
        typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;

    const subscriptionId =
        typeof session.subscription === "string" ? session.subscription : session.subscription?.id;

    return {
        orderReference: checkoutSessionId,
        stripeCheckoutSessionId: checkoutSessionId,
        stripePaymentIntentId: paymentIntentId || null,
        stripeSubscriptionId: subscriptionId || null,

        customer: {
            email: session.customer_details?.email || session.customer_email || null,
            phone: session.customer_details?.phone || null,
            name: shipping?.name || session.customer_details?.name || null,
        },

        shipping: {
            name: shipping?.name || null,
            phone: shipping?.phone || session.customer_details?.phone || null,
            address: {
                line1: address.line1 || null,
                line2: address.line2 || null,
                city: address.city || null,
                state: address.state || null,
                postalCode: address.postal_code || null,
                country: address.country || null,
            },
        },

        totals: {
            currency: session.currency || null,
            amountTotal: session.amount_total ?? 0,
            amountSubtotal: session.amount_subtotal ?? 0,
            amountShipping: session.shipping_cost?.amount_total ?? 0,
            amountTax: session.total_details?.amount_tax ?? 0,
            amountDiscount: session.total_details?.amount_discount ?? 0,
        },

        items,

        purchaseType: session.metadata?.purchaseType || null,
        createdAt: session.created ? new Date(session.created * 1000).toISOString() : null,
    };
}

/**
 * Fulfillment handler for completed Stripe Checkout Sessions.
 *
 * @param {string} sessionId - The ID of the completed Checkout Session.
 *
 * @returns {object} - Result of the fulfillment process.
 */
async function fulfillCheckoutSession(sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: [
            "line_items.data.price",
            "line_items.data.price.product",
            "payment_intent",
            "subscription",
        ],
    });

    if (session.payment_status === "unpaid") {
        safeLog(`[stripe] Session ${sessionId} unpaid — skipping fulfillment`);

        return { fulfilled: false, reason: "unpaid" };
    }

    const payload = buildOrderPayloadFromSession(session);

    // TODO (later): idempotency guard:
    // - store payload keyed by sessionId
    // - if sessionId already fulfilled, exit early

    safeLog("[stripe] Order payload:");
    safeLog(JSON.stringify(payload, null, 2));

    // TODO (later): send payload to Hutch
    // await sendToHutch(payload);

    return { fulfilled: true, payload };
}

/**
 * Stripe webhook handler.
 *
 * @route POST /api/stripe/webhook
 *
 * @param {Request} req - The incoming request object.
 *
 * @returns {Response} - Response indicating the result of webhook processing.
 */
export async function POST(req) {
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
        return new Response("Missing Stripe signature", { status: 400 });
    }

    let rawBody;
    try {
        const buf = Buffer.from(await req.arrayBuffer());
        rawBody = buf;
    } catch {
        return new Response("Unable to read request body", { status: 400 });
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("[stripe] Webhook signature verification failed:", err?.message);

        return new Response("Webhook Error", { status: 400 });
    }

    try {
        if (
            event.type === "checkout.session.completed" ||
            event.type === "checkout.session.async_payment_succeeded"
        ) {
            const session = event.data.object;
            await fulfillCheckoutSession(session.id);
        }

        if (event.type === "checkout.session.async_payment_failed") {
            const session = event.data.object;
            console.warn("[stripe] Async payment failed for session:", session.id);
        }

        return new Response("ok", { status: 200 });
    } catch (err) {
        console.error("[stripe] Webhook handler error:", err);

        return new Response("Webhook handler failed", { status: 500 });
    }
}
