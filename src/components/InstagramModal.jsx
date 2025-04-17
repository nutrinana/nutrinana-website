"use client";

import React, { useRef, useState, useEffect } from "react";
import { X, Play, ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatCaption } from "@/lib/utils";

/**
 * InstagramModal component displays an Instagram post in a modal.
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.post - The Instagram post data.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 * @param {Function} props.onNext - Function to call for the next post.
 * @param {Function} props.onPrev - Function to call for the previous post.
 * 
 * @returns {JSX.Element|null} The modal component or null if no post is provided.
 */
export default function InstagramModal({ post, onClose, onNext, onPrev }) {
  const modalRef = useRef(null);
  const handlers = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
  });
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check if the post is valid and set error state accordingly
  useEffect(() => {
    if (!post) {
      setHasError(true);
    }
  }, [post]);
  
  // Reset video play state when modal changes to a new post
  useEffect(() => {
    setIsPlaying(true);
  }, [post]);

  // Toggles video play/pause state
  const togglePlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  if (!post) return null;
  // TODO: Handle the case when post is null or undefined
  const imageSrc = post.media_url || post.thumbnail_url || post.cover_url || "";
  //const imageSrc = ""
  //const imageSrc = "https://example.com/does-not-exist.jpg"
  //const imageSrc = "blue";

  // Validate the image source and media type once post data is available
  useEffect(() => {
    const isMalformed = !imageSrc || (post.media_type !== "IMAGE" && post.media_type !== "VIDEO" && post.media_type !== "CAROUSEL_ALBUM");
    
    if (isMalformed) {
      setHasError(true);
    }
  }, [imageSrc, post.media_type]);

  if (hasError) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
          }
        }}
      >
        {/* Error UI: Display a message when the post cannot be loaded */}
        <div
          ref={modalRef}
          className="flex flex-col items-center justify-center text-center p-6 w-full h-full max-h-screen overflow-y-auto md:rounded-lg md:max-w-6xl md:max-h-[90vh] md:overflow-hidden shadow-lg bg-white"
        >
          <p className="text-lg font-semibold mb-2">Oops! This post couldn't be loaded.</p>
          <p className="text-sm text-gray-500 mb-4">It may have been removed or is unavailable right now.</p>
          <Link
            href="https://www.instagram.com/nutrinanaa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            Visit @nutrinanaa on Instagram <MoveRight className="w-4 h-4 inline" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full hover:text-gray-300 hover:bg-black/70 md:bg-black/50 md:hover:bg-black/70 md:backdrop-blur-sm md:rounded-full md:w-16 md:h-16"
          >
            <X className="size-6 md:!size-9" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      {/* Skeleton UI for modal loading */}
      {!isMediaLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full h-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg bg-white">
            <Skeleton className="flex-shrink-0 w-full md:w-1/2 h-[300px] md:h-auto" />
            <div className="flex flex-col justify-between w-full md:w-1/2 p-6 space-y-4">
              <div>
                <div className="flex items-center mb-4">
                  <Skeleton className="w-11 h-11 rounded-full mr-3" />
                  <Skeleton className="h-5 w-32 rounded" />
                </div>
                <Skeleton className="h-4 w-full rounded mb-2" />
                <Skeleton className="h-4 w-3/4 rounded mb-4" />
              </div>
              <Skeleton className="h-4 w-40 rounded" />
            </div>
          </div>
        </div>
      )}

      <div
        ref={modalRef}
        {...handlers}
        className="bg-white w-full h-full max-h-screen overflow-y-auto md:rounded-lg md:max-w-6xl md:max-h-[90vh] md:overflow-hidden flex flex-col md:flex-row shadow-lg"
      >
        {/* Navigation buttons for mobile */}
        <div className="absolute top-4 left-4 flex flex-row gap-2 md:hidden z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            className="bg-black/50 rounded-full text-white hover:text-gray-300 hover:bg-black/70"
            aria-label="Previous post"
          >
            <ArrowLeft size={36} />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="bg-black/50 rounded-full text-white hover:text-gray-300 hover:bg-black/70"
            aria-label="Next post"
          >
            <ArrowRight size={36} />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
        {/* Navigation buttons for desktop */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          className="absolute size-10 md:w-14 md:h-14 top-1/2 left-16 -translate-y-1/2 z-50 text-white hover:text-gray-300 hover:bg-transparent hidden md:flex md:bg-black/50 md:hover:bg-black/70 md:backdrop-blur-sm md:rounded-full"
          aria-label="Previous post"
        >
          <ArrowLeft size={36} className="md:!size-9" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="absolute size-10 md:w-14 md:h-14 top-1/2 right-16 -translate-y-1/2 z-50 text-white hover:text-gray-300 hover:bg-transparent hidden md:flex md:bg-black/50 md:hover:bg-black/70 md:backdrop-blur-sm md:rounded-full"
          aria-label="Next post"
        >
          <ArrowRight size={36} className="md:!size-9" />
          <span className="sr-only">Next slide</span>
        </Button>

        {/* Media rendering: Image or Video */}
        <div className="flex-shrink-0 w-full md:w-1/2 bg-black">
          {post.media_type === "VIDEO" ? (
            <div className="relative w-full h-full">
              {!isVideoLoaded && (
                <div className="absolute inset-0 w-full h-full bg-black blur-md z-10" />
              )}
              <video
                ref={videoRef}
                src={imageSrc}
                autoPlay
                playsInline
                loop
                onClick={togglePlayback}
                onCanPlay={() => {
                  setIsVideoLoaded(true);
                  setIsMediaLoaded(true);
                }}
                onError={() => {
                  setHasError(true);
                }}
                className={`w-full h-full object-cover max-h-[90vh] cursor-pointer transition-opacity duration-500 ${
                  isVideoLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
              {!isPlaying && isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="p-5 bg-black/50 rounded-full">
                    {/* TODO: try className=w-10 w-10 */}
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={imageSrc}
                alt={post.caption || 'Instagram post'}
                loading="lazy"
                className={`w-full h-full object-cover max-h-[90vh] transition-opacity duration-500 ${
                  isImageLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
                }`}
                onLoad={() => {
                  setIsImageLoaded(true);
                  setIsMediaLoaded(true);
                }}
                onError={() => {
                  setHasError(true);
                }}
              />
            </div>
          )}
        </div>

        {/* Caption and profile section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Image
                src="/icons/IG-profile-pic.svg"
                alt="Instagram logo"
                width={44}
                height={44}
                className="rounded-full border border-gray-200 p-1 mr-3"
              />
              <Link
                href="https://www.instagram.com/nutrinanaa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-black hover:underline"
              >
                nutrinanaa
              </Link>
            </div>
            <hr className="border-t border-gray-200 w-[calc(100%+3rem)] -ml-6 mb-8" />
            {post.caption ? (
              <p className="text-black whitespace-pre-line text-base mb-4">
                {formatCaption(post.caption)}
              </p>
            ) : (
              <p className="text-gray-400 italic mb-4">No caption provided.</p>
            )}
            <p className="text-sm text-gray-500 mb-8">
              {post.timestamp ? formatDate(post.timestamp) : "Date unavailable"}
            </p>
          </div>
          {post.permalink && (
            <Link
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
            >
              View on Instagram <MoveRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/50 rounded-full hover:text-gray-300 hover:bg-black/70 md:bg-black/50 md:hover:bg-black/70 md:backdrop-blur-sm md:rounded-full md:w-12 md:h-12"
      >
        <X className="size-4 md:!size-9" />
      </Button>
    </div>
  );
}