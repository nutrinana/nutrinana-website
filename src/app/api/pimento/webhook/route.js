import crypto from "crypto";

import {
    updateFulfillmentTracking,
    mapDeliveryStatusToFulfillmentStatus,
    sendShippingNotification,
} from "@/lib/pimento/pimentoWebhookStore";
import { formatMoneyFromMinor, formatShippingAddress, formatDate } from "@/lib/utils";

/**
 * Timing-safe hex string comparison.
 *
 * @param {string} aHex - First hex string.
 * @param {string} bHex - Second hex string.
 *
 * @returns {boolean} Whether the two hex strings are equal.
 */
function timingSafeEqualsHex(aHex, bHex) {
    try {
        const a = Buffer.from(aHex, "hex");
        const b = Buffer.from(bHex, "hex");
        if (a.length !== b.length) {
            return false;
        }

        return crypto.timingSafeEqual(a, b);
    } catch {
        return false;
    }
}

/**
 * Compute HMAC-SHA256 hex digest.
 *
 * @param {string} secret - The HMAC secret.
 * @param {Buffer} dataBuffer - The data to sign.
 *
 * @returns {string} The hex digest.
 */
function computeHmacHex(secret, dataBuffer) {
    return crypto.createHmac("sha256", secret).update(dataBuffer).digest("hex");
}

/**
 * Normalize signature string.
 *
 * @param {string} sig - The signature string.
 *
 * @returns {string|null} The normalized hex string or null.
 */
function normalizeSignature(sig) {
    if (!sig || typeof sig !== "string") {
        return null;
    }
    const trimmed = sig.trim();
    if (trimmed.startsWith("sha256=")) {
        return trimmed.slice("sha256=".length);
    }

    return trimmed;
}

/**
 * Extract internal order reference from Pimento webhook payload.
 *
 * @param {object} payload - The webhook payload.
 *
 * @returns {string|null} The internal order reference or null.
 */
function extractOrderReference(payload) {
    const channelRef = payload?.order_event?.order?.channel_reference;
    if (channelRef) {
        return channelRef;
    }

    const deliveryRef = payload?.delivery_event?.delivery?.reference;
    if (typeof deliveryRef === "string" && deliveryRef.length) {
        const m = deliveryRef.match(/^order\/(.+)$/);

        return m ? m[1] : deliveryRef;
    }

    return payload?.order_event?.order_id || payload?.delivery_event?.order_id || null;
}

/**
 * Extract Pimento status from webhook payload.
 *
 * @param {object} payload - The webhook payload.
 *
 * @returns {string|null} The Pimento status or null.
 */
function extractPimentoStatus(payload) {
    const orderStatus = payload?.order_event?.order?.status;
    if (orderStatus) {
        return orderStatus;
    }

    const deliveryStatus = payload?.delivery_event?.delivery?.status;
    if (deliveryStatus) {
        return deliveryStatus;
    }

    return null;
}

/**
 * Extract tracking information from Pimento delivery event or order.
 *
 * @param {object} payload - The webhook payload.
 *
 * @returns {object|null} Tracking info or null.
 */
function extractTrackingInfo(payload) {
    const delivery = payload?.delivery_event?.delivery;
    if (delivery) {
        return {
            deliveryId: delivery.id || null,
            trackingNumber: delivery.trackingNumber || null,
            carrier: delivery.carrier || null,
            trackingLink: delivery.trackingLink || null,
            status: delivery.status || null,
        };
    }

    const orderTracking = payload?.order_event?.order?.tracking;
    if (orderTracking) {
        return {
            deliveryId: null,
            trackingNumber: orderTracking.tracking_number || null,
            carrier: orderTracking.carrier || null,
            trackingLink: orderTracking.tracking_link || null,
            status: null,
        };
    }

    return null;
}

/**
 * Extract customer info from payload_json stored in database.
 *
 * @param {object} existingRecord - Database record with payload_json.
 *
 * @returns {object} Customer info with email, name, address, items, orderDate, and pricing.
 */
function extractCustomerInfo(existingRecord) {
    const payloadJson = existingRecord?.payload_json;

    if (!payloadJson) {
        return {
            email: null,
            name: null,
            address: null,
            items: [],
            orderDate: null,
            total: null,
            subtotal: null,
            shipping: null,
        };
    }

    const customerEmail = payloadJson?.customer?.email || null;
    const customerName = payloadJson?.customer?.name || payloadJson?.shipping?.name || null;

    const address = formatShippingAddress(payloadJson?.shipping);

    const currency = (
        payloadJson?.totals?.currency ||
        payloadJson?.currency ||
        "gbp"
    ).toLowerCase();

    const items = (payloadJson?.items || []).map((item) => ({
        name: item?.name || "Item",
        quantity: item?.quantity || 1,
        unitPrice: formatMoneyFromMinor(item?.unit_price, currency),
    }));

    const totals = payloadJson?.totals || {};
    const total = formatMoneyFromMinor(totals?.amountTotal, currency);
    const subtotal = formatMoneyFromMinor(totals?.amountSubtotal, currency);
    const shippingCost = formatMoneyFromMinor(totals?.amountShipping, currency);

    const createdAt = payloadJson?.createdAt;
    let orderDate = null;

    if (createdAt) {
        const date = new Date(createdAt);
        orderDate = `${formatDate(createdAt, "dd/mm/yyyy")}, ${date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    }

    return {
        email: customerEmail,
        name: customerName,
        address,
        items,
        orderDate,
        total,
        subtotal,
        shipping: shippingCost,
    };
}

/**
 * Handle Pimento webhook POST requests.
 * This endpoint verifies the webhook signature and updates the internal order record.
 *
 * @route POST /api/pimento/webhook
 *
 * @param {Request} req - The incoming request.
 *
 * @returns {Response} The response.
 */
export async function POST(req) {
    const secret = process.env.PIMENTO_WEBHOOK_SECRET;
    if (!secret) {
        return new Response(
            JSON.stringify({ ok: false, error: "Missing PIMENTO_WEBHOOK_SECRET" }),
            { status: 500, headers: { "content-type": "application/json" } }
        );
    }

    const rawBody = Buffer.from(await req.arrayBuffer());

    let payload;
    try {
        payload = JSON.parse(rawBody.toString("utf8"));
    } catch {
        return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
            status: 400,
            headers: { "content-type": "application/json" },
        });
    }

    const providedSigHex = normalizeSignature(payload?.signature);
    if (!providedSigHex) {
        return new Response(JSON.stringify({ ok: false, error: "Missing signature" }), {
            status: 400,
            headers: { "content-type": "application/json" },
        });
    }

    const expectedOnRaw = computeHmacHex(secret, rawBody);
    let verified = timingSafeEqualsHex(expectedOnRaw, providedSigHex);

    if (!verified) {
        const eventOnly =
            payload?.order_event ??
            payload?.delivery_event ??
            payload?.asn_event ??
            payload?.refund_event ??
            payload?.product_event;

        if (eventOnly) {
            const eventBuf = Buffer.from(JSON.stringify(eventOnly), "utf8");
            const expectedOnEvent = computeHmacHex(secret, eventBuf);
            verified = timingSafeEqualsHex(expectedOnEvent, providedSigHex);
        }
    }

    if (!verified) {
        return new Response(JSON.stringify({ ok: false, error: "Invalid signature" }), {
            status: 401,
            headers: { "content-type": "application/json" },
        });
    }

    const eventType = payload?.event_type;
    const orderReference = extractOrderReference(payload);
    const pimentoStatus = extractPimentoStatus(payload);
    const trackingInfo = extractTrackingInfo(payload);

    const supported = new Set([
        "EVENT_TYPE_ORDER_UPDATED",
        "EVENT_TYPE_DELIVERY_UPDATED",
        "EVENT_TYPE_ORDER_CREATED",
        "EVENT_TYPE_DELIVERY_CREATED",
    ]);

    if (!supported.has(eventType)) {
        return new Response(JSON.stringify({ ok: true, ignored: true, eventType }), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    }

    try {
        if (!orderReference) {
            return new Response(JSON.stringify({ ok: true, warning: "No order reference found" }), {
                status: 200,
                headers: { "content-type": "application/json" },
            });
        }

        const newFulfillmentStatus = pimentoStatus
            ? mapDeliveryStatusToFulfillmentStatus(pimentoStatus)
            : null;

        const { wasFirstShipped, existingRecord } = await updateFulfillmentTracking(
            orderReference,
            {
                pimentoStatus,
                payload,
                trackingInfo,
                fulfillmentStatus: newFulfillmentStatus,
            }
        );

        console.log(
            `[pimento] Updated order ${orderReference}: status=${pimentoStatus}, delivery=${trackingInfo?.status}, tracking=${trackingInfo?.trackingNumber}`
        );

        if (pimentoStatus === "ORDER_STATUS_SHIPPED" && wasFirstShipped) {
            const customerInfo = extractCustomerInfo(existingRecord);

            if (customerInfo.email) {
                try {
                    await sendShippingNotification({
                        orderReference,
                        customerEmail: customerInfo.email,
                        customerName: customerInfo.name,
                        orderDate: customerInfo.orderDate,
                        carrier: trackingInfo?.carrier,
                        address: customerInfo.address,
                        items: customerInfo.items,
                        total: customerInfo.total,
                        subtotal: customerInfo.subtotal,
                        shipping: customerInfo.shipping,
                    });

                    console.log(
                        `[pimento] Sent shipping notification for ${orderReference} to ${customerInfo.email}`
                    );
                } catch (emailErr) {
                    console.error(
                        `[pimento] Failed to send shipping notification for ${orderReference}:`,
                        emailErr
                    );
                }
            } else {
                console.warn(
                    `[pimento] No customer email found for ${orderReference}, skipping shipping notification`
                );
            }
        }

        return new Response(
            JSON.stringify({
                ok: true,
                eventType,
                orderReference,
                pimentoStatus,
                trackingInfo,
                fulfillmentStatus: newFulfillmentStatus,
            }),
            { status: 200, headers: { "content-type": "application/json" } }
        );
    } catch (err) {
        console.error("[pimento] Webhook processing failed:", err);

        return new Response(JSON.stringify({ ok: false, error: "DB update failed" }), {
            status: 500,
            headers: { "content-type": "application/json" },
        });
    }
}
