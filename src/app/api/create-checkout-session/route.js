import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-12-15.clover" });

/**
 *  API Route to create a Stripe Checkout Session
 *
 * This route handles POST requests to create a Stripe Checkout session
 * for a one-off purchase. It responds with the URL to redirect the user
 * to Stripe Checkout.
 *
 * @route POST /api/create-checkout-session
 *
 * @returns {NextResponse} JSON response containing the Checkout URL
 */
export async function POST() {
    const domain = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // TODO: Replace with your real one-off PRICE ID or lookup key approach later
                price: process.env.STRIPE_ONE_OFF_PRICE_ID,
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${domain}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}/cart`,
        // automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url });
}
