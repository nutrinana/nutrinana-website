"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import styles from "@/styles/Lightbox.module.css";
import "@/styles/globals.css";

/**
 * Lightbox component for displaying images in a modal format.
 *
 * It allows users to view a larger version of an image and navigate through a gallery of images.
 *
 * @component
 *
 * @param {Object} props - The properties for the Lightbox component.
 * @param {string[]} props.images - Array of image URLs to be displayed in the lightbox.
 * @param {number} props.selectedImageIndex - The index of the currently selected image.
 * @param {Function} props.setSelectedImageIndex - Function to set the selected image index.
 * @param {Function} props.onClose - Function to close the lightbox.
 *
 * @returns {JSX.Element|null} The rendered Lightbox component or null if no image is selected.
 */
export default function Lightbox({ images, selectedImageIndex, setSelectedImageIndex, onClose }) {
    if (selectedImageIndex === null) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            {/* Background overlay */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Lightbox window */}
            <div
                className={`${styles.animateFadeIn} relative z-10 flex max-h-[90vh] w-[80vw] max-w-[500px] flex-col rounded-lg bg-white shadow-lg`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-gray-300"
                >
                    <X className="size-4" />
                </Button>

                {/* Main large image */}
                <div className="flex flex-grow items-center justify-center">
                    <div
                        className="relative h-full w-full transition-opacity duration-300 ease-in-out"
                        style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
                    >
                        <Image
                            key={selectedImageIndex}
                            src={images[selectedImageIndex]}
                            alt="Expanded view"
                            width={1536}
                            height={2048}
                            className="h-full w-full rounded-t-lg object-cover"
                        />
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="flex justify-center gap-2 overflow-x-auto rounded-b-lg bg-white p-4">
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`cursor-pointer border-2 ${selectedImageIndex === idx ? "border-black" : "border-transparent"} overflow-hidden`}
                            onClick={() => setSelectedImageIndex(idx)}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                width={64}
                                height={64}
                                className="h-16 w-16 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
