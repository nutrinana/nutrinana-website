"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CircleCheck, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lightbox from "@/components/Lightbox";
import useProductRating from "@/hooks/useProductRating";
import { openInNewTab } from "@/lib/utils";
import "@/styles/globals.css";

/**
 * ProductShowcase component for displaying product information in a card layout.
 * It includes a grid of images, title, subtitle, feature list, price, and shop links.
 * Clicking an image opens a Lightbox view with a larger image and selectable thumbnails.
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
            <div className="border border-gray-400 rounded-xl p-4 bg-white flex flex-col md:flex-row items-center 
                md:items-start max-w-4xl mx-auto relative md:h-[436px] h-auto overflow-visible">
                {/* Images Section */}
                <div className="flex-1 h-full">
                    {/* Mobile view - single image */}
                    <div className="md:hidden p-4">
                      <div
                        className="relative group cursor-pointer"
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
                          className="rounded-xl w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                            <Maximize2 className="w-5 h-5 text-white" strokeWidth={1} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Desktop view - 3 image grid */}
                    <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-[400px] items-end">
                      <div className="row-span-2 h-full">
                        <div
                          className="relative group cursor-pointer h-full"
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
                            className="rounded-xl w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                              <Maximize2 className="w-5 h-5 text-white" strokeWidth={1} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-full">
                        <div
                          className="relative group cursor-pointer h-full"
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
                            className="rounded-xl w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                              <Maximize2 className="w-5 h-5 text-white" strokeWidth={1} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-full flex items-end">
                        <div
                          className="relative group cursor-pointer h-full w-full"
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
                            className="rounded-xl w-full h-full object-cover rounded-br-xl"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                              <Maximize2 className="w-5 h-5 text-white" strokeWidth={1} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                
                {/* Content Section */}
                <div className="md:w-1/2 p-4 flex flex-col h-auto md:h-full">
                    <div className="flex-grow px-0 pb-4 pt-4 md:pb-0">
                        {/* Title and Subtitle */}
                        <h2 className="text-2xl font-bold text-center">{title}</h2>
                        <p className="text-lg p-2 text-gray-600 text-center">{subtitle}</p>
                        
                        {/* Features list with icons */}
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

                        {/* Price and Rating */}
                        <div className="mt-6 flex items-center justify-between pb-3">
                            <span className="text-6xl font-bold text-gray-800">{price}</span>
                            {averageRating !== null && averageRating !== undefined && (
                                <span className="rating">⭐ {averageRating}</span>
                            )}
                        </div>

                        {/* Shop buttons */}
                        <div className="w-full flex flex-col sm:flex-row gap-4 mt-auto pt-4">
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