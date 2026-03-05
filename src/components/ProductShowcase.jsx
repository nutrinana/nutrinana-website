"use client";

import { useState } from "react";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AddToBagButton from "@/components/AddToBagButton";
import GlobalAccordion from "@/components/GlobalAccordion";
import Lightbox from "@/components/Lightbox";
import useProductRating from "@/hooks/useProductRating";
import "@/styles/globals.css";

/**
 * ProductShowcase component for displaying product information in a card layout.
 *
 * It includes a grid of images, title, subtitle, description, price, size, add to bag button, and optional accordions.
 * Clicking an image opens a Lightbox view with a larger image and selectable thumbnails.
 *
 * @component
 *
 * @param {Object} props - The properties for the ProductShowcase component.
 * @param {string[]} props.images - Array of image URLs for the product.
 * @param {string} props.title - The title of the product.
 * @param {string} props.subtitle - The subtitle or short description of the product.
 * @param {string} props.description - Product description text.
 * @param {string} props.price - The price of the product (formatted as a string).
 * @param {string} [props.size] - The size/weight of the product (e.g., "500g").
 * @param {string} props.reviewId - The external identifier from Yotpo for the product (used for fetching ratings).
 * @param {Object[]} [props.accordionData] - Optional array of accordion items to display below shop buttons.
 * @param {string} props.productId - The product ID used for adding to the bag.
 * @param {string} props.pimentoProductId - The product ID used for checking availability via Pimento API.
 *
 * @returns {JSX.Element} The rendered ProductShowcase component.
 */
export default function ProductShowcase({
    images = [],
    title,
    subtitle,
    description,
    price,
    size,
    reviewId = "",
    accordionData = [],
    productId = "",
    pimentoProductId,
}) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const averageRating = useProductRating(reviewId || "");

    return (
        <div>
            {/* Main container for the card layout */}
            <div className="relative flex h-auto w-full flex-col items-center overflow-visible rounded-xl md:flex-row md:items-start md:gap-8">
                {/* Images Section */}
                <div className="h-full flex-1 md:sticky md:top-24 md:self-start">
                    {/* Mobile view - single image */}
                    <div className="pb-4 md:hidden">
                        <div
                            className="group relative cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImageIndex(0);
                            }}
                        >
                            <Image
                                src={images[0]}
                                alt={title}
                                width={1536}
                                height={2048}
                                className="h-full w-full rounded-xl object-cover"
                            />
                            <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <div className="bg-raisin/60 flex h-8 w-8 items-center justify-center rounded-full">
                                    <Maximize2 className="h-5 w-5 text-white" strokeWidth={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Desktop view - 3 image grid */}
                    <div className="hidden h-[600px] grid-cols-2 grid-rows-2 items-end gap-2 md:grid">
                        <div className="row-span-2 h-full">
                            <div
                                className="group relative h-full cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImageIndex(0);
                                }}
                            >
                                <Image
                                    src={images[0]}
                                    alt={title}
                                    width={1536}
                                    height={2048}
                                    className="h-full w-full rounded-xl object-cover"
                                />
                                <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <div className="bg-raisin/60 flex h-8 w-8 items-center justify-center rounded-full">
                                        <Maximize2 className="h-5 w-5 text-white" strokeWidth={1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-full">
                            <div
                                className="group relative h-full cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImageIndex(1);
                                }}
                            >
                                <Image
                                    src={images[1]}
                                    alt={title}
                                    width={1536}
                                    height={2048}
                                    className="h-full w-full rounded-xl object-cover"
                                />
                                <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <div className="bg-raisin/60 flex h-8 w-8 items-center justify-center rounded-full">
                                        <Maximize2 className="h-5 w-5 text-white" strokeWidth={1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-full items-end">
                            <div
                                className="group relative h-full w-full cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImageIndex(2);
                                }}
                            >
                                <Image
                                    src={images[2]}
                                    alt={title}
                                    width={1536}
                                    height={2048}
                                    className="h-full w-full rounded-xl rounded-br-xl object-cover"
                                />
                                <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <div className="bg-raisin/60 flex h-8 w-8 items-center justify-center rounded-full">
                                        <Maximize2 className="h-5 w-5 text-white" strokeWidth={1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex h-auto flex-col md:w-2/5">
                    <div className="grow px-0 pt-4 pb-4 md:pb-0">
                        {/* Title and Subtitle */}
                        <h2 className="font-display text-lg sm:text-xl md:text-2xl">{title}</h2>
                        <p className="text-lg text-gray-600">{subtitle}</p>

                        {/* Description */}
                        {description && (
                            <div className="mt-4">
                                <p className="text-base text-gray-700">{description}</p>
                            </div>
                        )}

                        {/* Price and Rating */}
                        <div className="mt-6 flex items-center justify-between pb-3">
                            <span className="text-4xl font-bold text-gray-800">{price}</span>
                            {averageRating !== null && averageRating !== undefined && (
                                <Link href="/reviews" className="rating hover:underline">
                                    ⭐ {averageRating}
                                </Link>
                            )}
                        </div>

                        {/* Pack Size */}
                        {size && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Pack size: {size}</p>
                            </div>
                        )}

                        {/* Add to bag */}
                        {productId && (
                            <div className="mt-auto pt-4">
                                <AddToBagButton
                                    productId={productId}
                                    pimentoProductId={pimentoProductId}
                                />
                            </div>
                        )}

                        {/* Accordions */}
                        {accordionData.length > 0 && (
                            <div className="mt-6">
                                <GlobalAccordion items={accordionData} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Lightbox for larger image viewing */}
            <Lightbox
                images={images}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
                onClose={() => setSelectedImageIndex(null)}
            />
        </div>
    );
}
