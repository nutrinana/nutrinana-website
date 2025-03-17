import Image from "next/image";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

export default function ProductCard({
    images = [],
    title,
    subtitle,
    features = [],
    price,
    rating,
    shopLinks = [],
}) {
    return (
        <div className="border rounded-xl p-4 bg-white flex flex-col md:flex-row items-center md:items-start max-w-4xl mx-auto relative h-[600px] overflow-hidden">
            {/* Images */}
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2 h-full">
                {/* Left Large Image */}
                <div className="row-span-2 h-full">
                    <Image 
                        src={images[0]} 
                        alt={title} 
                        width={250} 
                        height={375} 
                        className="rounded-xl w-full h-full object-cover"
                    />
                </div>

                {/* Top Right Image */}
                <div className="h-full">
                    <Image 
                        src={images[1]} 
                        alt={title} 
                        width={125} 
                        height={187} 
                        className="rounded-xl w-full h-full object-cover"
                    />
                </div>

                {/* Bottom Right Image */}
                <div className="h-full">
                    <Image 
                        src={images[2]} 
                        alt={title} 
                        width={125} 
                        height={187} 
                        className="rounded-xl w-full h-full object-cover rounded-br-xl"
                    />
                </div>
            </div>
            
            {/* Content */}
            <div className="md:w-1/2 p-4 flex flex-col h-full">
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-center">{title}</h2>
                    <p className="text-lg text-gray-600 text-center">{subtitle}</p>
                    
                    {/* Features */}
                    <ul className="mt-8 mb-4 ml-30 text-center flex flex-col items-start mx-auto space-y-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-green-600 w-full">
                                <CircleCheck className="w-6 h-6 text-green-600" />
                                <span className="text-lg">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Price, Rating, and Buttons */}
                <div className="mt-auto pt-4">
                    <div className="flex items-center justify-between pb-4">
                        <span className="text-6xl font-bold text-gray-800">{price}</span>
                        {rating && <span className="text-yellow-500 text-lg">⭐ {rating}</span>}
                    </div>

                    {/* Shop Buttons */}
                    <div className="w-full flex flex-row gap-4">
                        {shopLinks.map(({ text, href }, index) => (
                            <Link key={index} href={href} className="w-1/2">
                                <button className="w-full px-4 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300">
                                    {text}
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
