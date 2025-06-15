export async function GET() {
    const appKey = process.env.YOTPO_STORE_ID;
    const secret = process.env.YOTPO_API_SECRET;

    if (!appKey || !secret) {
        return new Response(JSON.stringify({ message: 'Yotpo credentials not configured' }), {
            status: 500,
        });
    }

    try {
        // Step 1: Generate utoken
        const tokenRes = await fetch(`https://api.yotpo.com/core/v3/stores/${appKey}/access_tokens`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secret }),
        });

        if (!tokenRes.ok) {
            const err = await tokenRes.json();
            return new Response(JSON.stringify({ message: 'Failed to generate utoken', err }), {
                status: 500,
            });
        }

        const { access_token: utoken } = await tokenRes.json();

        // Step 2: Fetch reviews from Yotpo using POST filter endpoint
        const reviewRes = await fetch(
            `https://api-cdn.yotpo.com/v1/reviews/${appKey}/filter.json?utoken=${utoken}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sortings: [
                        {
                            sort_by: "date",
                            ascending: false
                        }
                    ],
                    scores: [5],
                    per_page: 9,
                }),
                next: { revalidate: 3600 } // Revalidate every 1 hour
            }
        );

        if (!reviewRes.ok) {
            const err = await reviewRes.text();
            return new Response(JSON.stringify({ message: 'Failed to fetch reviews', err }), {
                status: 500,
            });
        }

        const reviewData = await reviewRes.json();
        console.log('Fetched reviews JSON:', JSON.stringify(reviewData, null, 2));

        // Return the latest 5 reviews
        return new Response(JSON.stringify({ reviews: reviewData?.response?.reviews ?? [] }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Unexpected error', error: error.message }), {
            status: 500,
        });
    }
}
