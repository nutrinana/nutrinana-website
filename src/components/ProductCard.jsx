"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import useProductRating from "@/hooks/useProductRating";
import { openInNewTab } from "@/lib/utils";
import "@/styles/globals.css";

/**
 * ProductCard component for displaying product information.
 *
 * It includes images, title, subtitle, feature list, price, rating, and shop links.
 * Clicking on the card navigates to a specific product page.
 *
 * @component
 *
 * @param {Object} props - The properties for the ProductCard component.
 * @param {string[]} props.images - Array of image URLs for the product.
 * @param {string} props.title - The title of the product.
 * @param {string} props.subtitle - The subtitle of the product.
 * @param {string[]} props.features - Array of features for the product.
 * @param {string} props.price - The price of the product.
 * @param {Object[]} props.shopLinks - Array of shop links for the product.
 * @param {string} props.shopLinks[].text - The text for the shop link.
 * @param {string} props.shopLinks[].href - The URL for the shop link.
 * @param {string} props.externalId - The external identifier from Yotpo for the product (used for fetching ratings).
 *
 * @returns {JSX.Element} The rendered ProductCard component.
 */
export default function ProductCard({
    images = [],
    title,
    subtitle,
    features = [],
    price,
    shopLinks = [],
    externalId = "",
}) {
    const router = useRouter();
    const averageRating = useProductRating(externalId || "");

    return (
        // Wrapper that allows navigation on click or Enter key
        <div className="block no-underline">
            {/* Main container for the card layout */}
            <div
                onClick={() => router.push("/activated-granola")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        router.push("/activated-granola");
                    }
                }}
                className="relative mx-auto flex h-auto max-w-4xl cursor-pointer flex-col items-center overflow-visible rounded-xl border border-gray-400 bg-white p-4 transition-shadow duration-300 ease-in-out hover:shadow-xl md:h-[436px] md:flex-row md:items-start"
            >
                {/* Images Section */}
                <div className="h-full flex-1">
                    {/* Mobile view - single image */}
                    <div className="p-4 md:hidden">
                        <Image
                            src={images[0]}
                            alt={title}
                            width={1536}
                            height={2048}
                            className="h-full w-full rounded-xl object-cover"
                        />
                    </div>
                    {/* Desktop view - 3 image grid */}
                    <div className="hidden h-[400px] grid-cols-2 grid-rows-2 items-end gap-2 md:grid">
                        <div className="row-span-2 h-full">
                            <Image
                                src={images[0]}
                                alt={title}
                                width={1536}
                                height={2048}
                                className="h-full w-full rounded-xl object-cover"
                            />
                        </div>
                        <div className="h-full">
                            <Image
                                src={images[1]}
                                alt={title}
                                width={1536}
                                height={2048}
                                className="h-full w-full rounded-xl object-cover"
                            />
                        </div>
                        <div className="flex h-full items-end">
                            <Image
                                src={images[2]}
                                alt={title}
                                width={1536}
                                height={2048}
                                className="h-full w-full rounded-xl rounded-br-xl object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex h-auto flex-col p-4 md:h-full md:w-1/2">
                    <div className="flex-grow px-0 pt-4 pb-4 md:pb-0">
                        {/* Title and Subtitle */}
                        <h2 className="text-center text-2xl font-bold">{title}</h2>
                        <p className="p-2 text-center text-lg text-gray-600">{subtitle}</p>

                        {/* Features list with icons */}
                        <div className="hidden w-full justify-center sm:block">
                            <ul className="mx-auto mt-4 flex w-full flex-col items-start space-y-2 text-center sm:ml-28 md:ml-28 md:text-left">
                                {features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="flex w-full items-center gap-2 text-green-600"
                                    >
                                        <CircleCheck className="h-6 w-6 text-green-600" />
                                        <span className="text-lg whitespace-nowrap sm:text-xs md:text-base">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price and Rating */}
                        <div className="mt-6 flex items-center justify-between pb-3">
                            <span className="text-6xl font-bold text-gray-800">{price}</span>
                            {averageRating !== null && averageRating !== undefined && (
                                <span className="rating">⭐ {averageRating}</span>
                            )}
                        </div>

                        {/* Shop buttons */}
                        <div className="mt-auto flex w-full flex-col gap-4 pt-4 sm:flex-row">
                            <Button
                                variant="yellow"
                                size="default"
                                className="w-full sm:w-1/2"
                                onClick={(event) => {
                                    event.stopPropagation(); // prevents the card's onClick from firing
                                    if (shopLinks[0]?.href) {
                                        openInNewTab(shopLinks[0].href);
                                    }
                                }}
                            >
                                {shopLinks[0]?.text}
                            </Button>
                            <Button
                                variant="greenOutlined"
                                size="default"
                                className="w-full sm:w-1/2"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    if (shopLinks[1]?.href) {
                                        openInNewTab(shopLinks[1].href);
                                    }
                                }}
                            >
                                {shopLinks[1]?.text}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
