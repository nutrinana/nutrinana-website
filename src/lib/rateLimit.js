import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// 10 requests per minute for checkout
export const checkoutRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: "rl:checkout",
});

// 5 requests per hour for contact form
export const contactRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix: "rl:contact",
});

// 3 reviews per hour per IP
export const reviewRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    prefix: "rl:review",
});

/**
 * Get the client IP from the request headers.
 *
 * @param {Request} req - The incoming request object.
 *
 * @returns {string} - The client's IP address or "anonymous" if not available.
 */
export function getClientIp(req) {
    return (
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        "anonymous"
    );
}
