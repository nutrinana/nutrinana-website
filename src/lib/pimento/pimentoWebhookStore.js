import { pool } from "@/lib/db/pool";

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
 * @returns {Promise<void>}
 */
export async function updateFulfillmentTracking(orderReference, updates) {
    if (!orderReference) {
        throw new Error("updateFulfillmentTracking requires orderReference");
    }

    const { pimentoStatus, payload, trackingInfo, fulfillmentStatus } = updates;

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
        return;
    }

    const query = `
        UPDATE stripe_fulfillments
        SET ${queryUpdates.join(", ")}
        WHERE order_reference = $1
    `;

    await pool.query(query, values);
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
        Pending: "sent", // Delivery created but not yet picked up
        PickedUp: "sent", // Picked up by carrier
        InTransit: "sent", // In transit to customer
        ArrivedAtCustoms: "sent",
        HeldAtCustoms: "sent",
        ClearedCustoms: "sent",
        Attempted: "sent", // Delivery attempted
        Scheduled: "sent", // Delivery scheduled
        Completed: "fulfilled", // Successfully delivered
        Failed: "failed", // Delivery failed
        Returned: "failed", // Returned to sender
        AwaitingCollection: "sent",
        AwaitingInformation: "sent",
        AwaitingPayment: "sent",
        Damaged: "failed",
        Unavailable: "sent",
    };

    return statusMap[deliveryStatus] || null;
}
