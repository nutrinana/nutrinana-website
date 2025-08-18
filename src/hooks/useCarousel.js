import { useState, useEffect } from "react";

/**
 * Custom hook to manage a carousel component.
 * It provides the API of the carousel, the current index of the selected item,
 * and the total count of items in the carousel.
 *
 * @returns {Object} - Contains:
 *  - api: The carousel API instance.
 * - setApi: Function to set the API.
 * - current: The current index of the selected item (1-indexed).
 * - count: The total count of items in the carousel (total number of slides).
 */
export default function useCarousel() {
    // State to hold the carousel API, current index, and total count
    const [api, setApi] = useState(null);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        // Initialise the current index and total slide count
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        // Update the current index when the selected slide changes
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return { api, setApi, current, count };
}
