/**
 * Parses a raw cookie consent string into an object.
 * The string is expected to be in a specific format, such as:
 * "stamp: '1234567890', necessary: true, preferences: false, statistics: true, marketing: false, utc: 1633036800"
 * This function extracts the values for each property and returns an object with those properties.
 *
 * @param {string} raw - The raw cookie consent string to parse.
 *
 * @returns {object|null} An object containing the parsed values or null if parsing fails.
 */
export function parseCookieConsent(raw) {
    if (!raw) {
        return null;
    }

    try {
        const decoded = decodeURIComponent(raw);

        const getBool = (key) => {
            const m = decoded.match(new RegExp(`${key}\\s*:\\s*(true|false)`));

            return m ? m[1] === "true" : undefined;
        };

        const stampMatch = decoded.match(/stamp\s*:\s*'([^']+)'/);
        const utcMatch = decoded.match(/utc\s*:\s*(\d{10,})/);

        return {
            stamp: stampMatch ? stampMatch[1] : undefined,
            necessary: getBool("necessary"),
            preferences: getBool("preferences"),
            statistics: getBool("statistics"),
            marketing: getBool("marketing"),
            utc: utcMatch ? Number(utcMatch[1]) : undefined,
            raw: decoded,
        };
    } catch {
        return null;
    }
}
