import { readCookie } from "./readCookie";
import { parseCookieConsent } from "./parseCookieConsent";

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