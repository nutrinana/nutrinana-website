import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // avoid caching of response in Next.js

/**
 * Cookiebot API route to fetch cookie declaration data.
 *
 * This route retrieves cookies for a specified domain and culture
 * from the Cookiebot API and returns them in a structured format.
 *
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The JSON response containing cookie data or an error message.
 * @route GET /api/cookiebot
 */
export async function GET(request) {
    try {
        const apiKey = process.env.COOKIEBOT_API_KEY;
        const serial = process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID;

        const { searchParams } = new URL(request.url);
        const culture = (searchParams.get("culture") || "default").toLowerCase();

        // Determine the domain from query parameter, environment variable, or request header
        const qpDomain = searchParams.get("domain");
        const envDomain = process.env.NEXT_PUBLIC_SITE_DOMAIN;
        const hostHeader = request.headers.get("host") || "";
        const headerDomain = hostHeader.split(":")[0];
        const domain = qpDomain || envDomain || headerDomain;

        // Validate required environment variables
        if (!apiKey || !serial) {
            return jsonError(
                "Missing COOKIEBOT_API_KEY or NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID env variables.",
                500,
                {
                    hint: "Set both env vars in your environment and redeploy.",
                }
            );
        }

        if (!domain) {
            return jsonError(
                "Missing domain. Provide ?domain=www.example.com or set NEXT_PUBLIC_SITE_DOMAIN.",
                400
            );
        }

        const endpoint = `https://consent.cookiebot.com/api/v1/${encodeURIComponent(apiKey)}/json/domaingroup/${encodeURIComponent(serial)}/${encodeURIComponent(culture)}/domain/${encodeURIComponent(domain)}/cookies`;

        const res = await fetch(endpoint, {
            headers: { Accept: "application/json" },
            cache: "no-store",
        });

        if (!res.ok) {
            const body = await res.text();

            return jsonError("Failed to fetch data from Cookiebot.", 502, {
                statusText: res.statusText,
                statusCode: res.status,
                endpoint,
                bodySample: body?.slice(0, 500),
            });
        }

        const data = await res.json();

        // Normalise casing in the API (Cookiebot sometimes uses PascalCase keys)
        const cookies = Array.isArray(data.cookies) ? data.cookies : [];

        // Shape the cookies to a consistent format
        const shaped = cookies.map((c) => ({
            name: c.Name || "",
            provider: c.Provider || "",
            purpose: c.PurposeDescription || "",
            maxStorageDuration: c.ExpireDescription || "",
            type: c.TrackerTypeAbbr || c.TrackerTypeName || "",
            category: c.Category ?? "",
            httpOnly: c.HTTPOnly === "1",
            secure: c.Secure === "1",
            thirdParty: c.ThirdParty === "1",
            persistent: c.Persistent === "1",
        }));

        return NextResponse.json({
            domain: data.domain || domain,
            urlpath: data.urlpath || data.Urlpath || "/",
            scannedAt: data.utcscandate || data.UtcScandate || null,
            culture: data.culture || culture,
            count: shaped.length,
            cookies: shaped,
        });
    } catch (err) {
        return jsonError("Unexpected error while building Cookie Declaration payload.", 500, {
            message: err?.message,
            stack: process.env.NODE_ENV === "development" ? err?.stack : undefined,
        });
    }
}

/**
 * Helper function to create a JSON error response.
 *
 * @param {string} message - The error message to include in the response.
 * @param {number} [status=500] - The HTTP status code for the response
 * @param {object} [extra={}] - Additional data to include in the response.
 * @return {NextResponse} - The JSON response with the error message and status code.
 */
function jsonError(message, status = 500, extra = {}) {
    return NextResponse.json({ error: message, ...extra }, { status });
}
