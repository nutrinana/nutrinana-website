import { useState, useEffect } from "react";

/**
 * Custom hook for rotating through a list of items.
 *
 * @hook
 *
 * @param {number} length - The number of items to rotate through.
 * @param {number} intervalMs - The interval in milliseconds for auto-rotation (default: 6000).
 *
 * @returns An array containing the current index and a function to set the index.
 */
export function useRotatingCard(length, intervalMs = 6000) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setIndex((i) => (i + 1) % length), Math.max(2000, intervalMs));

        return () => clearInterval(t);
    }, [length, intervalMs]);

    return [index, setIndex];
}
