import { NextResponse } from "next/server";
import { instagramCache as cache } from "@/lib/instagramCache";

/**
 * API route handler to fetch the latest Instagram posts.
 *
 * Uses the Instagram Graph API to retrieve up to 10 recent media items
 * including their ID, caption, media type, media URL, thumbnail, permalink, and timestamp.
 *
 * @returns {NextResponse} JSON response containing the media data or an error message.
 * @route GET /api/instagram-feed
 */
export async function GET() {
    const now = Date.now();

    // Check if the cache is still valid
    if (cache.data && now - cache.timestamp < cache.ttl) {
        return NextResponse.json(cache.data);
    }

    // Retrieve the Instagram access token from environment variables
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    // Construct the Instagram Graph API URL to fetch recent media posts
    const instagramURL = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=10&access_token=${token}`;

    try {
        // Attempt to fetch data from the Instagram API
        const res = await fetch(instagramURL);
        const data = await res.json();

        // If the response is not ok or contains an error, return an error response
        if (!res.ok || data.error) {
            return NextResponse.json(
                { error: true, message: `Instagram API responded with ${res.status}` },
                { status: res.status }
            );
        }

        // Save to cache
        cache.data = data.data;
        cache.timestamp = now;

        // Return the array of Instagram media items in a successful JSON response
        return NextResponse.json(data.data);
    } catch (error) {
        // Log any unexpected error and return a 500 error response
        console.error("Instagram API error:", error);

        return NextResponse.json(
            { error: true, message: error.message || "Unexpected error" },
            { status: 500 }
        );
    }
}
