import Image from "next/image";
import Link from "next/link";

// TODO: Fix the spacing of the product component and align more closely with figma design
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
        <div className="border rounded-xl p-6 shadow-md bg-white flex flex-col md:flex-row items-center md:items-start max-w-4xl mx-auto">
            {/* Images */}
            <div className="grid grid-cols-2 gap-2 md:w-1/2">
                {images.map((src, index) => (
                    <Image
                        key={index}
                        src={src}
                        alt={title}
                        width={150}
                        height={150}
                        className="rounded-md"
                    />
                ))}
            </div>
            
            {/* Content */}
            <div className="md:w-1/2 p-4 text-center md:text-left">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-lg text-gray-600">{subtitle}</p>
                
                {/* Features */}
                <ul className="mt-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-green-600">
                    ✔ {feature}
                    </li>
                ))}
                </ul>
                
                {/* Price & Rating */}
                <div className="mt-4 flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-800">{price}</span>
                {rating && <span className="text-yellow-500">⭐ {rating}</span>}
                </div>
                
                {/* Shop Buttons */}
                <div className="mt-4 flex gap-4">
                {shopLinks.map(({ text, href }, index) => (
                    <Link key={index} href={href}>
                    <button className="px-4 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300">
                        {text}
                    </button>
                    </Link>
                ))}
                </div>
            </div>
        </div>
    );
}
