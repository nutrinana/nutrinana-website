import { useState, useEffect } from "react";

/**
 * Custom hook to manage auto-rotation of an index.
 *
 * @hook
 *
 * @param {number} length - The length of the items to rotate through.
 * @param {number} intervalMs - The interval in milliseconds for auto-rotation.
 *
 * @returns {[number, function]} - The current index and a function to pause/resume rotation.
 */
export function useAutoRotateIndex(length, intervalMs = 7000) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || length <= 1) {
            return;
        }
        const t = setInterval(() => setIndex((i) => (i + 1) % length), Math.max(2500, intervalMs));

        return () => clearInterval(t);
    }, [paused, intervalMs, length]);

    return [index, setPaused];
}
