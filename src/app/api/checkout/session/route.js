import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-12-15.clover",
});

/**
 * API route to fetch details of a Stripe checkout session.
 *
 * @route GET /api/checkout/session
 *
 * @param {Request} req - The incoming request object.
 *
 * @returns {Promise<NextResponse>} - A JSON response containing session details or an error message.
 */
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json({ error: "Missing session_id parameter" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items", "line_items.data.price.product"],
        });

        const orderData = {
            id: session.id,
            amountTotal: session.amount_total,
            amountSubtotal: session.amount_subtotal,
            amountShipping: session.total_details?.amount_shipping || 0,
            amountTax: session.total_details?.amount_tax || 0,
            currency: session.currency,
            customerEmail: session.customer_details?.email,
            customerName: session.customer_details?.name,
            paymentStatus: session.payment_status,
            items:
                session.line_items?.data.map((item) => ({
                    id: item.id,
                    name: item.description || item.price?.product?.name || "Product",
                    quantity: item.quantity,
                    amount: item.amount_total,
                    unitPrice: item.price?.unit_amount,
                    currency: item.currency,
                })) || [],
        };

        return NextResponse.json(orderData);
    } catch (error) {
        console.error("Error fetching checkout session:", error);

        return NextResponse.json({ error: "Failed to fetch session details" }, { status: 500 });
    }
}
