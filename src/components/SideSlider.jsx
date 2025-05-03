"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSlider } from "@/hooks/useSlider";

/**
 * SideSlider component displays a horizontally split slider with image on one side and text on the other.
 * On smaller screens, the layout stacks vertically.
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
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden flex flex-col md:flex-row bg-white min-h-[500px] border border-black">
      {/* Static Text Section */}
      <div className="w-full md:w-1/2 flex items-center p-6 md:p-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-base md:text-lg text-gray-700">{description}</p>
        </div>
      </div>

      {/* Slider Image Section */}
      <div className="relative w-full md:w-1/2 h-[300px] md:h-auto md:min-h-[500px]">
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
      <div className="absolute bottom-4 right-4 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <Button
            variant="noOutline"
            size="icon"
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}