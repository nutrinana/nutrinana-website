/**
 * Generate a Yotpo access token
 *
 * This function handles POST requests to generate a Yotpo access token.
 * It retrieves the store ID and secret from environment variables,
 * validates them, and then makes a request to Yotpo's API to obtain the token.
 * If successful, it returns the token; otherwise, it handles errors appropriately.
 *
 * @param {Request} req - The incoming request object
 * @returns {Response} - A JSON response containing the access token or an error message
 * @route POST /api/yotpo/generate-utoken
 */
export async function POST(req) {
    // Retrieve Yotpo credentials from environment variables
    const storeId = process.env.YOTPO_STORE_ID;
    const secret = process.env.YOTPO_API_SECRET;

    // Validate required credentials
    if (!storeId || !secret) {
        return new Response(JSON.stringify({ message: "Yotpo credentials not configured" }), {
            status: 500,
        });
    }

    try {
        // Request a new access token from Yotpo
        const yotpoRes = await fetch(
            `https://api.yotpo.com/core/v3/stores/${storeId}/access_tokens`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secret }),
            }
        );

        // Handle failed request to Yotpo
        if (!yotpoRes.ok) {
            const error = await yotpoRes.json();
            return new Response(JSON.stringify({ message: "Yotpo request failed", error }), {
                status: yotpoRes.status,
            });
        }

        // Return access token on success
        const data = await yotpoRes.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        // Log and return internal error response
        console.error("Yotpo token generation error:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
        });
    }
}
