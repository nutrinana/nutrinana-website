import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products }) {
    return (
        <Carousel className="w-full max-w-6xl mx-auto relative">
            <CarouselContent className="-ml-1 flex">
                {products.map((product, index) => (
                    <CarouselItem 
                        key={index} 
                        className="pl-1 flex-shrink-0 md:w-[50%] lg:w-[33.333%] xl:w-[25%]"
                    >
                        <ProductCard {...product} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
        </Carousel>
    );
}