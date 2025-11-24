"use client";

import Image from "next/image";
import { useSwipeable } from "react-swipeable";

import { Button } from "@/components/ui/button";
import { useSlider } from "@/hooks/useSlider";

/**
 * HeroSlider component for displaying a fullscreen image carousel with overlay content.
 *
 * Each slide contains an image, a title, a subtitle, and a button that links to a specified URL.
 * The slider transitions automatically and includes clickable pagination dots.
 *
 * @component
 *
 * @param {Object[]} slides - Array of slide objects.
 * @param {string} slides[].image - URL of the slide image.
 * @param {string} slides[].title - Title text shown on the slide.
 * @param {string} slides[].subtitle - Subtitle text shown on the slide.
 * @param {string} slides[].buttonText - Text to display in the call-to-action button.
 * @param {string} [slides[].buttonLink] - Optional URL or page the button should link to.
 *
 * @returns {JSX.Element} A full-width, animated image slider component.
 */
export default function HeroSlider({ slides = [] }) {
    // Custom hooks to manage the slider state and transitions
    const { currentSlide, goToSlide } = useSlider(slides.length);
    const handlers = useSwipeable({
        onSwipedLeft: () => goToSlide((currentSlide + 1) % slides.length),
        onSwipedRight: () => goToSlide((currentSlide - 1 + slides.length) % slides.length),
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        trackMouse: false,
    });

    // Container for the entire hero slider
    return (
        <div {...handlers} className="relative h-[600px] w-full overflow-hidden">
            {/* Slider content, loop through slides and display each one*/}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {/* Slide image */}
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        style={{ objectPosition: slide.objectPosition || "center" }}
                    />
                    {/* Overlay for darkening the image*/}
                    <div className="bg-raisin/40 absolute inset-0 z-10" />

                    {/* Text content and CTA button overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col items-start justify-center p-8 text-white md:p-20">
                        <h2 className="font-script mb-4 text-4xl font-bold md:text-6xl">
                            {slide.title}
                        </h2>
                        <p className="mb-6 max-w-xl text-lg md:text-2xl">{slide.subtitle}</p>
                        <Button
                            variant="green"
                            size="smaller"
                            onClick={() => (window.location.href = slide.buttonLink || "#")}
                        >
                            {slide.buttonText}
                        </Button>
                    </div>
                </div>
            ))}
            {/* Pagination Dots for manual navigation */}
            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 transform space-x-2">
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
