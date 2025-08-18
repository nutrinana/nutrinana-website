import { useEffect, useState } from "react";

/**
 * Custom hook to get the current window width.
 * It listens for resize events and updates the width state accordingly.
 *
 * @param {number} defaultWidth - The default width to use if window is not defined (e.g., during server-side rendering).
 *
 * @returns {number} The current window width.
 */
export default function useWindowWidth(defaultWidth = 1024) {
    // Initialize state with the current window width or a default value
    const [width, setWidth] = useState(
        typeof window === "undefined" ? defaultWidth : window.innerWidth
    );

    // Effect to update the width state on window resize
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Return the current window width
    return width;
}
