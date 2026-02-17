import { Resend } from "resend";
import Stripe from "stripe";

import OrderConfirmationEmail from "@/emails/OrderConfirmationEmail";
import { sendOrder } from "@/lib/fulfillment/fulfillmentProvider";
import { PRODUCTS } from "@/lib/products";
import {
    recordSubscriptionEvent,
    upsertSubscriptionState,
} from "@/lib/stripe/stripeSubscriptionStore";
import {
    claimSession,
    markFulfilled,
    markFailed,
    recordFailureIfMissing,
} from "@/lib/stripe/stripeWebhookStore";
import {
    generateOrderReferenceFromSessionId,
    formatDate,
    formatMoneyFromMinor,
    formatShippingAddress,
} from "@/lib/utils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-12-15.clover" });

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Sends an order confirmation email to the customer using Resend.
 *
 * @param {object} payload - The order payload containing customer and order details.
 *
 * @returns {Promise<{ sent: boolean, reason?: string, resendId?: string }>} - Result of the email sending attempt.
 */
async function sendOrderConfirmationEmail(payload) {
    if (!resend) {
        console.warn("[email] RESEND_API_KEY not set — skipping order confirmation email");

        return { sent: false, reason: "missing_resend_key" };
    }

    const to = payload?.customer?.email || null;
    if (!to) {
        console.warn("[email] No customer email found — skipping order confirmation email");

        return { sent: false, reason: "missing_customer_email" };
    }

    const name = payload?.customer?.name || "there";
    const orderReference = payload?.orderReference || "";
    const orderDate = payload?.createdAt
        ? `${formatDate(payload.createdAt, "dd/mm/yyyy")}, ${new Date(
              payload.createdAt
          ).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
          })}`
        : null;

    const rawItems = Array.isArray(payload?.items) ? payload.items : [];

    const totals = payload?.totals || {};
    const currency = (totals?.currency || payload?.currency || "gbp").toLowerCase();

    const total = formatMoneyFromMinor(totals?.amountTotal, currency);
    const subtotal = formatMoneyFromMinor(totals?.amountSubtotal, currency);
    const shippingCost = formatMoneyFromMinor(totals?.amountShipping, currency);

    const address = formatShippingAddress(payload?.shipping);

    const items = rawItems.map((it) => ({
        name: it?.name || it?.sku || "Item",
        quantity: Number(it?.quantity ?? 1),
        unitPrice: formatMoneyFromMinor(it?.unit_price ?? it?.unitPrice, currency),
    }));

    try {
        const subject = orderReference
            ? `Nutrinana order confirmed | Order ${orderReference}`
            : "Nutrinana order confirmed";

        const res = await resend.emails.send({
            from: "Nutrinana Orders <orders@nutrinana.co.uk>",
            to,
            replyTo: "info@nutrinana.co.uk",
            subject,
            react: (
                <OrderConfirmationEmail
                    name={name}
                    orderReference={orderReference}
                    orderDate={orderDate}
                    items={items}
                    total={total}
                    subtotal={subtotal}
                    shipping={shippingCost}
                    address={address}
                />
            ),
        });

        console.log(
            `[email] Sent order confirmation to ${to} (${orderReference || "no-ref"})`,
            res?.id ? `resend_id=${res.id}` : ""
        );

        return { sent: true, resendId: res?.id || null };
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(
            `[email] Failed to send order confirmation to ${to} (${orderReference || "no-ref"}):`,
            msg
        );

        return { sent: false, reason: msg };
    }
}

/**
 * Safe logging function.
 *
 * @param {...any} args - Arguments to log.
 *
 * @returns {void}
 */
function safeLog(...args) {
    console.log(...args);
}

/**
 * Convert unix seconds to ISO string.
 *
 * @param {number} unixSeconds - The unix timestamp in seconds.
 *
 * @returns {string|null} - The ISO string representation of the date, or null if input is invalid.
 */
function unixSecondsToIso(unixSeconds) {
    if (!unixSeconds || typeof unixSeconds !== "number") {
        return null;
    }

    return new Date(unixSeconds * 1000).toISOString();
}

/**
 * Extracts the renewal date ISO string from a Stripe invoice object.
 *
 * @param {object} invoice - The Stripe invoice object.
 *
 * @returns {string|null} - The ISO string of the renewal date, or null if unavailable.
 */
function invoiceRenewalDateIso(invoice) {
    const periodEnd = invoice?.lines?.data?.[0]?.period?.end;

    return unixSecondsToIso(periodEnd);
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
            unit_price: price?.unit_amount ?? undefined,
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

    const orderReference = generateOrderReferenceFromSessionId(checkoutSessionId);

    return {
        orderReference,
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
 * Builds an order payload from a Stripe Invoice (subscription renewal).
 *
 * @param {object} invoice - The Stripe invoice object.
 * @param {object|null} subscription - The Stripe subscription object (expanded when available).
 *
 * @returns {object} Payload compatible with our fulfilment + email flow.
 */
function buildOrderPayloadFromInvoice(invoice, subscription) {
    const orderReference = generateOrderReferenceFromSessionId(invoice?.id);

    // Prefer expanded subscription.customer when available (more reliable than invoice fields)
    const customerObj = typeof subscription?.customer === "object" ? subscription.customer : null;

    const customerName =
        customerObj?.name ||
        invoice?.customer_name ||
        invoice?.customer_shipping?.name ||
        invoice?.customer_details?.name ||
        "Customer";

    const customerEmail =
        customerObj?.email || invoice?.customer_email || invoice?.customer_details?.email || null;

    const customerPhone = customerObj?.phone || invoice?.customer_phone || null;

    const ship = invoice?.customer_shipping || null;
    const addr = ship?.address || null;

    // Build lookup maps from the expanded subscription so we can map invoice lines -> SKU
    const invoiceLines = invoice?.lines?.data || [];

    const subscriptionItems = subscription?.items?.data || [];
    const metaByPriceId = new Map();
    const metaByProductId = new Map();

    for (const si of subscriptionItems) {
        const priceObj = typeof si?.price === "object" ? si.price : null;
        const productObj = typeof priceObj?.product === "object" ? priceObj.product : null;

        const productMetadata = productObj?.metadata || {};
        const priceMetadata = priceObj?.metadata || {};

        const lookupKey = priceObj?.lookup_key || null;
        const lookupKeyBase = lookupKey
            ? String(lookupKey).replace(/_(monthly|one_off|yearly|weekly|daily)$/i, "")
            : null;

        const sku = productMetadata.sku || priceMetadata.sku || productMetadata.productId || null;

        const meta = {
            sku,
            lookupKey,
            lookupKeyBase,
            productId:
                productObj?.id || (typeof priceObj?.product === "string" ? priceObj.product : null),
            productName: productObj?.name || null,
            unitAmount: typeof priceObj?.unit_amount === "number" ? priceObj.unit_amount : null,
        };

        if (priceObj?.id) {
            metaByPriceId.set(priceObj.id, meta);
        }
        if (meta.productId) {
            metaByProductId.set(meta.productId, meta);
        }
    }

    // Helper to robustly extract ids from invoice line shapes (Stripe may expand/not expand)
    const getLinePriceId = (line) => {
        const p = line?.pricing?.price_details?.price;
        if (typeof p === "string") {
            return p;
        }
        if (p && typeof p === "object" && typeof p.id === "string") {
            return p.id;
        }
        const fallback = line?.price;
        if (typeof fallback === "string") {
            return fallback;
        }
        if (fallback && typeof fallback === "object" && typeof fallback.id === "string") {
            return fallback.id;
        }

        return null;
    };

    const getLineProductId = (line) => {
        const prod = line?.pricing?.price_details?.product;
        if (typeof prod === "string") {
            return prod;
        }
        if (prod && typeof prod === "object" && typeof prod.id === "string") {
            return prod.id;
        }
        const p = line?.price?.product;
        if (typeof p === "string") {
            return p;
        }
        if (p && typeof p === "object" && typeof p.id === "string") {
            return p.id;
        }

        return null;
    };

    let calculatedShipping = 0;

    const items = invoiceLines
        .map((line) => {
            const priceId = getLinePriceId(line);
            const productId = getLineProductId(line);

            const meta =
                (priceId && metaByPriceId.get(priceId)) ||
                (productId && metaByProductId.get(productId)) ||
                null;

            // Detect our subscription shipping line item reliably via lookup key (fallback to description)
            const isShippingLine =
                (meta?.lookupKey && meta.lookupKey === "subscription_shipping") ||
                (line?.description || "").toLowerCase().includes("shipping");

            if (isShippingLine) {
                calculatedShipping += line?.amount ?? 0;

                return null;
            }

            const quantity = Number(line?.quantity ?? 1) || 1;
            const lineAmount = typeof line?.amount === "number" ? line.amount : null;

            // Prefer unit amount from Stripe Price; otherwise derive from invoice line amount
            const unitPrice =
                typeof meta?.unitAmount === "number"
                    ? meta.unitAmount
                    : typeof lineAmount === "number"
                      ? Math.round(lineAmount / quantity)
                      : null;

            // Resolve SKU
            let resolvedSku = meta?.sku;

            // 1) Lookup key base -> our PRODUCTS mapping
            if (!resolvedSku && meta?.lookupKeyBase) {
                const match = Object.values(PRODUCTS).find(
                    (p) => p?.stripeLookupKeyBase === meta.lookupKeyBase
                );
                resolvedSku = match?.sku || match?.productId || null;
            }

            // 2) Fallback: match by product name contained in line description
            if (!resolvedSku) {
                const desc = String(line?.description || "").toLowerCase();
                const match = Object.values(PRODUCTS).find(
                    (p) =>
                        String(p?.name || "").toLowerCase() &&
                        desc.includes(String(p.name).toLowerCase())
                );
                resolvedSku = match?.sku || match?.productId || null;
            }

            return {
                // NOTE: keep sku as null if unresolved so we can see it in logs (undefined gets omitted)
                sku: resolvedSku,
                quantity,
                name: meta?.productName || line?.description || null,
                unit_price: unitPrice,
                stripe: {
                    priceId: priceId || null,
                    productId: productId || meta?.productId || null,
                },
            };
        })
        .filter(Boolean);

    return {
        orderReference,
        stripeCheckoutSessionId: null,
        stripePaymentIntentId:
            typeof invoice?.payment_intent === "string"
                ? invoice.payment_intent
                : invoice?.payment_intent?.id || null,
        stripeSubscriptionId:
            typeof invoice?.subscription === "string"
                ? invoice.subscription
                : invoice?.subscription?.id || null,

        customer: {
            email: customerEmail,
            phone: customerPhone,
            name: customerName,
        },

        shipping: {
            name: ship?.name || customerName || null,
            phone: customerPhone,
            address: {
                line1: addr?.line1 || null,
                line2: addr?.line2 || null,
                city: addr?.city || null,
                state: addr?.state || null,
                postalCode: addr?.postal_code || null,
                country: addr?.country || null,
            },
        },

        totals: {
            currency: invoice?.currency || null,
            amountTotal: invoice?.total ?? invoice?.amount_paid ?? 0,
            amountSubtotal:
                (invoice?.subtotal ?? 0) - (calculatedShipping > 0 ? calculatedShipping : 0),
            amountShipping:
                calculatedShipping > 0
                    ? calculatedShipping
                    : (invoice?.shipping_cost?.amount_total ?? 0),
            amountTax: invoice?.tax ?? 0,
            amountDiscount: invoice?.total_discount_amounts?.[0]?.amount ?? 0,
        },

        items,

        purchaseType: "subscription_renewal",
        createdAt: invoice?.created ? new Date(invoice.created * 1000).toISOString() : null,
    };
}

/**
 * Fulfillment handler for completed Stripe Checkout Sessions.
 *
 * @param {string} sessionId - The ID of the completed Checkout Session.
 *
 * @returns {object} - Result of the fulfillment process.
 */
async function fulfillCheckoutSession(sessionId, eventId) {
    const { claimed } = await claimSession(sessionId, eventId);
    if (!claimed) {
        safeLog(`[stripe] Session ${sessionId} already claimed — skipping`);

        return { fulfilled: false, reason: "already_processed" };
    }

    try {
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

        safeLog("[stripe] Order payload:");
        safeLog(JSON.stringify(payload, null, 2));

        await markFulfilled(sessionId, payload, eventId);

        // Best-effort customer confirmation email (do not fail the Stripe webhook if email fails)
        try {
            await sendOrderConfirmationEmail(payload);
        } catch (emailErr) {
            console.error(
                `[email] sendOrderConfirmationEmail(${payload?.orderReference || sessionId}) failed:`,
                emailErr
            );
        }

        try {
            const sendResult = await sendOrder(payload.orderReference);
            safeLog(
                `[fulfilment] sendOrder(${payload.orderReference}) result: ${JSON.stringify(
                    sendResult,
                    null,
                    2
                )}`
            );
        } catch (sendErr) {
            console.error(`[fulfilment] sendOrder(${payload.orderReference}) failed:`, sendErr);
        }

        return { fulfilled: true, payload, fulfilmentDispatchAttempted: true };
    } catch (err) {
        await markFailed(sessionId);
        console.error(
            `[stripe] fulfillCheckoutSession failed before completion for ${sessionId}:`,
            err
        );
        throw err;
    }
}

/**
 * Fulfillment handler for subscription renewals.
 * Creates an internal fulfilment record (idempotent via claimSession on invoice.id),
 * sends the confirmation email, and dispatches the order to Pimento.
 *
 * @param {object} invoice - Stripe invoice object
 * @param {string} eventId - Stripe event id
 */
async function fulfillSubscriptionRenewal(invoice, eventId) {
    const invoiceId = invoice?.id;
    if (!invoiceId) {
        safeLog(
            "[stripe] invoice.payment_succeeded missing invoice.id — skipping renewal fulfilment"
        );

        return { fulfilled: false, reason: "missing_invoice_id" };
    }

    const { claimed } = await claimSession(invoiceId, eventId);
    if (!claimed) {
        safeLog(`[stripe] Invoice ${invoiceId} already claimed — skipping renewal fulfilment`);

        return { fulfilled: false, reason: "already_processed" };
    }

    try {
        // Expand subscription so we can build line items with product metadata (sku)
        const subscriptionId =
            typeof invoice?.subscription === "string"
                ? invoice.subscription
                : invoice?.subscription?.id || null;

        const subscription = subscriptionId
            ? await stripe.subscriptions.retrieve(subscriptionId, {
                  expand: ["items.data.price", "items.data.price.product", "customer"],
              })
            : null;

        const payload = buildOrderPayloadFromInvoice(invoice, subscription);

        safeLog("[stripe] Renewal order payload:");
        safeLog(JSON.stringify(payload, null, 2));

        await markFulfilled(invoiceId, payload, eventId);

        // Best-effort customer confirmation email (do not fail the Stripe webhook if email fails)
        try {
            await sendOrderConfirmationEmail(payload);
        } catch (emailErr) {
            console.error(
                `[email] sendOrderConfirmationEmail(${payload?.orderReference || invoiceId}) failed:`,
                emailErr
            );
        }

        // Best-effort dispatch to fulfilment provider
        try {
            const sendResult = await sendOrder(payload.orderReference);
            safeLog(
                `[fulfilment] sendOrder(${payload.orderReference}) result: ${JSON.stringify(
                    sendResult,
                    null,
                    2
                )}`
            );
        } catch (sendErr) {
            console.error(`[fulfilment] sendOrder(${payload.orderReference}) failed:`, sendErr);
        }

        return { fulfilled: true, payload, fulfilmentDispatchAttempted: true };
    } catch (err) {
        await markFailed(invoiceId);
        console.error(`[stripe] fulfillSubscriptionRenewal failed for ${invoiceId}:`, err);
        throw err;
    }
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
        // Checkout fulfillment (one-off + subscription signups via Checkout)
        if (
            event.type === "checkout.session.completed" ||
            event.type === "checkout.session.async_payment_succeeded"
        ) {
            const session = event.data.object;
            await fulfillCheckoutSession(session.id, event.id);
        }

        // Checkout failures / expirations
        if (
            event.type === "checkout.session.async_payment_failed" ||
            event.type === "checkout.session.expired"
        ) {
            const session = event.data.object;
            console.warn("[stripe] Payment failed or session expired:", session.id);

            await recordFailureIfMissing(session.id, event.id);
        }

        // Subscription invoice payments
        if (event.type === "invoice.payment_succeeded" || event.type === "invoice.payment_failed") {
            const invoice = event.data.object;

            await recordSubscriptionEvent({
                stripeEventId: event.id,
                eventType: event.type,
                payload: event,
            });

            const subscriptionId =
                typeof invoice.subscription === "string"
                    ? invoice.subscription
                    : invoice.subscription?.id ||
                      invoice?.parent?.subscription_details?.subscription ||
                      null;

            if (subscriptionId) {
                const renewalDateIso = invoiceRenewalDateIso(invoice);

                await upsertSubscriptionState(subscriptionId, {
                    stripeEventId: event.id,
                    customerId:
                        typeof invoice.customer === "string"
                            ? invoice.customer
                            : invoice.customer?.id,
                    latestInvoiceId: invoice.id,
                    latestInvoiceStatus: invoice.status || null,
                    latestPaymentStatus:
                        event.type === "invoice.payment_succeeded" ? "succeeded" : "failed",
                    renewalDate: renewalDateIso,
                    cancellationState: null, // handled via subscription.* events
                });

                safeLog(`[stripe] Recorded ${event.type} for subscription ${subscriptionId}`);

                // For successful renewals, create a fulfilment order (idempotent) and send to Pimento.
                // Guard with billing_reason to avoid trying to fulfil initial subscription creation invoices.
                if (
                    event.type === "invoice.payment_succeeded" &&
                    (invoice?.billing_reason === "subscription_cycle" ||
                        invoice?.billing_reason === "upcoming")
                ) {
                    await fulfillSubscriptionRenewal(invoice, event.id);
                }

                // If a payment failed, record a failure row (idempotent) so we have observability.
                if (event.type === "invoice.payment_failed") {
                    await recordFailureIfMissing(invoice.id, event.id);
                }
            } else {
                safeLog(
                    `[stripe] ${event.type} received but invoice had no subscription id (invoice=${invoice.id})`
                );
            }
        }

        // Subscription updates and cancellations
        if (
            event.type === "customer.subscription.updated" ||
            event.type === "customer.subscription.deleted"
        ) {
            const subscription = event.data.object;

            await recordSubscriptionEvent({
                stripeEventId: event.id,
                eventType: event.type,
                payload: event,
            });

            const subscriptionId = subscription.id;
            const currentPeriodEndIso = unixSecondsToIso(subscription.current_period_end);

            const cancellationState = {
                status: subscription.status || null,
                cancelAtPeriodEnd: !!subscription.cancel_at_period_end,
                canceledAt: unixSecondsToIso(subscription.canceled_at),
                cancelAt: unixSecondsToIso(subscription.cancel_at),
                endedAt: unixSecondsToIso(subscription.ended_at),
            };

            await upsertSubscriptionState(subscriptionId, {
                stripeEventId: event.id,
                customerId:
                    typeof subscription.customer === "string"
                        ? subscription.customer
                        : subscription.customer?.id,
                latestInvoiceId: null,
                latestInvoiceStatus: null,
                latestPaymentStatus: null,
                renewalDate: currentPeriodEndIso,
                cancellationState,
            });

            safeLog(`[stripe] Recorded ${event.type} for subscription ${subscriptionId}`);
        }

        return new Response("ok", { status: 200 });
    } catch (err) {
        console.error("[stripe] Webhook handler error:", err);

        return new Response("Webhook handler failed", { status: 500 });
    }
}
