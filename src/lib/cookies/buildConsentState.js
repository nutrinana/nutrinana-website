import { parseCookieConsent } from "@/lib/cookies/parseCookieConsent";
import { readCookie } from "@/lib/cookies/readCookie";

/**
 * Builds the consent state from the CookieConsent cookie and the Cookiebot consent object.
 *
 * It merges the parsed cookie consent with the Cookiebot consent state,
 * ensuring that necessary, preferences, statistics, and marketing flags are correctly set.
 *
 * @util cookies
 *
 * @returns {Object} The consent state object containing.
 * @returns {boolean} Necessary - Whether necessary cookies are accepted.
 * @returns {boolean} Preferences - Whether preference cookies are accepted.
 * @returns {boolean} Statistics - Whether statistics cookies are accepted.
 * @returns {boolean} Marketing - Whether marketing cookies are accepted.
 * @returns {string} Stamp - The consent ID.
 * @returns {string} Utc - The UTC timestamp of the consent.
 * @returns {string} Version - The version of the consent.
 * @returns {string} [consentLanguage] - The language of the consent.
 * @returns {string} [consentType] - The type of consent.
 * @returns {string} [consentDescription] - The description of the consent.
 * @returns {string} [consentUrl] - The URL for more information about the consent.
 */
export function buildConsentState() {
    const val = readCookie("CookieConsent");
    const parsed = parseCookieConsent(val) || {};
    const cb = typeof window === "undefined" ? undefined : window.Cookiebot;
    const cbc = cb?.consent;

    return {
        ...parsed,
        necessary: typeof cbc?.necessary === "boolean" ? cbc.necessary : parsed.necessary,
        preferences: typeof cbc?.preferences === "boolean" ? cbc.preferences : parsed.preferences,
        statistics: typeof cbc?.statistics === "boolean" ? cbc.statistics : parsed.statistics,
        marketing: typeof cbc?.marketing === "boolean" ? cbc.marketing : parsed.marketing,
    };
}
