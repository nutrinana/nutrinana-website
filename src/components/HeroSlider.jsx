"use client";

import Image from "next/image";
import { useSlider } from "@/hooks/useSlider";
import { Button } from "@/components/ui/button";

export default function HeroSlider({ slides = [] }) {
  const { currentSlide, goToNextSlide } = useSlider(slides.length);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-20 z-20 text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-lg md:text-2xl mb-6 max-w-xl">
              {slide.subtitle}
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              {slide.buttonText}
            </Button>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}