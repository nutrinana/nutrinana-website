"use client";

import React, { useRef, useState, useEffect } from "react";
import { X, Play, ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";

/**
 * InstagramModal component displays an Instagram post in a modal.
 * 
 * @param {Object} props - The props for the component.
 * @param {Object} props.post - The Instagram post data.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 * @param {Function} props.onNext - Function to call for the next post.
 * @param {Function} props.onPrev - Function to call for the previous post.
 * @param {boolean} props.showNav - Flag to show navigation buttons.
 * 
 * @returns {JSX.Element|null} The modal component or null if no post is provided.
 */
export default function InstagramModal({ post, onClose, onNext, onPrev, showNav }) {
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const mode = process.env.NEXT_PUBLIC_DEBUG_MODE || "normal";
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState("loading");
  const [hasError, setHasError] = useState(mode === "error");

  useEffect(() => {
    // Loading and error state handling
    if (mode === "loading") {
      setProgress(0);
      setIsLoading(true);
      setHasError(false);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
      return () => clearInterval(interval);
    }

    if (mode === "error") {
      setIsLoading(false);
      setHasError(true);
    }

    if (mode === "normal") {
      setIsLoading(false);
      setHasError(false);
    }
  }, [mode]);

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
  const imageSrc = post.media_url || post.thumbnail_url || post.cover_url || "";
  // const imageSrc =  ""; // simulate an error

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
    >
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Progress value={progress} className="w-48 h-4" />
        </div>
      )}
      {/* Loading and Error UI */}
      {hasError && (
        <div className="flex flex-col items-center justify-center text-center p-6 w-full h-full max-h-screen overflow-y-auto md:rounded-lg md:max-w-6xl md:max-h-[90vh] md:overflow-hidden shadow-lg bg-white">
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
        </div>
      )}
      {!isLoading && !hasError && (
        <div
          ref={modalRef}
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
              <ArrowLeft />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="bg-black/50 rounded-full text-white hover:text-gray-300 hover:bg-black/70"
              aria-label="Next post"
            >
              <ArrowRight />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
          {/* Navigation buttons for desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            className="absolute size-10 top-1/2 left-16 -translate-y-1/2 z-50 text-white hover:text-gray-300 hover:bg-transparent hidden md:flex"
            aria-label="Previous post"
          >
            <ArrowLeft />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute size-10 top-1/2 right-16 -translate-y-1/2 z-50 text-white hover:text-gray-300 hover:bg-transparent hidden md:flex"
            aria-label="Next post"
          >
            <ArrowRight />
            <span className="sr-only">Next slide</span>
          </Button>

          {/* Media rendering: Image or Video */}
          <div className="flex-shrink-0 w-full md:w-1/2 bg-black">
            {post.media_type === "VIDEO" ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  src={imageSrc}
                  autoPlay
                  playsInline
                  loop
                  onClick={togglePlayback}
                  onCanPlay={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                  }}
                  className="w-full h-full object-cover max-h-[90vh] cursor-pointer"
                />
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Play className="w-16 h-16 text-white bg-black/60 rounded-full p-3" />
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={imageSrc}
                  alt={post.caption || 'Instagram post'}
                  className="w-full h-full object-cover max-h-[90vh]"
                  width={800}
                  height={800}
                  onLoadingComplete={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
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
              <p className="text-black whitespace-pre-line text-base mb-4">
                {post.caption?.split(/(\s+)/).map((word, index) => {
                  if (word.startsWith('@') || word.startsWith('#')) {
                    const match = word.match(/^([@#][\w_-]+(?:\.[\w_-]+)*)(['’]?[a-z]*)?(\W*)$/i);
                    if (match) {
                      return (
                        <React.Fragment key={index}>
                          <span style={{ color: "rgb(20, 54, 103)" }}>{match[1]}</span>
                          {match[2]}
                          {match[3]}
                        </React.Fragment>
                      );
                    }
                  }
                  return word;
                })}
              </p>
              <p className="text-sm text-gray-500 mb-8">{formatDate(post.timestamp)}</p>
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
      )}

      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 md:hover:bg-transparent bg-black/50 rounded-full md:bg-transparent md:text-3xl md:size-14"
      >
        <X size={28} />
      </Button>
    </div>
  );
}
