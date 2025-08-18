import { useState, useEffect } from "react";

/**
 * Custom React hook for cycling through an array of banner messages.
 *
 * @param {string[]} messages - An array of messages to cycle through.
 * Each message can include text, a link, link text, and emojis.
 * @param {number} [intervalTime=5000] - Time interval in milliseconds for automatic message switching.
 *
 * @returns {Object} - Object containing the current message index and functions to navigate.
 * @returns {number} CurrentIndex - The index of the currently displayed message.
 * @returns {function} PrevMessage - Function to navigate to the previous message.
 * @returns {function} NextMessage - Function to navigate to the next message.
 */
export function useBanner(messages, intervalTime = 5000) {
    // State to keep track of the current message index
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Automatically switch to the next message at specified intervals
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, intervalTime);

        // Clear the interval when the component unmounts or messages change
        return () => clearInterval(interval);
    }, [messages, intervalTime]);

    /**
     * Function to navigate to the previous message.
     * If the current index is 0, it wraps around to the last message.
     */
    const prevMessage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? messages.length - 1 : prevIndex - 1));
    };

    /**
     * Function to navigate to the next message.
     * If the current index is the last message, it wraps around to the first message.
     */
    const nextMessage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    };

    return { currentIndex, prevMessage, nextMessage };
}
