import { useState, useEffect } from "react";

export function useSlider(length, interval = 5000) {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % length);
        }, interval);
        
        return () => clearInterval(timer);
    }, [length, interval]);
    
    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % length);
    };

    const goToSlide = (index) => {
        if (index >= 0 && index < length) {
            setCurrentSlide(index);
        }
    };
    
    return { currentSlide, goToNextSlide, goToSlide };
}
