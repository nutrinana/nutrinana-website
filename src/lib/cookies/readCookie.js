/**
 * Reads a cookie by name from the document's cookies.
 * It uses a regular expression to find the cookie value.
 *
 * @param {string} name - The name of the cookie to read.
 *
 * @returns {string|null} The value of the cookie or null if not found.
 */
export function readCookie(name) {
    const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));

    return m ? m[1] : null;
}
