"use client";

import { useState } from "react";

import { CircleCheck, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Lightbox from "@/components/Lightbox";
import { Button } from "@/components/ui/button";
import useProductRating from "@/hooks/useProductRating";
import { openInNewTab } from "@/lib/utils";
import "@/styles/globals.css";

/**
 * ProductShowcase component for displaying product information in a card layout.
 *
 * It includes a grid of images, title, subtitle, feature list, price, and shop links.
 * Clicking an image opens a Lightbox view with a larger image and selectable thumbnails.
 *
 * @component
 *
 * @param {Object} props - The properties for the ProductShowcase component.
 * @param {string[]} props.images - Array of image URLs for the product.
 * @param {string} props.title - The title of the product.
 * @param {string} props.subtitle - The subtitle or short description of the product.
 * @param {string[]} props.features - Array of product features.
 * @param {string} props.price - The price of the product (formatted as a string).
 * @param {Object[]} props.shopLinks - Array of shop link objects for purchasing the product.
 * @param {string} props.shopLinks[].text - Display text for the shop button.
 * @param {string} props.shopLinks[].href - URL for the shop link.
 * @param {string} props.externalId - The external identifier from Yotpo for the product (used for fetching ratings).
 *
 * @returns {JSX.Element} The rendered ProductShowcase component.
 */
export default function ProductShowcase({
    images = [],
    title,
    subtitle,
    features = [],
    price,
    shopLinks = [],
    externalId = "",
}) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const averageRating = useProductRating(externalId || "");

    return (
        <div>
            {/* Main container for the card layout */}
            <div className="relative mx-auto flex h-auto max-w-4xl flex-col items-center overflow-visible rounded-xl border border-gray-400 bg-white p-4 md:h-[436px] md:flex-row md:items-start">
                {/* Images Section */}
                <div className="h-full flex-1">
                    {/* Mobile view - single image */}
                    <div className="p-4 md:hidden">
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
                    <div className="hidden h-[400px] grid-cols-2 grid-rows-2 items-end gap-2 md:grid">
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
                <div className="flex h-auto flex-col p-4 md:h-full md:w-1/2">
                    <div className="flex-grow px-0 pt-4 pb-4 md:pb-0">
                        {/* Title and Subtitle */}
                        <h2 className="font-display text-center text-2xl">{title}</h2>
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
                                <Link href="/reviews" className="rating hover:underline">
                                    ⭐ {averageRating}
                                </Link>
                            )}
                        </div>

                        {/* Shop buttons */}
                        <div className="mt-auto flex w-full flex-col gap-4 pt-4 sm:flex-row">
                            <Button
                                variant="yellow"
                                size="default"
                                className="w-full sm:w-1/2"
                                onClick={(event) => {
                                    event.stopPropagation();
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
