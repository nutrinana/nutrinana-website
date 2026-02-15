import React from "react";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes conditionally using `clsx` and `tailwind-merge`.
 *
 * @util
 *
 * @param  {...any} inputs - Class names or conditional expressions.
 *
 * @returns {string} A single merged class name string.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Renders a string with newline characters (`\n`) as line breaks (`<br />`) in JSX.
 *
 * @util
 *
 * @param {string} text - The text to be rendered with line breaks.
 *
 * @returns {JSX.Element} A React fragment containing the text with line breaks.
 */
export function renderWithLineBreaks(text) {
    // Splits the text into lines and adds <br /> for each line
    return text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
}

/**
 * Formats a date string into specified format.
 *
 * @util
 *
 * @param {string} dateString - The ISO or UTC date string to format.
 * @param {string} format - The format string, e.g., "dd/mm/yyyy", "dd/mm/yy".
 *
 * @returns {string} Formatted date string.
 */
export function formatDate(dateString, format = "dd MMM yyyy") {
    const date = new Date(dateString);
    const formatMap = {
        "dd/mm/yyyy": { day: "2-digit", month: "2-digit", year: "numeric" },
        "dd/mm/yy": { day: "2-digit", month: "2-digit", year: "2-digit" },
        "dd MMM yy": { day: "2-digit", month: "short", year: "2-digit" },
        "dd MMM yyyy": { day: "2-digit", month: "short", year: "numeric" },
    };

    const options = formatMap[format];

    return date.toLocaleDateString("en-GB", options);
}

/**
 * Extracts hashtags from a given text string.
 *
 * @util
 *
 * @param {string} text - The text to extract hashtags from.
 *
 * @returns {string[]} Array of hashtags.
 */
export function extractHashtags(text) {
    if (!text) {
        return [];
    }

    return text.match(/#[a-zA-Z0-9_]+/g) || [];
}

/**
 * Formats a caption string by wrapping hashtags and mentions with styled spans.
 *
 * @util
 *
 * @param {string} caption - The Instagram caption to format.
 *
 * @returns {JSX.Element[]} Array of React elements with styled hashtags/mentions.
 */
export function formatCaption(caption) {
    return caption.split(/(\s+)/).map((word, index) => {
        if (word.startsWith("@") || word.startsWith("#")) {
            const match = word.match(/^([@#][\w_-]+(?:\.[\w_-]+)*)(['’]?[a-z]*)?(\W*)$/i);
            if (match) {
                return (
                    <React.Fragment key={index}>
                        <span style={{ color: "rgb(20, 54, 103)" }}>{match[1]}</span>
                        {match[2]}
                        {match[3]}
                    </React.Fragment>
                );
            }
        }

        return word;
    });
}

/**
 * Opens a given URL in a new browser tab.
 *
 * @util
 *
 * @param {string} url - The URL to open.
 */
export function openInNewTab(url) {
    if (!url) {
        return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Generates an order reference from a Stripe session ID.
 *
 * @util
 *
 * @param {string} sessionId - The Stripe session ID.
 *
 * @returns {string|null} The generated order reference or null if sessionId is invalid.
 */
export function generateOrderReferenceFromSessionId(sessionId) {
    if (!sessionId || typeof sessionId !== "string") {
        return null;
    }

    return `NUTR-${sessionId.slice(-8).toUpperCase()}`;
}

/**
 * Format minor currency units (e.g. pence) into a human-readable string.
 *
 * @util
 *
 * @param {number|string} minor - The amount in minor units (e.g. 1700 for £17.00).
 * @param {string} currency - The currency code (e.g. "gbp").
 *
 * @returns {string} - The formatted currency string (e.g. "£17.00") or a plain number string if currency is not recognized.
 */
export function formatMoneyFromMinor(minor, currency) {
    const n = Number(minor);
    if (!Number.isFinite(n)) {
        return "";
    }

    const cur = (currency || "gbp").toLowerCase();
    if (cur === "gbp") {
        return new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
        }).format(n / 100);
    }

    return String(n);
}

/**
 * Format the shipping address from Stripe session data into a multi-line string.
 *
 * @util
 *
 * @param {object} shipping - The shipping details object from Stripe session.
 *
 * @returns {string} - The formatted address string.
 */
export function formatShippingAddress(shipping) {
    const addr = shipping?.address || {};
    const parts = [
        shipping?.name,
        addr?.line1,
        addr?.line2,
        addr?.city,
        addr?.state,
        addr?.postalCode,
        addr?.country,
    ].filter((v) => typeof v === "string" && v.trim().length);

    return parts.join("\n");
}
