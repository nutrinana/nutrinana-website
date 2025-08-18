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
 * Uses a combination of image and video elements to display the post content.
 *
 * @component
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

    useEffect(() => {
        setIsImageLoaded(false);
        setIsVideoLoaded(false);
        setIsMediaLoaded(false);
        setHasError(false);

        if (modalRef.current) {
            modalRef.current.scrollTop = 0;
        }
    }, [post?.id]);

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

    // TODO: Handle the case when post is null or undefined
    const imageSrc = post?.media_url || post?.thumbnail_url || post?.cover_url || "";
    //const imageSrc = ""
    //const imageSrc = "https://example.com/does-not-exist.jpg"
    //const imageSrc = "blue";

    // Validate the image source and media type once post data is available
    useEffect(() => {
        if (!post) {
            return;
        }
        const isMalformed =
            !imageSrc ||
            (post.media_type !== "IMAGE" &&
                post.media_type !== "VIDEO" &&
                post.media_type !== "CAROUSEL_ALBUM");

        if (isMalformed) {
            setHasError(true);
        }
    }, [imageSrc, post?.media_type, post]);

    if (!post) {
        return null;
    }

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
                    className="flex h-full max-h-screen w-full flex-col items-center justify-center overflow-y-auto bg-white p-6 text-center shadow-lg md:max-h-[90vh] md:max-w-6xl md:overflow-hidden md:rounded-lg"
                >
                    <p className="mb-2 text-lg font-semibold">
                        Oops! This post couldn&apos;t be loaded.
                    </p>
                    <p className="mb-4 text-sm text-gray-500">
                        It may have been removed or is unavailable right now.
                    </p>
                    <Link
                        href="https://www.instagram.com/nutrinanaa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                        Visit @nutrinanaa on Instagram <MoveRight className="inline h-4 w-4" />
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="absolute top-4 right-4 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-gray-300 md:h-16 md:w-16 md:rounded-full md:bg-black/50 md:backdrop-blur-sm md:hover:bg-black/70"
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
                    <div className="flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
                        <Skeleton className="h-[300px] w-full flex-shrink-0 md:h-auto md:w-1/2" />
                        <div className="flex w-full flex-col justify-between space-y-4 p-6 md:w-1/2">
                            <div>
                                <div className="mb-4 flex items-center">
                                    <Skeleton className="mr-3 h-11 w-11 rounded-full" />
                                    <Skeleton className="h-5 w-32 rounded" />
                                </div>
                                <Skeleton className="mb-2 h-4 w-full rounded" />
                                <Skeleton className="mb-4 h-4 w-3/4 rounded" />
                            </div>
                            <Skeleton className="h-4 w-40 rounded" />
                        </div>
                    </div>
                </div>
            )}

            <div
                ref={modalRef}
                {...handlers}
                className="flex h-full max-h-screen w-full flex-col overflow-y-auto bg-white shadow-lg md:max-h-[90vh] md:max-w-6xl md:flex-row md:overflow-hidden md:rounded-lg"
            >
                {/* Navigation buttons for mobile */}
                <div className="absolute top-4 left-4 z-50 flex flex-row gap-2 md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onPrev}
                        className="rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-gray-300"
                        aria-label="Previous post"
                    >
                        <ArrowLeft size={36} />
                        <span className="sr-only">Previous slide</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onNext}
                        className="rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-gray-300"
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
                    className="absolute top-1/2 left-16 z-50 hidden size-10 -translate-y-1/2 text-white hover:bg-transparent hover:text-gray-300 md:flex md:h-14 md:w-14 md:rounded-full md:bg-black/50 md:backdrop-blur-sm md:hover:bg-black/70"
                    aria-label="Previous post"
                >
                    <ArrowLeft size={36} className="md:!size-9" />
                    <span className="sr-only">Previous slide</span>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onNext}
                    className="absolute top-1/2 right-16 z-50 hidden size-10 -translate-y-1/2 text-white hover:bg-transparent hover:text-gray-300 md:flex md:h-14 md:w-14 md:rounded-full md:bg-black/50 md:backdrop-blur-sm md:hover:bg-black/70"
                    aria-label="Next post"
                >
                    <ArrowRight size={36} className="md:!size-9" />
                    <span className="sr-only">Next slide</span>
                </Button>

                {/* Media rendering: Image or Video */}
                <div className="w-full flex-shrink-0 bg-black md:w-1/2">
                    {post.media_type === "VIDEO" ? (
                        <div className="relative h-full w-full">
                            {!isVideoLoaded && (
                                <div className="absolute inset-0 z-10 h-full w-full bg-black blur-md" />
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
                                className={`h-full max-h-[90vh] w-full cursor-pointer object-cover transition-opacity duration-500 ${
                                    isVideoLoaded ? "opacity-100" : "opacity-0"
                                }`}
                            />
                            {!isPlaying && isVideoLoaded && (
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <div className="rounded-full bg-black/50 p-5">
                                        {/* TODO: try className=w-10 w-10 */}
                                        <Play className="h-8 w-8 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative h-full w-full">
                            <Image
                                src={imageSrc}
                                alt={post.caption || "Instagram post"}
                                loading="lazy"
                                width={800}
                                height={800}
                                className={`h-full max-h-[90vh] w-full object-cover transition-opacity duration-500 ${
                                    isImageLoaded ? "blur-0 opacity-100" : "opacity-0 blur-md"
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
                <div className="flex w-full flex-col justify-between p-6 md:w-1/2">
                    <div className="mb-6">
                        <div className="mb-4 flex items-center">
                            <div className="mr-3 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white">
                                <Image
                                    src="/icons/IG-profile-pic.svg"
                                    alt="Instagram logo"
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                />
                            </div>
                            <Link
                                href="https://www.instagram.com/nutrinanaa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-black hover:underline"
                            >
                                nutrinanaa
                            </Link>
                        </div>
                        <hr className="mb-8 -ml-6 w-[calc(100%+3rem)] border-t border-gray-200" />
                        {post.caption ? (
                            <p className="mb-4 text-base whitespace-pre-line text-black">
                                {formatCaption(post.caption)}
                            </p>
                        ) : (
                            <p className="mb-4 text-gray-400 italic">No caption provided.</p>
                        )}
                        <p className="mb-8 text-sm text-gray-500">
                            {post.timestamp
                                ? formatDate(post.timestamp, "dd MMM yyyy")
                                : "Date unavailable"}
                        </p>
                    </div>
                    {post.permalink && (
                        <Link
                            href={post.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        >
                            View on Instagram <MoveRight className="h-4 w-4" />
                        </Link>
                    )}
                </div>
            </div>

            {/* Close button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-gray-300 md:h-12 md:w-12 md:rounded-full md:bg-black/50 md:backdrop-blur-sm md:hover:bg-black/70"
            >
                <X className="size-4 md:!size-9" />
            </Button>
        </div>
    );
}
