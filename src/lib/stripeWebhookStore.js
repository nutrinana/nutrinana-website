import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

/**
 * Function to claim a session for processing.
 *
 * Attempts to insert a new record into the stripe_fulfillments table
 * with the given sessionId and eventId. If a record with the same sessionId
 * already exists, the insertion is ignored. If an existing record is found
 * with status 'processing' that hasn't been updated in over 30 minutes,
 * it is reclaimed for processing.
 *
 * @util stripe
 *
 * @param {string} sessionId - The ID of the Stripe Checkout Session to claim.
 * @param {string} eventId - The ID of the Stripe webhook event.
 *
 * @returns {object} - The result of the claim operation.
 */
export async function claimSession(sessionId, eventId) {
    const res = await pool.query(
        `
        WITH inserted AS (
            INSERT INTO stripe_fulfillments (session_id, status, last_event_id)
            VALUES ($1, 'processing', $2)
            ON CONFLICT (session_id) DO NOTHING
            RETURNING session_id
        ),
        reclaimed AS (
            UPDATE stripe_fulfillments
            SET status = 'processing',
                last_event_id = COALESCE($2, last_event_id),
                updated_at = now()
            WHERE session_id = $1
              AND status = 'processing'
              AND updated_at < (now() - INTERVAL '30 minutes')
              AND NOT EXISTS (SELECT 1 FROM inserted)
            RETURNING session_id
        )
        SELECT session_id FROM inserted
        UNION ALL
        SELECT session_id FROM reclaimed;
        `,
        [sessionId, eventId || null]
    );

    return { claimed: res.rowCount === 1 };
}

/**
 * Function to mark a session as fulfilled.
 *
 * Updates the stripe_fulfillments table to set the status to 'fulfilled',
 * update the updated_at timestamp, and store the fulfillment payload.
 *
 * @util stripe
 *
 * @param {string} sessionId - The ID of the Stripe Checkout Session.
 * @param {object} payload - The fulfillment payload to store.
 *
 * @returns {void}
 */
export async function markFulfilled(sessionId, payload) {
    await pool.query(
        `
        UPDATE stripe_fulfillments
        SET status = 'fulfilled',
            updated_at = now(),
            payload_json = $2
        WHERE session_id = $1
        `,
        [sessionId, payload]
    );
}

/**
 * Function to mark a session as failed.
 *
 * Updates the stripe_fulfillments table to set the status to 'failed'
 * and update the updated_at timestamp.
 *
 * @util stripe
 *
 * @param {string} sessionId - The ID of the Stripe Checkout Session.
 *
 * @returns {void}
 */
export async function markFailed(sessionId) {
    await pool.query(
        `
        UPDATE stripe_fulfillments
        SET status = 'failed',
            updated_at = now()
        WHERE session_id = $1
        `,
        [sessionId]
    );
}

/**
 * Function to record a failed session if it was never claimed or processed.
 *
 * This is used for async payment failures or expired sessions
 * where no prior fulfillment record exists.
 *
 * @util stripe
 *
 * @param {string} sessionId - The ID of the Stripe Checkout Session.
 * @param {string} eventId - The Stripe webhook event ID.
 *
 * @returns {object} - Whether the failure was newly recorded.
 */
export async function recordFailureIfMissing(sessionId, eventId) {
    const res = await pool.query(
        `
        INSERT INTO stripe_fulfillments (session_id, status, last_event_id)
        VALUES ($1, 'failed', $2)
        ON CONFLICT (session_id) DO NOTHING
        RETURNING session_id
        `,
        [sessionId, eventId || null]
    );

    return { recorded: res.rowCount === 1 };
}
