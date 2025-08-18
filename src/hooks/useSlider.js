import { useState, useEffect } from "react";

/**
 * Custom hook to manage a slider component.
 * It provides the API of the slider, the current index of the selected item,
 * and the total count of items in the slider.
 *
 * @param {number} length - The total number of slides in the slider.
 * @param {number} [interval=5000] - The time interval for automatic slide change (in milliseconds).
 * @returns {Object} - Contains:
 * - currentSlide: The current index of the selected item (0-indexed).
 * - goToNextSlide: Function to go to the next slide.
 * - goToSlide: Function to go to a specific slide by index.
 */
export function useSlider(length, interval = 5000) {
    // State to hold the current slide index
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % length);
        }, interval);

        // Clear the interval on component unmount and when length or interval changes
        return () => clearInterval(timer);
    }, [length, interval]);

    /**
     * Function to go to the next slide.
     */
    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % length);
    };

    /**
     * Function to go to a specific slide by index.
     * @param {number} index - The index of the slide to go to (0-indexed).
     */
    const goToSlide = (index) => {
        if (index >= 0 && index < length) {
            setCurrentSlide(index);
        }
    };

    return { currentSlide, goToNextSlide, goToSlide };
}
