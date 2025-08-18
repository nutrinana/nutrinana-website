import { readCookie } from "./readCookie";
import { parseCookieConsent } from "./parseCookieConsent";

/**
 * Builds the consent state from the CookieConsent cookie and the Cookiebot consent object.
 * It merges the parsed cookie consent with the Cookiebot consent state,
 * ensuring that necessary, preferences, statistics, and marketing flags are correctly set.
 *
 * @returns {Object} The consent state object containing:
 * - {boolean} necessary - Whether necessary cookies are accepted.
 * - {boolean} preferences - Whether preference cookies are accepted.
 * - {boolean} statistics - Whether statistics cookies are accepted.
 * - {boolean} marketing - Whether marketing cookies are accepted.
 * - {string} stamp - The consent ID.
 * - {string} utc - The UTC timestamp of the consent.
 * - {string} version - The version of the consent.
 * - {string} [consentLanguage] - The language of the consent.
 * - {string} [consentType] - The type of consent.
 * - {string} [consentDescription] - The description of the consent.
 * - {string} [consentUrl] - The URL for more information about the consent
 */
export function buildConsentState() {
    const val = readCookie("CookieConsent");
    const parsed = parseCookieConsent(val) || {};
    const cb = typeof window !== "undefined" ? window.Cookiebot : undefined;
    const cbc = cb?.consent;
    return {
        ...parsed,
        necessary: typeof cbc?.necessary === "boolean" ? cbc.necessary : parsed.necessary,
        preferences: typeof cbc?.preferences === "boolean" ? cbc.preferences : parsed.preferences,
        statistics: typeof cbc?.statistics === "boolean" ? cbc.statistics : parsed.statistics,
        marketing: typeof cbc?.marketing === "boolean" ? cbc.marketing : parsed.marketing,
    };
}
