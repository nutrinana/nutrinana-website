import { Resend } from "resend";

import ShippingNotificationEmail from "@/emails/ShippingNotificationEmail";
import { pool } from "@/lib/db/pool";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Update fulfillment record with tracking information from Pimento delivery event.
 *
 * @util pimento
 *
 * @param {string} orderReference - Internal order reference.
 * @param {object} updates - Fields to update.
 * @param {string} [updates.pimentoStatus] - Pimento order/delivery status.
 * @param {object} [updates.payload] - Full webhook payload.
 * @param {object} [updates.trackingInfo] - Tracking information.
 * @param {string} [updates.trackingInfo.deliveryId] - Pimento delivery ID.
 * @param {string} [updates.trackingInfo.trackingNumber] - Tracking number.
 * @param {string} [updates.trackingInfo.carrier] - Carrier name.
 * @param {string} [updates.trackingInfo.trackingLink] - Tracking URL.
 * @param {string} [updates.trackingInfo.status] - Delivery status.
 * @param {string} [updates.fulfillmentStatus] - Internal fulfillment status (created/sent/fulfilled/failed).
 *
 * @returns {Promise<object>} Object with wasFirstShipped boolean indicating if this was the first time tracking was added.
 */
export async function updateFulfillmentTracking(orderReference, updates) {
    if (!orderReference) {
        throw new Error("updateFulfillmentTracking requires orderReference");
    }

    const { pimentoStatus, payload, trackingInfo, fulfillmentStatus } = updates;

    const checkQuery = `
        SELECT tracking_number, payload_json
        FROM stripe_fulfillments
        WHERE order_reference = $1
    `;

    const checkResult = await pool.query(checkQuery, [orderReference]);
    const existingRecord = checkResult.rows[0];

    const hadTrackingBefore = !!existingRecord?.tracking_number;
    const hasTrackingNow = !!trackingInfo?.trackingNumber;

    const wasFirstShipped = !hadTrackingBefore && hasTrackingNow;

    const queryUpdates = [];
    const values = [orderReference];
    let paramCount = 1;

    if (pimentoStatus) {
        paramCount++;
        queryUpdates.push(`pimento_status = $${paramCount}`);
        values.push(pimentoStatus);
    }

    if (payload) {
        paramCount++;
        queryUpdates.push(`pimento_payload = $${paramCount}::jsonb`);
        values.push(JSON.stringify(payload));
    }

    if (trackingInfo) {
        if (trackingInfo.deliveryId) {
            paramCount++;
            queryUpdates.push(`pimento_delivery_id = $${paramCount}`);
            values.push(trackingInfo.deliveryId);
        }

        if (trackingInfo.trackingNumber) {
            paramCount++;
            queryUpdates.push(`tracking_number = $${paramCount}`);
            values.push(trackingInfo.trackingNumber);
        }

        if (trackingInfo.carrier) {
            paramCount++;
            queryUpdates.push(`carrier = $${paramCount}`);
            values.push(trackingInfo.carrier);
        }

        if (trackingInfo.trackingLink) {
            paramCount++;
            queryUpdates.push(`tracking_link = $${paramCount}`);
            values.push(trackingInfo.trackingLink);
        }

        if (trackingInfo.status) {
            paramCount++;
            queryUpdates.push(`delivery_status = $${paramCount}`);
            values.push(trackingInfo.status);
        }

        queryUpdates.push(`last_tracking_update_at = NOW()`);
    }

    if (fulfillmentStatus) {
        paramCount++;
        queryUpdates.push(`fulfillment_status = $${paramCount}`);
        values.push(fulfillmentStatus);
    }

    queryUpdates.push(`updated_at = NOW()`);

    if (queryUpdates.length === 0) {
        return { wasFirstShipped: false };
    }

    const query = `
        UPDATE stripe_fulfillments
        SET ${queryUpdates.join(", ")}
        WHERE order_reference = $1
    `;

    await pool.query(query, values);

    return { wasFirstShipped, existingRecord };
}

/**
 * Map Pimento delivery status to internal fulfillment status.
 *
 * @util pimento
 *
 * @param {string} deliveryStatus - Pimento delivery status.
 *
 * @returns {string|null} Internal fulfillment status or null.
 */
export function mapDeliveryStatusToFulfillmentStatus(deliveryStatus) {
    if (!deliveryStatus) {
        return null;
    }

    const statusMap = {
        ORDER_STATUS_UNKNOWN: null,
        ORDER_STATUS_PENDING: null,
        ORDER_STATUS_BLOCKED: null,
        ORDER_STATUS_PICKING: null,
        ORDER_STATUS_PICKED: null,
        ORDER_STATUS_PACKED: null,
        ORDER_STATUS_QUALITY_ASSURED: null,
        ORDER_STATUS_SHIPPED: "sent",
        ORDER_STATUS_CANCELLED: "failed",

        Pending: "sent",
        PickedUp: "sent",
        InTransit: "sent",
        ArrivedAtCustoms: "sent",
        HeldAtCustoms: "sent",
        ClearedCustoms: "sent",
        Attempted: "sent",
        Scheduled: "sent",
        Completed: "fulfilled",
        Failed: "failed",
        Returned: "failed",
        AwaitingCollection: "sent",
        AwaitingInformation: "sent",
        AwaitingPayment: "sent",
        Damaged: "failed",
        Unavailable: "sent",
    };

    return statusMap[deliveryStatus] || null;
}

/**
 * Send shipping notification email to customer.
 *
 * @util pimento
 *
 * @param {object} params - Email parameters.
 * @param {string} params.orderReference - Order reference.
 * @param {string} params.customerEmail - Customer email address.
 * @param {string} params.customerName - Customer name.
 * @param {string} params.orderDate - Order date.
 * @param {string} [params.carrier] - Carrier name.
 * @param {string} [params.address] - Delivery address.
 * @param {Array} [params.items] - Order items.
 * @param {string} [params.total] - Formatted total.
 * @param {string} [params.subtotal] - Formatted subtotal.
 * @param {string} [params.shipping] - Formatted shipping cost.
 *
 * @returns {Promise<{ sent: boolean, reason?: string, resendId?: string }>} Result of the email sending attempt.
 */
export async function sendShippingNotification({
    orderReference,
    customerEmail,
    customerName,
    orderDate,
    carrier,
    address,
    items = [],
    total,
    subtotal,
    shipping,
}) {
    if (!resend) {
        console.warn("[email] RESEND_API_KEY not set — skipping shipping notification email");

        return { sent: false, reason: "missing_resend_key" };
    }

    if (!customerEmail) {
        console.warn(
            `[email] No customer email for ${orderReference} — skipping shipping notification`
        );

        return { sent: false, reason: "missing_customer_email" };
    }

    const safeName = customerName || "there";

    try {
        const subject = orderReference
            ? `Your Nutrinana order is on its way! | Order ${orderReference}`
            : "Your Nutrinana order is on its way!";

        const res = await resend.emails.send({
            from: "Nutrinana Orders <orders@nutrinana.co.uk>",
            to: customerEmail,
            replyTo: "info@nutrinana.co.uk",
            subject,
            react: (
                <ShippingNotificationEmail
                    name={safeName}
                    orderReference={orderReference}
                    orderDate={orderDate}
                    carrier={carrier}
                    address={address}
                    items={items}
                    total={total}
                    subtotal={subtotal}
                    shipping={shipping}
                    aftercareLink="https://aftercare.getpimento.com/nutrinana"
                />
            ),
        });

        console.log(
            `[email] Sent shipping notification to ${customerEmail} (${orderReference || "no-ref"})`,
            res?.id ? `resend_id=${res.id}` : ""
        );

        return { sent: true, resendId: res?.id || null };
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(
            `[email] Failed to send shipping notification to ${customerEmail} (${orderReference || "no-ref"}):`,
            msg
        );

        return { sent: false, reason: msg };
    }
}
