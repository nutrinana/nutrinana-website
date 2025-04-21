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
  
export async function POST(req) {
    const body = await req.json();
    console.log('Received Instagram webhook event:', body);

    // You can process or store this data here

    return new Response('Event Received', { status: 200 });
}