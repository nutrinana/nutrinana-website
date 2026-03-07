import crypto from "crypto";

import { instagramCache as cache } from "@/lib/instagramCache";

/**
 * Verifies the webhook subscription request from Instagram.
 *
 * Responds with the challenge value if the mode and verify token are correct.
 *
 * @route GET /api/instagram-webhook
 *
 * @param {Request} req - The incoming request object.
 *
 * @returns {Response} - The response containing the challenge or a forbidden status.
 */
export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
    }

    return new Response("Forbidden", { status: 403 });
}

/**
 * Handles incoming webhook events from Instagram.
 *
 * Logs the event body to the console and responds with a success status.
 *
 * @route POST /api/instagram-webhook
 *
 * @param {Request} req - The incoming request object.
 *
 * @returns {Response} - The response confirming receipt of the event.
 */
export async function POST(req) {
    const secret = process.env.INSTAGRAM_APP_SECRET;
    const signature = req.headers.get("x-hub-signature-256");

    if (!secret || !signature) {
        return new Response("Forbidden", { status: 403 });
    }

    const rawBody = Buffer.from(await req.arrayBuffer());
    const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

    if (signature !== expected) {
        return new Response("Forbidden", { status: 403 });
    }

    const body = JSON.parse(rawBody.toString());
    console.log("Received Instagram webhook event:", body);
    cache.data = null;
    cache.timestamp = null;

    return new Response("Event Received", { status: 200 });
}
