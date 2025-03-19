"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import useCarousel from "@/hooks/useCarousel"; 

export default function ProductCarousel({ products }) {
    const { api, setApi, current, count } = useCarousel();

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            <Carousel setApi={setApi} className="overflow-visible">
                <CarouselContent className="-ml-1 flex overflow-visible pb-6">
                    {products.map((product, index) => (
                        <CarouselItem 
                            key={index} 
                            className="pl-1 flex-shrink-0 md:w-[50%] lg:w-[33.333%] xl:w-[25%] overflow-visible"
                        >
                            <ProductCard {...product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
            </Carousel>
            {/* Display Slide Progress */}
            <div className="py-0 text-center text-sm text-muted-foreground">
                Product {current} of {count}
            </div>
        </div>
    );
}