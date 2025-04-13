/**
 * Verifies the webhook subscription request from Instagram.
 * Responds with the challenge value if the mode and verify token are correct.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Response} - The response containing the challenge or a forbidden status.
 */
export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
    } else {
        return new Response('Forbidden', { status: 403 });
    }
}

/**
 * Handles incoming webhook events from Instagram.
 * Logs the event body to the console and responds with a success status.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Response} - The response confirming receipt of the event.
 */
export async function POST(req) {
    const body = await req.json();
    console.log('Received Instagram webhook event:', body);

    // You can process or store this data here

    return new Response('Event Received', { status: 200 });
}