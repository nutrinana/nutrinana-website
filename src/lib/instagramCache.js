/**
 * Instagram Cache.
 *
 * This module provides a simple in-memory cache for storing Instagram feed responses.
 * It is designed to be used by both the API route and webhook route to ensure cache consistency.
 *
 * @util cache
 *
 * @returns {Object} The cache object with data, timestamp, and TTL.
 */
export const instagramCache = {
    data: null,
    timestamp: null,
    ttl: 5 * 60 * 1000, // 5 minutes
};
