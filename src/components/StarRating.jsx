"use client";

import { useState } from "react";

import { Star } from "lucide-react";

/**
 * StarRating component.
 *
 * A component for displaying and selecting star ratings.
 *
 * @component
 *
 * @param {number} value - The current rating value (for controlled mode).
 * @param {function} onChange - Callback when a star is clicked (for interactive use).
 * @param {boolean} readonly - If true, stars are static (non-clickable).
 * @param {number} size - The size of the stars in pixels.
 *
 * @returns {JSX.Element} A star rating component with interactive stars.
 */
export default function StarRating({ value = 0, onChange, readonly = false, size = 32 }) {
    // State to manage hovered star for visual feedback
    const [hovered, setHovered] = useState(null);

    // Determine star size based on responsive prop
    const starSize = size === "responsive" ? undefined : size;
    const responsiveClass = size === "responsive" ? "w-8 h-8 sm:w-12 sm:h-12" : "";

    // Handle click on a star
    const handleClick = (star) => {
        if (readonly || !onChange) {
            return;
        }
        onChange(star);
    };

    // Handle hover on a star
    const handleHover = (star) => {
        if (!readonly) {
            setHovered(star);
        }
    };

    return (
        <div className="flex gap-1">
            {/* Map through star numbers to create star elements */}
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = hovered ? star <= hovered : star <= value;
                const opacity = filled ? "opacity-100" : "opacity-30";

                return (
                    <span
                        key={star}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => handleHover(star)}
                        onMouseLeave={() => setHovered(null)}
                        className={`cursor-pointer text-yellow-400 ${opacity} transition-all duration-200 ease-in-out hover:scale-110 hover:opacity-100`}
                    >
                        <Star size={starSize} fill="currentColor" className={responsiveClass} />
                    </span>
                );
            })}
        </div>
    );
}
