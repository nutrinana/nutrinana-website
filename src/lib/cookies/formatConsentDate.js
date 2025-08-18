/**
 * Formats a date string into a human-readable format.
 * This function takes a date string, converts it to a Date object,
 * and formats it to a string like "Month Day, Year at HH:MM AM/PM".
 *
 * @param {string} dateStr - The date string to format.
 *
 * @returns {string|null} The formatted date string or null if the input is invalid.
 */
export function formatConsentDate(dateStr) {
    if (!dateStr) {
        return null;
    }

    try {
        const d = new Date(dateStr);
        const month = d.toLocaleString("default", { month: "long" });
        const day = d.getDate();
        const year = d.getFullYear();

        let time = d.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

        time = time.replace(/\s?(am|pm)$/i, (m) => m.toUpperCase());

        return `${month} ${day}, ${year} at ${time}`;
    } catch {
        return null;
    }
}
