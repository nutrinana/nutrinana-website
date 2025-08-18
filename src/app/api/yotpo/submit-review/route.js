/**
 * API route to submit a product review to Yotpo.
 *
 * This route handles the submission of a review including product details and user feedback.
 *
 * @param {Request} req - The incoming request object.
 *
 * @returns {Response} - A JSON response containing the result of the review submission or an error message.
 * @route POST /api/yotpo/submit-review
 */
export async function POST(req) {
    // Ensure the Yotpo app key is configured in environment variables
    const APP_KEY = process.env.YOTPO_STORE_ID;

    // If the app key is not set, return an error response
    if (!APP_KEY) {
        return new Response(JSON.stringify({ message: "Yotpo app key not configured" }), {
            status: 500,
        });
    }

    try {
        // Parse the incoming request body as JSON
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
            sku,
            product_title,
            product_url,
            display_name,
            email,
            review_content,
            review_title,
            review_score,
        };

        // Validate required fields
        const yotpoResponse = await fetch(`https://api.yotpo.com/v1/widget/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
        });

        // Check if the Yotpo API response is successful
        if (!yotpoResponse.ok) {
            const err = await yotpoResponse.text();
            return new Response(JSON.stringify({ message: "Review submission failed", err }), {
                status: 500,
            });
        }

        // Parse the response from Yotpo and return it
        const result = await yotpoResponse.json();
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        // Handle any errors that occur during the process
        return new Response(JSON.stringify({ message: "Unexpected error", error: error.message }), {
            status: 500,
        });
    }
}
