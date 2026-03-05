import { pool } from "@/lib/db/pool";
import { pimentoClient } from "@/lib/pimento/pimentoClient";

/**
 * Send an order to Pimento using the internal order_reference.
 *
 * @util fulfillmentProvider
 *
 * @param {string} orderReference
 *
 * @returns {Promise<{ ok: boolean, orderReference: string, pimentoOrderId?: string, error?: string }>}
 */
export async function sendOrder(orderReference) {
    if (!orderReference || typeof orderReference !== "string") {
        throw new Error("sendOrder requires a non-empty orderReference string");
    }

    const { rows } = await pool.query(
        `
        SELECT
            order_reference,
            fulfillment_status,
            payload_json,
            pimento_order_id,
            sent_to_pimento_at,
            pimento_error
        FROM stripe_fulfillments
        WHERE order_reference = $1
        LIMIT 1
        `,
        [orderReference]
    );

    if (!rows.length) {
        throw new Error(`No internal order found for order_reference=${orderReference}`);
    }

    const record = rows[0];

    if (record.pimento_order_id) {
        return { ok: true, orderReference, pimentoOrderId: record.pimento_order_id };
    }

    if (record.sent_to_pimento_at) {
        return {
            ok: false,
            orderReference,
            error: record.pimento_error || "Order already sent/attempted to Pimento",
        };
    }

    const payload = safeJsonParse(record.payload_json);
    if (!payload) {
        throw new Error(
            `stripe_fulfillments.payload_json is missing/invalid for order_reference=${orderReference}`
        );
    }

    const pimentoOrderRequest = buildPimentoCreateOrderRequest({
        orderReference,
        stripePayload: payload,
    });

    try {
        const created = await pimentoClient.createOrder(pimentoOrderRequest);

        await pool.query(
            `
            UPDATE stripe_fulfillments
            SET
                pimento_order_id = $2,
                sent_to_pimento_at = NOW(),
                fulfillment_status = 'sent',
                pimento_error = NULL,
                pimento_payload = $3
            WHERE order_reference = $1
            `,
            [orderReference, created?.id || null, JSON.stringify(pimentoOrderRequest)]
        );

        return { ok: true, orderReference, pimentoOrderId: created?.id };
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        await pool.query(
            `
            UPDATE stripe_fulfillments
            SET
                fulfillment_status = 'failed',
                pimento_error = $2,
                pimento_payload = $3
            WHERE order_reference = $1
            `,
            [orderReference, msg, JSON.stringify(pimentoOrderRequest)]
        );

        throw err;
    }
}

/**
 * Helper function to build Pimento create order request from Stripe payload.
 *
 * @param {string} orderReference - Internal order reference.
 * @param {object} stripePayload - The stored Stripe payload object.
 *
 * @returns {object} The Pimento create order request body.
 */
function buildPimentoCreateOrderRequest({ orderReference, stripePayload }) {
    const session = stripePayload.session || stripePayload.checkoutSession || stripePayload;
    const lineItems =
        stripePayload.items ||
        stripePayload.lineItems ||
        stripePayload.line_items ||
        stripePayload.invoice?.lines?.data ||
        session?.line_items;

    const customerName =
        session?.customer_details?.name ||
        session?.customer_details?.first_name ||
        session?.shipping_details?.name ||
        session?.customer?.name ||
        "Customer";

    const customerEmail =
        session?.customer_details?.email ||
        session?.customer_email ||
        session?.customer?.email ||
        undefined;

    const customerPhone =
        session?.customer_details?.phone ||
        session?.shipping_details?.phone ||
        session?.customer?.phone ||
        session?.shipping?.phone ||
        undefined;

    const addr =
        stripePayload?.shipping?.address ||
        stripePayload?.customer?.address ||
        session?.shipping_details?.address ||
        session?.customer_details?.address ||
        session?.shipping?.address ||
        undefined;

    const customer_address = addr
        ? stripUndefined({
              address_line_1: addr.line1 || addr.address_line_1 || undefined,
              address_line_2: addr.line2 || addr.address_line_2 || undefined,
              city: addr.city || undefined,
              postcode: addr.postalCode || addr.postal_code || addr.postcode || undefined,
              country_code: (addr.country || addr.country_code || "GB").toUpperCase(),
          })
        : undefined;

    const currency = (session?.currency || "GBP").toUpperCase();

    const total_price =
        toMinorUnitsString(
            session?.amount_total ??
                stripePayload?.amount_total ??
                stripePayload?.totals?.amountTotal ??
                stripePayload?.totals?.amount_total ??
                undefined
        ) || computeTotalFromLineItems(lineItems);

    const shipping_price = toMinorUnitsString(
        session?.shipping_cost?.amount_total ??
            stripePayload?.shipping_cost?.amount_total ??
            stripePayload?.totals?.amountShipping ??
            stripePayload?.totals?.amount_shipping ??
            undefined
    );

    const items = mapLineItemsToPimentoItems(lineItems);

    const channelId = session?.id || session?.payment_intent || orderReference;

    const request = {
        b2b: false,
        channel: "nutrinana",
        channel_id: String(channelId),
        channel_reference: String(orderReference),
        channel_tags: stripePayload?.tags || null,
        currency,
        total_price: String(total_price || "0"),
        shipping_price: shipping_price ? String(shipping_price) : undefined,
        customer_details: {
            name: String(customerName),
            email: String(customerEmail),
            phone: String(customerPhone),
        },
        customer_address,
        items,
        note: buildNoteFromStripe(session),
        shipping_method: stripePayload?.shippingMethod,
    };

    return stripUndefined(request);
}

/**
 * Helper to map Stripe line items to Pimento order items.
 *
 * @param {array|object} lineItems - Stripe line items array or object with data[].
 *
 * @returns {array} The mapped Pimento order items.
 */
function mapLineItemsToPimentoItems(lineItems) {
    if (!lineItems) {
        return [];
    }

    const data = Array.isArray(lineItems) ? lineItems : lineItems?.data;
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    return data
        .map((li) => {
            const quantity = Math.max(1, Number(li.quantity ?? li?.qty ?? 1));

            const sku =
                li?.price?.metadata?.sku || li?.price?.product?.metadata?.sku || li?.sku || null;

            const unitAmount =
                li?.unit_price ??
                li?.price?.unit_amount ??
                (li?.amount_subtotal ? li.amount_subtotal / quantity : undefined);
            const unit_price = toMinorUnitsString(unitAmount) || undefined;

            if (!sku) {
                return null;
            }

            return stripUndefined({
                sku: String(sku),
                quantity: Number(quantity),
                unit_price: unit_price ? String(unit_price) : undefined,
            });
        })
        .filter(Boolean);
}

/**
 * Helper to build a note string from Stripe session data.
 *
 * @param {object} session - The Stripe checkout session object.
 *
 * @returns {string|undefined} The note string, or undefined if no note data is available.
 */
function buildNoteFromStripe(session) {
    const parts = [];
    if (session?.client_reference_id) {
        parts.push(`client_reference_id=${session.client_reference_id}`);
    }
    if (session?.payment_intent) {
        parts.push(`payment_intent=${session.payment_intent}`);
    }
    if (session?.id) {
        parts.push(`checkout_session=${session.id}`);
    }

    return parts.length ? parts.join(" | ") : undefined;
}

/**
 * Compute total amount from line items.
 *
 * @param {array|object} lineItems - Stripe line items array or object with data[].
 *
 * @returns {string} The total amount in minor units (e.g., pence).
 */
function computeTotalFromLineItems(lineItems) {
    const data = Array.isArray(lineItems) ? lineItems : lineItems?.data;
    if (!Array.isArray(data) || data.length === 0) {
        return "0";
    }

    let sum = 0;
    for (const li of data) {
        const qty = Number(li.quantity ?? li.qty ?? 1);

        const unit = Number(
            li?.price?.unit_amount ??
                li?.unit_price ??
                (li?.amount_subtotal ? Number(li.amount_subtotal) / qty : 0) ??
                0
        );

        if (!Number.isFinite(qty) || !Number.isFinite(unit)) {
            continue;
        }

        sum += qty * unit;
    }

    return String(Math.trunc(sum));
}

/**
 * Helper to convert a value to minor units string.
 *
 * @param {number|string|null|undefined} val - The value to convert.
 *
 * @returns {string|null} The value in minor units as a string, or null if input is null/undefined/NaN.
 */
function toMinorUnitsString(val) {
    if (val === null || val === undefined) {
        return null;
    }
    const n = Number(val);
    if (Number.isNaN(n)) {
        return null;
    }

    return String(Math.trunc(n));
}

/**
 * Helper to recursively strip undefined values from an object or array.
 *
 * @param {any} obj - The object or array to process.
 *
 * @returns {any} The cleaned object or array.
 */
function stripUndefined(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(stripUndefined).filter((v) => v !== undefined);
    }

    const out = {};
    for (const [k, v] of Object.entries(obj)) {
        if (v === undefined) {
            continue;
        }
        out[k] = stripUndefined(v);
    }

    return out;
}

/**
 * Safely parse a JSON string, returning null on failure.
 *
 * @param {string|object|null} val - The value to parse.
 *
 * @returns {object|null} The parsed object, or null if parsing fails.
 */
function safeJsonParse(val) {
    if (!val) {
        return null;
    }
    if (typeof val === "object") {
        return val;
    }
    if (typeof val !== "string") {
        return null;
    }

    try {
        return JSON.parse(val);
    } catch {
        return null;
    }
}
