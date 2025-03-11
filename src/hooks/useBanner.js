import { useState, useEffect } from "react";

export function useBanner(messages, intervalTime = 5000) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [messages, intervalTime]);

    const prevMessage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? messages.length - 1 : prevIndex - 1));
    };

    const nextMessage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    };

    return { currentIndex, prevMessage, nextMessage };
}