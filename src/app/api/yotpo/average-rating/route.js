/**
 * API route to fetch the average product rating from Yotpo.
 *
 * This route retrieves the average score for a product based on its external ID.
 *
 * @param {Request} req - The incoming request object.
 *
 * @returns {Response} - A JSON response containing the average score or an error message.
 * @route GET /api/yotpo/average-rating?productId=${externalId}
 */
export async function GET(req) {
    const appKey = process.env.YOTPO_STORE_ID;
    const { searchParams } = new URL(req.url);
    const externalId = searchParams.get("productId");

    // Check if the Yotpo app key is configured
    if (!appKey) {
        return new Response(JSON.stringify({ message: "Yotpo app key not configured" }), {
            status: 500,
        });
    }

    // Check if the externalId is provided
    if (!externalId) {
        return new Response(JSON.stringify({ message: "Missing productId parameter" }), {
            status: 400,
        });
    }

    // Fetch the average rating from Yotpo API
    const ratingRes = await fetch(
        `https://api-cdn.yotpo.com/products/${appKey}/${externalId}/bottomline`
    );

    // Check if the response is ok
    if (!ratingRes.ok) {
        const err = await ratingRes.text();
        return new Response(JSON.stringify({ message: "Failed to fetch star rating data", err }), {
            status: 500,
        });
    }

    // Parse the response and extract the average score
    const ratingData = await ratingRes.json();
    const averageScore = ratingData?.response?.bottomline?.average_score ?? null;

    return new Response(JSON.stringify({ average_score: averageScore }), { status: 200 });
}
