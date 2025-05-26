"use client";

import { useState } from "react";
import { Star } from "lucide-react";

/**
 * StarRating component
 * @param {number} value - The current rating value (for controlled mode)
 * @param {function} onChange - Callback when a star is clicked (for interactive use)
 * @param {boolean} readonly - If true, stars are static (non-clickable)
 * @param {number} size - The size of the stars in pixels
 */
export default function StarRating({ value = 0, onChange, readonly = false, size = 32 }) {
    const [hovered, setHovered] = useState(null);

    const handleClick = (star) => {
        if (readonly || !onChange) return;
        onChange(star);
    };

    const handleHover = (star) => {
        if (!readonly) setHovered(star);
    };

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = hovered ? star <= hovered : star <= value;
                const opacity = filled ? "opacity-100" : "opacity-30"; // Full opacity if filled, low otherwise
                return (
                <span
                    key={star}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => handleHover(star)}
                    onMouseLeave={() => setHovered(null)}
                    className={`cursor-pointer text-yellow-500 ${opacity} hover:opacity-100 hover:scale-110 transition-all duration-200 ease-in-out`}
                >
                    <Star size={size} fill="currentColor" />
                </span>
                );
            })}
        </div>
    );
}