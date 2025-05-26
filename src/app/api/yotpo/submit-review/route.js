export async function POST(req) {
    const APP_KEY = process.env.YOTPO_STORE_ID;
    const { searchParams } = new URL(req.url);

    if (!APP_KEY) {
        return new Response(JSON.stringify({ message: 'Yotpo app key not configured' }), {
        status: 500,
        });
    }

    try {
        const body = await req.json();

        const {
            sku,
            product_title,
            product_url,
            display_name,
            email,
            review_content,
            review_title,
            review_score,
        } = body;

        const reviewData = {
            appkey: APP_KEY,
            // sku: 'NUTR-GRAN',
            // product_title: 'Nutrinana\'s Activated Granola',
            // product_url: 'https://www.nutrinana.co.uk/activated-granola',
            // display_name: 'Jon Smith',
            // email: 'tanaya27@live.co.uk',
            // review_content:'So Good 123',
            // review_title:'Buy This',
            // review_score: 5,
            sku,
            product_title,
            product_url,
            display_name,
            email,
            review_content,
            review_title,
            review_score,
            
        };

        const yotpoResponse = await fetch(`https://api.yotpo.com/v1/widget/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (!yotpoResponse.ok) {
            const err = await yotpoResponse.text();
            return new Response(JSON.stringify({ message: 'Review submission failed', err }), { status: 500 });
        }

        const result = await yotpoResponse.json();
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Unexpected error', error: error.message }), { status: 500 });
    }
}