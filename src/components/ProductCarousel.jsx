"use client";

import ProductCard from "@/components/ProductCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import useCarousel from "@/hooks/useCarousel";

/**
 * ProductCarousel component that displays a list of products in a carousel format.
 *
 * Each product is represented by a ProductCard component.
 * The carousel allows users to navigate through the products using next and previous buttons.
 * The current slide number and total count of slides are displayed below the carousel.
 *
 * @component
 *
 * @param {Object[]} products - Array of product objects to be displayed in the carousel.
 * Each product object should contain properties that ProductCard can accept.
 *
 * @returns {JSX.Element} The rendered ProductCarousel component.
 */
export default function ProductCarousel({ products }) {
    // Custom hook to manage carousel state
    // It provides the API for the carousel, current slide index, and total count of slides
    const { api, setApi, current, count } = useCarousel();

    return (
        <div className="relative mx-auto w-full max-w-6xl">
            {/* Carousel component to display products */}
            <Carousel setApi={setApi} className="overflow-visible">
                <CarouselContent className="-ml-1 flex overflow-visible pb-6">
                    {products.map((product, index) => (
                        // Each CarouselItem wraps a single ProductCard
                        <CarouselItem
                            key={index}
                            className="flex-shrink-0 overflow-visible pl-1 md:w-[50%] lg:w-[33.333%] xl:w-[25%]"
                        >
                            <ProductCard {...product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Carousel navigation buttons */}
                {products.length > 1 && (
                    <>
                        <CarouselPrevious className="absolute top-1/2 left-0 z-10 -translate-y-1/2 transform" />
                        <CarouselNext className="absolute top-1/2 right-0 z-10 -translate-y-1/2 transform" />
                    </>
                )}
            </Carousel>

            {/* Display the current slide number and total slides */}
            <div className="text-muted-foreground py-0 text-center text-sm">
                Product {current} of {count}
            </div>
        </div>
    );
}
