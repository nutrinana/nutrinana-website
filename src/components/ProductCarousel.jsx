"use client";

import { 
    Carousel, 
    CarouselContent, 
    CarouselItem, 
    CarouselNext, 
    CarouselPrevious 
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import useCarousel from "@/hooks/useCarousel"; 

/**
 * ProductCarousel component that displays a list of products in a carousel format.
 * Each product is represented by a ProductCard component.
 * The carousel allows users to navigate through the products using next and previous buttons.
 * The current slide number and total count of slides are displayed below the carousel.
 * 
 * @param {Object[]} products - Array of product objects to be displayed in the carousel.
 * Each product object should contain properties that ProductCard can accept.
 * @returns {JSX.Element} The rendered ProductCarousel component.
 */
export default function ProductCarousel({ products }) {
    // Custom hook to manage carousel state
    // It provides the API for the carousel, current slide index, and total count of slides
    const { api, setApi, current, count } = useCarousel();

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            {/* Carousel component to display products */}
            <Carousel setApi={setApi} className="overflow-visible">
                <CarouselContent className="-ml-1 flex overflow-visible pb-6">
                    {products.map((product, index) => (
                        // Each CarouselItem wraps a single ProductCard
                        <CarouselItem 
                            key={index} 
                            className="pl-1 flex-shrink-0 md:w-[50%] lg:w-[33.333%] xl:w-[25%] overflow-visible"
                        >
                            <ProductCard {...product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Carousel navigation buttons */}
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
            </Carousel>

            {/* Display the current slide number and total slides */}
            <div className="py-0 text-center text-sm text-muted-foreground">
                Product {current} of {count}
            </div>
        </div>
    );
}