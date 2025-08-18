/**
 * Function to group cookies by their category.
 *
 * @param {Array} cookies - The list of cookies to group.
 * @returns {Object} An object with categories as keys and arrays of cookies as values.
 * - 1: Necessary cookies
 * - 2: Preferences cookies
 * - 3: Statistics cookies
 * - 4: Marketing cookies
 * - 5: Unclassified cookies
 */
export function groupCookiesByCategory(cookies) {
    const buckets = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    for (const c of cookies) {
        const cat = parseInt(c?.category ?? 5, 10);
        if (buckets[cat]) {
            buckets[cat].push(c);
        } else {
            buckets[5].push(c);
        }
    }

    return buckets;
}
