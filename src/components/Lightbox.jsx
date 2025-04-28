"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Lightbox component for displaying images in a modal format.
 * It allows users to view a larger version of an image and navigate through a gallery of images.
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
  if (selectedImageIndex === null) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      {/* Lightbox window */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-lg w-auto max-w-[95vw] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full hover:text-gray-300 hover:bg-black/70 w-8 h-8"
        >
          <X className="size-4" />
        </Button>

        {/* Main large image */}
        <div className="flex-grow flex items-center justify-center p-4 bg-gray-100 rounded-t-lg">
          <Image
            src={images[selectedImageIndex]}
            alt="Expanded view"
            width={1536}
            height={2048}
            className="object-contain max-h-[75vh] w-auto"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-4 overflow-x-auto bg-white rounded-b-lg justify-center">
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
                className="object-cover w-16 h-16"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
