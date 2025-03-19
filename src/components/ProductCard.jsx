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
        <Link href="/activated-granola" className="block">
            <div className="border border-gray-400 rounded-xl p-4 bg-white flex flex-col md:flex-row items-center 
            md:items-start max-w-4xl mx-auto relative md:h-[436px] h-auto overflow-hidden cursor-pointer 
            transition-shadow duration-300 ease-in-out hover:shadow-2xl hover:border-black">
                {/* Images */}
                <div className="flex-1 h-full">
                    {/* Show only one image on mobile */}
                    <div className="md:hidden p-4">
                        <Image 
                            src={images[0]} 
                            alt={title} 
                            width={250} 
                            height={375} 
                            className="rounded-xl w-full h-full object-cover"
                        />
                    </div>
                    {/* Show grid layout on larger screens */}
                    <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-[400px] items-end">
                        <div className="row-span-2 h-full">
                            <Image 
                                src={images[0]} 
                                alt={title} 
                                width={250} 
                                height={375} 
                                className="rounded-xl w-full h-full object-cover"
                            />
                        </div>
                        <div className="h-full">
                            <Image 
                                src={images[1]} 
                                alt={title} 
                                width={250} 
                                height={375} 
                                className="rounded-xl w-full h-full object-cover"
                            />
                        </div>
                        <div className="h-full flex items-end">
                            <Image 
                                src={images[2]} 
                                alt={title} 
                                width={250} 
                                height={375} 
                                className="rounded-xl w-full h-full object-cover rounded-br-xl"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Content */}
                <div className="md:w-1/2 p-4 flex flex-col h-auto md:h-full">
                    <div className="flex-grow px-4 pb-4 md:pb-0">
                        <h2 className="text-2xl font-bold text-center">{title}</h2>
                        <p className="text-lg p-2 text-gray-600 text-center">{subtitle}</p>
                        
                        {/* Features */}
                        <div className="hidden sm:block w-full justify-center">
                            <ul className="mt-4 text-center flex flex-col items-start mx-auto space-y-2 sm:ml-28 md:ml-28 md:text-left w-full">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-green-600 w-full">
                                        <CircleCheck className="w-6 h-6 text-green-600" />
                                        <span className="text-lg md:text-base sm:text-xs whitespace-nowrap">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 flex items-center justify-between pb-3">
                            <span className="text-6xl font-bold text-gray-800">{price}</span>
                            {rating && <span className="text-yellow-500 text-lg">⭐ {rating}</span>}
                        </div>

                        {/* Shop Buttons */}
                        <div className="w-full flex flex-row gap-4 mt-auto pt-4">
                            {shopLinks.map(({ text, href }, index) => (
                                <Link key={index} href={href} className="w-1/2">
                                    <button className="w-full px-4 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300 text-sm md:text-base truncate">
                                        {text}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
