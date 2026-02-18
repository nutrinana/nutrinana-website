import { Resend } from "resend";
import Stripe from "stripe";

import InternalOrderNotificationEmail from "@/emails/InternalOrderNotificationEmail";
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

const SHIPPING_LOOKUP_KEY = "subscription_shipping";
const BILLING_REASON_RENEWAL = "subscription_cycle";
const BILLING_REASON_UPCOMING = "upcoming";
const BILLING_REASON_SUBSCRIPTION_CREATE = "subscription_create";
const INTERNAL_NOTIFICATION_EMAIL = "orders@nutrinana.co.uk";

/**
 * Sends order confirmation email to customer and internal notification to team.
 *
 * @param {object} payload - The order payload containing customer and order details.
 *
 * @returns {Promise<{ customerSent: boolean, internalSent: boolean }>} - Result of both email sending attempts.
 */
async function sendOrderEmails(payload) {
    const results = {
        customerSent: false,
        internalSent: false,
    };

    if (!resend) {
        console.warn("[email] RESEND_API_KEY not set — skipping order emails");

        return results;
    }

    const orderReference = payload?.orderReference || "";
    const customerEmail = payload?.customer?.email || null;
    const customerName = payload?.customer?.name || "there";

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

    // Customer email
    if (customerEmail) {
        try {
            const customerItems = rawItems.map((it) => ({
                name: it?.name || it?.sku || "Item",
                quantity: Number(it?.quantity || 1),
                unitPrice: formatMoneyFromMinor(it?.unit_price ?? it?.unitPrice, currency),
            }));

            const subject = orderReference
                ? `Nutrinana order confirmed | Order ${orderReference}`
                : "Nutrinana order confirmed";

            const res = await resend.emails.send({
                from: "Nutrinana Orders <orders@nutrinana.co.uk>",
                to: customerEmail,
                replyTo: "info@nutrinana.co.uk",
                subject,
                react: (
                    <OrderConfirmationEmail
                        name={customerName}
                        orderReference={orderReference}
                        orderDate={orderDate}
                        items={customerItems}
                        total={total}
                        subtotal={subtotal}
                        shipping={shippingCost}
                        address={address}
                    />
                ),
            });

            console.log(
                `[email] Sent customer confirmation to ${customerEmail} (${orderReference})`,
                res?.id ? `resend_id=${res.id}` : ""
            );

            results.customerSent = true;
        } catch (err) {
            console.error(
                `[email] Failed to send customer confirmation to ${customerEmail} (${orderReference}):`,
                err instanceof Error ? err.message : String(err)
            );
        }
    } else {
        console.warn(`[email] No customer email found for order ${orderReference}`);
    }

    // Internal team notification
    try {
        const internalItems = rawItems.map((it) => ({
            name: it?.name || "Item",
            quantity: Number(it?.quantity || 1),
            sku: it?.sku || null,
        }));

        const purchaseType = payload?.purchaseType || null;
        const subscriptionId = payload?.stripeSubscriptionId || null;

        const subject = `[New Order] ${orderReference}`;

        const res = await resend.emails.send({
            from: "Nutrinana Orders <orders@nutrinana.co.uk>",
            to: INTERNAL_NOTIFICATION_EMAIL,
            replyTo: customerEmail || "info@nutrinana.co.uk",
            subject,
            react: (
                <InternalOrderNotificationEmail
                    orderReference={orderReference}
                    orderDate={orderDate}
                    customerName={customerName}
                    customerEmail={customerEmail || "No email"}
                    items={internalItems}
                    total={total}
                    purchaseType={purchaseType}
                    subscriptionId={subscriptionId}
                />
            ),
        });

        console.log(
            `[email] Sent internal notification for order ${orderReference}`,
            res?.id ? `resend_id=${res.id}` : ""
        );

        results.internalSent = true;
    } catch (err) {
        console.error(
            `[email] Failed to send internal notification for order ${orderReference}:`,
            err instanceof Error ? err.message : String(err)
        );
    }

    return results;
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
 * Extract customer data from invoice and subscription objects.
 *
 * @param {object} invoice - Stripe invoice object
 * @param {object|null} subscription - Stripe subscription object (expanded)
 *
 * @returns {object} Customer data with name, email, and phone
 */
function extractCustomerData(invoice, subscription) {
    const customerObj = typeof subscription?.customer === "object" ? subscription.customer : null;

    return {
        name:
            customerObj?.name ||
            invoice?.customer_name ||
            invoice?.customer_shipping?.name ||
            invoice?.customer_details?.name ||
            "Customer",
        email:
            customerObj?.email ||
            invoice?.customer_email ||
            invoice?.customer_details?.email ||
            null,
        phone: customerObj?.phone || invoice?.customer_phone || null,
    };
}

/**
 * Extract shipping data from invoice and subscription objects.
 *
 * @param {object} invoice - Stripe invoice object
 * @param {object} customerData - Customer data object
 *
 * @returns {object} Shipping data with name, phone, and address
 */
function extractShippingData(invoice, customerData) {
    const ship = invoice?.customer_shipping || null;
    const addr = ship?.address || null;

    return {
        name: ship?.name || customerData.name || null,
        phone: customerData.phone,
        address: {
            line1: addr?.line1 || null,
            line2: addr?.line2 || null,
            city: addr?.city || null,
            state: addr?.state || null,
            postalCode: addr?.postal_code || null,
            country: addr?.country || null,
        },
    };
}

/**
 * Build metadata lookup maps from subscription items.
 *
 * @param {object|null} subscription - Stripe subscription object
 *
 * @returns {object} Object with metaByPriceId and metaByProductId Maps
 */
function buildMetadataLookups(subscription) {
    const metaByPriceId = new Map();
    const metaByProductId = new Map();

    const subscriptionItems = subscription?.items?.data || [];

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

    return { metaByPriceId, metaByProductId };
}

/**
 * Extract price ID from invoice line (handles various Stripe shapes).
 *
 * @param {object} line - Invoice line item
 *
 * @returns {string|null} Price ID
 */
function getLinePriceId(line) {
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
}

/**
 * Extract product ID from invoice line (handles various Stripe shapes).
 *
 * @param {object} line - Invoice line item
 *
 * @returns {string|null} Product ID
 */
function getLineProductId(line) {
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
}

/**
 * Check if invoice line is a shipping line item.
 *
 * @param {object} line - Invoice line item
 * @param {object|null} meta - Metadata from lookup maps
 *
 * @returns {boolean} True if this is a shipping line
 */
function isShippingLine(line, meta) {
    return (
        (meta?.lookupKey && meta.lookupKey === SHIPPING_LOOKUP_KEY) ||
        (line?.description || "").toLowerCase().includes("shipping")
    );
}

/**
 * Resolve SKU from invoice line and metadata.
 *
 * @param {object} line - Invoice line item
 * @param {object|null} meta - Metadata from lookup maps
 *
 * @returns {string|null} Resolved SKU
 */
function resolveSkuFromLine(line, meta) {
    if (meta?.sku) {
        return meta.sku;
    }

    if (meta?.lookupKeyBase) {
        const match = Object.values(PRODUCTS).find(
            (p) => p?.stripeLookupKeyBase === meta.lookupKeyBase
        );
        if (match) {
            return match.sku || match.productId || null;
        }
    }

    const desc = String(line?.description || "").toLowerCase();
    const match = Object.values(PRODUCTS).find(
        (p) => String(p?.name || "").toLowerCase() && desc.includes(String(p.name).toLowerCase())
    );

    return match?.sku || match?.productId || null;
}

/**
 * Resolve product name from invoice line and metadata.
 *
 * @param {object} line - Invoice line item
 * @param {object|null} meta - Metadata from lookup maps
 * @param {string|null} resolvedSku - Already resolved SKU
 *
 * @returns {string|null} Resolved product name
 */
function resolveProductName(line, meta, resolvedSku) {
    if (meta?.productName) {
        return meta.productName;
    }

    if (resolvedSku) {
        const match = Object.values(PRODUCTS).find(
            (p) => p?.sku === resolvedSku || p?.productId === resolvedSku
        );
        if (match?.name) {
            return match.name;
        }
    }

    const desc = String(line?.description || "");

    return (
        desc
            .replace(/^\s*\d+\s*pack\s*×\s*/i, "")
            .replace(/^\s*\d+\s*×\s*/i, "")
            .replace(/\s*\(at\s*[^)]*\)\s*$/i, "")
            .trim() || null
    );
}

/**
 * Map invoice lines to order items, separating shipping charges.
 *
 * @param {Array} invoiceLines - Invoice line items
 * @param {Map} metaByPriceId - Price ID to metadata map
 * @param {Map} metaByProductId - Product ID to metadata map
 *
 * @returns {object} Object with items array and calculatedShipping amount
 */
function mapInvoiceLinesToItems(invoiceLines, metaByPriceId, metaByProductId) {
    let calculatedShipping = 0;
    const items = [];

    for (const line of invoiceLines) {
        const priceId = getLinePriceId(line);
        const productId = getLineProductId(line);

        const meta =
            (priceId && metaByPriceId.get(priceId)) ||
            (productId && metaByProductId.get(productId)) ||
            null;

        if (isShippingLine(line, meta)) {
            calculatedShipping += line?.amount || 0;
            continue; // Don't add to items array
        }

        const quantity = line?.quantity || 1;
        const lineAmount = typeof line?.amount === "number" ? line.amount : null;

        const unitPrice =
            typeof meta?.unitAmount === "number"
                ? meta.unitAmount
                : typeof lineAmount === "number"
                  ? Math.round(lineAmount / quantity)
                  : null;

        const resolvedSku = resolveSkuFromLine(line, meta);
        const resolvedName = resolveProductName(line, meta, resolvedSku);

        items.push({
            sku: resolvedSku,
            quantity,
            name: resolvedName,
            unit_price: unitPrice,
            stripe: {
                priceId: priceId || null,
                productId: productId || meta?.productId || null,
            },
        });
    }

    return { items, calculatedShipping };
}

/**
 * Builds an order payload from a Stripe Checkout Session object.
 *
 * @param {object} session - The Stripe Checkout Session object.
 *
 * @returns {object} - The order payload formatted for fulfillment.
 */
function buildOrderPayloadFromSession(session) {
    const shipping = session.shipping_details || session.customer_details || {};
    const address = shipping?.address || {};

    const lineItems = session.line_items?.data || [];

    let calculatedShipping = 0;
    const items = [];

    for (const li of lineItems) {
        const price = li.price || {};
        const product = price.product || {};
        const productMetadata = product?.metadata || {};
        const priceMetadata = price?.metadata || {};

        const lookupKey = price?.lookup_key || null;
        const isShipping =
            lookupKey === SHIPPING_LOOKUP_KEY ||
            (li.description || "").toLowerCase().includes("shipping") ||
            (product?.name || "").toLowerCase().includes("shipping");

        if (isShipping) {
            calculatedShipping += li.amount_total || 0;
            continue;
        }

        const sku =
            productMetadata.sku || priceMetadata.sku || productMetadata.productId || undefined;

        items.push({
            sku,
            quantity: li.quantity || 1,
            name: li.description || product?.name || undefined,
            unit_price: price?.unit_amount ?? undefined,
            stripe: {
                lineItemId: li.id,
                priceId: price.id,
                productId: typeof product === "string" ? product : product?.id,
            },
        });
    }

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
            amountTotal: session.amount_total || 0,
            amountSubtotal: (session.amount_subtotal || 0) - calculatedShipping,
            amountShipping:
                calculatedShipping > 0
                    ? calculatedShipping
                    : session.shipping_cost?.amount_total || 0,
            amountTax: session.total_details?.amount_tax || 0,
            amountDiscount: session.total_details?.amount_discount || 0,
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

    const customerData = extractCustomerData(invoice, subscription);
    const shippingData = extractShippingData(invoice, customerData);

    const { metaByPriceId, metaByProductId } = buildMetadataLookups(subscription);

    const invoiceLines = invoice?.lines?.data || [];
    const { items, calculatedShipping } = mapInvoiceLinesToItems(
        invoiceLines,
        metaByPriceId,
        metaByProductId
    );

    const subscriptionId =
        subscription?.id ||
        (typeof invoice?.subscription === "string"
            ? invoice.subscription
            : invoice?.subscription?.id) ||
        invoice?.parent?.subscription_details?.subscription ||
        null;

    return {
        orderReference,
        stripeCheckoutSessionId: null,
        stripePaymentIntentId:
            typeof invoice?.payment_intent === "string"
                ? invoice.payment_intent
                : invoice?.payment_intent?.id || null,
        stripeSubscriptionId: subscriptionId,

        customer: customerData,
        shipping: shippingData,

        totals: {
            currency: invoice?.currency || null,
            amountTotal: invoice?.total ?? invoice?.amount_paid ?? 0,
            amountSubtotal: (invoice?.subtotal || 0) - calculatedShipping,
            amountShipping:
                calculatedShipping > 0
                    ? calculatedShipping
                    : invoice?.shipping_cost?.amount_total || 0,
            amountTax: invoice?.tax || 0,
            amountDiscount: invoice?.total_discount_amounts?.[0]?.amount || 0,
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
 * @param {string} eventId - The Stripe event ID.
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

        try {
            await sendOrderEmails(payload);
        } catch (emailErr) {
            console.error(
                `[email] sendOrderEmails(${payload?.orderReference || sessionId}) failed:`,
                emailErr
            );
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
 * sends the confirmation email, and dispatches the order to fulfillment provider.
 *
 * @param {object} invoice - Stripe invoice object
 * @param {string} eventId - Stripe event id
 *
 * @returns {object} Result of the fulfillment process
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

        try {
            await sendOrderEmails(payload);
        } catch (emailErr) {
            console.error(
                `[email] sendOrderEmails(${payload?.orderReference || invoiceId}) failed:`,
                emailErr
            );
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

                await upsertSubscriptionState({
                    subscriptionId,
                    customerId:
                        typeof invoice.customer === "string"
                            ? invoice.customer
                            : invoice.customer?.id,
                    lastInvoiceId: invoice.id,
                    lastPaymentStatus:
                        event.type === "invoice.payment_succeeded" ? "succeeded" : "failed",
                    currentPeriodEnd: renewalDateIso,
                    lastEventId: event.id,
                });

                safeLog(`[stripe] Recorded ${event.type} for subscription ${subscriptionId}`);

                const isRenewal =
                    invoice?.billing_reason === BILLING_REASON_RENEWAL ||
                    invoice?.billing_reason === BILLING_REASON_UPCOMING;

                if (event.type === "invoice.payment_succeeded" && isRenewal) {
                    await fulfillSubscriptionRenewal(invoice, event.id);
                }

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

            await upsertSubscriptionState({
                subscriptionId,
                customerId:
                    typeof subscription.customer === "string"
                        ? subscription.customer
                        : subscription.customer?.id,
                status: subscription.status || null,
                currentPeriodEnd: currentPeriodEndIso,
                cancelAtPeriodEnd: !!subscription.cancel_at_period_end,
                canceledAt: unixSecondsToIso(subscription.canceled_at),
                lastEventId: event.id,
            });

            safeLog(`[stripe] Recorded ${event.type} for subscription ${subscriptionId}`);
        }

        return new Response("ok", { status: 200 });
    } catch (err) {
        console.error("[stripe] Webhook handler error:", err);

        return new Response("Webhook handler failed", { status: 500 });
    }
}
