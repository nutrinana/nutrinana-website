import { NextResponse } from "next/server";

/**
 * API route handler to refresh the Instagram access token.
 * Uses the Instagram Graph API to refresh the access token
 * and returns the new token if successful.
 * 
 * @returns {NextResponse} JSON response containing the new access token or an error message.
 * @route GET /api/instagram-refresh-token
 */
export async function GET() {
    // Retrieve the Instagram access token from environment variables
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        // If the response is not ok or contains an error, return an error response
        if (!res.ok || !data.access_token) {
            return NextResponse.json({ error: true, data }, { status: res.status });
        }

        return NextResponse.json({ success: true, new_token: data.access_token });
    }
    catch (error) {
        return NextResponse.json({ error: true, message: err.message }, { status: 500 });
    }
}