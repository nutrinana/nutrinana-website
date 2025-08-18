/**
 * This API route fetches the latest 9 reviews (of a score of 5) from Yotpo using the Yotpo API.
 *
 * This endpoint is designed to be called from the client-side to display recent reviews on the website.
 * It first generates an access token (utoken) using the store ID and API secret,
 * then uses that token to fetch the latest reviews from Yotpo's review filter endpoint.
 *
 * @returns {Response} - A JSON response containing the latest reviews or an error message.
 * @route GET /api/yotpo/recent-reviews
 */
export async function GET() {
    const appKey = process.env.YOTPO_STORE_ID;
    const secret = process.env.YOTPO_API_SECRET;

    // Check if Yotpo credentials are configured
    if (!appKey || !secret) {
        return new Response(JSON.stringify({ message: "Yotpo credentials not configured" }), {
            status: 500,
        });
    }

    try {
        // Step 1: Generate utoken
        const tokenRes = await fetch(
            `https://api.yotpo.com/core/v3/stores/${appKey}/access_tokens`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secret }),
            }
        );

        if (!tokenRes.ok) {
            const err = await tokenRes.json();
            return new Response(JSON.stringify({ message: "Failed to generate utoken", err }), {
                status: 500,
            });
        }

        const { access_token: utoken } = await tokenRes.json();

        // Step 2: Fetch reviews from Yotpo using POST filter endpoint
        const reviewRes = await fetch(
            `https://api-cdn.yotpo.com/v1/reviews/${appKey}/filter.json?utoken=${utoken}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sortings: [
                        {
                            sort_by: "date",
                            ascending: false,
                        },
                    ],
                    scores: [5],
                    per_page: 9,
                }),
                next: { revalidate: 3600 }, // Revalidate every 1 hour
            }
        );

        // Check if the response is ok
        if (!reviewRes.ok) {
            const err = await reviewRes.text();
            return new Response(JSON.stringify({ message: "Failed to fetch reviews", err }), {
                status: 500,
            });
        }

        // Parse the response to get the reviews
        const reviewData = await reviewRes.json();

        // Return the latest reviews
        return new Response(JSON.stringify({ reviews: reviewData?.response?.reviews ?? [] }), {
            status: 200,
        });
    } catch (error) {
        // Log and handle any unexpected errors
        console.error("Error fetching recent reviews:", error);
        return new Response(JSON.stringify({ message: "Unexpected error", error: error.message }), {
            status: 500,
        });
    }
}
