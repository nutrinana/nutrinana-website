import { pool } from "@/lib/db/pool";

/**
 * Function to record a Stripe subscription-related event.
 *
 * Audits subscription events such as creation, updates, cancellations, and invoice payments.
 *
 * @util stripe
 *
 * @param {object} params - Parameters for recording the subscription event.
 * @param {string} params.stripeEventId - The unique ID of the Stripe event.
 * @param {string} params.eventType - The type of the Stripe event (e.g., 'customer.subscription.created').
 * @param {string} [params.subscriptionId] - The ID of the Stripe subscription.
 * @param {string} [params.customerId] - The ID of the Stripe customer.
 * @param {string} [params.invoiceId] - The ID of the related invoice, if applicable.
 * @param {object} params.payload - The full event payload to store as JSON.
 *
 * @returns {Promise<void>} - Resolves when the event has been recorded.
 */
export async function recordSubscriptionEvent({
    stripeEventId,
    eventType,
    subscriptionId,
    customerId,
    invoiceId,
    payload,
}) {
    if (!stripeEventId || !eventType || !payload) {
        throw new Error("recordSubscriptionEvent requires stripeEventId, eventType, and payload");
    }

    await pool.query(
        `
        INSERT INTO stripe_subscription_events
          (stripe_event_id, event_type, subscription_id, customer_id, invoice_id, payload_json)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (stripe_event_id) DO NOTHING
        `,
        [
            stripeEventId,
            eventType,
            subscriptionId || null,
            customerId || null,
            invoiceId || null,
            payload,
        ]
    );
}

/**
 * Function to upsert the current state of a Stripe subscription.
 *
 * Maintains a record of the latest known state of each subscription.
 *
 * @util stripe
 *
 * @param {object} params - Parameters for upserting the subscription state.
 * @param {string} params.subscriptionId - The ID of the Stripe subscription.
 * @param {string} [params.customerId] - The ID of the Stripe customer.
 * @param {string} [params.status] - The current status of the subscription (e.g., 'active', 'canceled').
 * @param {string} [params.currentPeriodEnd] - ISO string of the current period end date.
 * @param {boolean} [params.cancelAtPeriodEnd] - Whether the subscription is set to cancel at period end.
 * @param {string} [params.canceledAt] - ISO string of when the subscription was canceled.
 * @param {string} [params.lastInvoiceId] - The ID of the last invoice associated with the subscription.
 * @param {string} [params.lastPaymentStatus] - The payment status of the last invoice.
 * @param {string} [params.lastEventId] - The ID of the last processed Stripe event for this subscription.
 *
 * @returns {Promise<void>} - Resolves when the subscription state has been upserted.
 */
export async function upsertSubscriptionState({
    subscriptionId,
    customerId,
    status,
    currentPeriodEnd,
    cancelAtPeriodEnd,
    canceledAt,
    lastInvoiceId,
    lastPaymentStatus,
    lastEventId,
}) {
    if (!subscriptionId) {
        return;
    }

    await pool.query(
        `
        INSERT INTO stripe_subscriptions (
          subscription_id,
          customer_id,
          status,
          current_period_end,
          cancel_at_period_end,
          canceled_at,
          last_invoice_id,
          last_payment_status,
          last_event_id,
          updated_at
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, now())
        ON CONFLICT (subscription_id) DO UPDATE SET
          customer_id = EXCLUDED.customer_id,
          status = EXCLUDED.status,
          current_period_end = EXCLUDED.current_period_end,
          cancel_at_period_end = EXCLUDED.cancel_at_period_end,
          canceled_at = EXCLUDED.canceled_at,
          last_invoice_id = EXCLUDED.last_invoice_id,
          last_payment_status = EXCLUDED.last_payment_status,
          last_event_id = EXCLUDED.last_event_id,
          updated_at = now()
        `,
        [
            subscriptionId,
            customerId || null,
            status || null,
            currentPeriodEnd || null,
            typeof cancelAtPeriodEnd === "boolean" ? cancelAtPeriodEnd : null,
            canceledAt || null,
            lastInvoiceId || null,
            lastPaymentStatus || null,
            lastEventId || null,
        ]
    );
}
