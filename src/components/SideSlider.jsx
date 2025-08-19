"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useSlider } from "@/hooks/useSlider";

/**
 * SideSlider component displays a horizontally split slider with image on one side and text on the other.
 *
 * On smaller screens, the layout stacks vertically.
 *
 * @component
 *
 * @param {Object[]} slides - Array of slide objects.
 * @param {string} [slides[].image] - URL of the slide image.
 * @param {string} [slides[].alt] - Alt text for the slide image.
 * @param {string} title - Title text for the static text section.
 * @param {string} description - Body text or subtitle for the static text section.
 *
 * @returns {JSX.Element} A side-by-side image slider with navigation dots.
 */
export default function SideSlider({ slides = [], title, description }) {
    const { currentSlide, goToSlide } = useSlider(slides.length);

    return (
        <div className="relative mx-auto flex min-h-[500px] w-full max-w-6xl flex-col overflow-hidden border border-black bg-white md:flex-row">
            {/* Static Text Section */}
            <div className="flex w-full items-center p-6 md:w-1/2 md:p-10">
                <div>
                    <h2 className="mb-4 text-2xl font-bold md:text-3xl">{title}</h2>
                    <p className="text-base text-gray-700 md:text-lg">{description}</p>
                </div>
            </div>

            {/* Slider Image Section */}
            <div className="relative h-[300px] w-full md:h-auto md:min-h-[500px] md:w-1/2">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.alt || `Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="absolute right-4 bottom-4 z-30 flex space-x-2">
                {slides.map((_, index) => (
                    <Button
                        variant="noOutline"
                        size="icon"
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full ${
                            index === currentSlide ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
