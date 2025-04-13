"use client";

import { useState } from "react";
import { SiInstagram } from "react-icons/si";
import Image from "next/image";
import InstagramEmbed from "@/components/InstagramEmbed";
import InstagramModal from "@/components/InstagramModal";
import { useInstagramFeed } from "@/hooks/useInstagramFeed";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { extractHashtags } from "@/lib/utils";

/**
 * InstagramFeed component renders a responsive Instagram grid.
 * Displays latest posts fetched via Instagram API or fallback embeds on error.
 * Allows users to click a post and open a detailed modal view.
 * 
 * @returns {JSX.Element} Instagram feed grid or error fallback.
 */
export default function InstagramFeed() {
    const { posts, error, fallback, loading } = useInstagramFeed();
    const [selectedPostIndex, setSelectedPostIndex] = useState(null);
    const isMobile = useMediaQuery("(max-width: 640px)");

    /**
     * Opens the Instagram modal for the selected post.
     * @param {number} index - Index of the post to show in modal.
     */
    const openModal = (index) => {
        setSelectedPostIndex(index);
    };

    /**
     * Closes the Instagram modal.
     */
    const closeModal = () => {
        setSelectedPostIndex(null);
    };

    /**
     * Determines which posts to show based on screen size.
     * Shows 4 posts on mobile and 10 on larger screens.
     * @type {Array<Object>}
     */
    const visiblePosts = posts.slice(0, isMobile ? 4 : 10);

    // If still loading, render nothing or a spinner (optional)
    if (loading) {
        return null;
    }

    // Fallback UI: If the Instagram API request fails, display embedded posts as static iframes
    if (error || fallback) {
        return (
            <section className="flex flex-col items-center justify-center text-center py-10 px-2 sm:px-4 bg-white">
                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"} gap-2 w-full max-w-screen-xl`}>
                    <InstagramEmbed src="https://www.instagram.com/p/DH0pat-o2hW/embed" />
                    {!isMobile && (
                        <>
                            <InstagramEmbed src="https://www.instagram.com/p/DHT9SK3IqlY/embed" />
                            <InstagramEmbed src="https://www.instagram.com/p/DF5lKfbop_Y/embed" />
                        </>
                    )}
                </div>
            </section>
        );
    }

    // Instagram feed grid: Displays a responsive set of Instagram posts
    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px">
            {(visiblePosts || []).map((post, index) => {
                const imageUrl = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;

                if (!imageUrl) return null;

                // Individual post preview block with hover effect for icon overlay
                return (
                    <div
                        key={post.id}
                        onClick={() => openModal(index)}
                        className="relative cursor-pointer group"
                    >
                        <Image
                            src={imageUrl}
                            alt="Instagram Post"
                            width={500}
                            height={500}
                            className="w-full h-full aspect-square object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            {post.media_type === "VIDEO" ? (
                                <Image
                                    src="/icons/instagram-reels-icon.svg"
                                    alt="Instagram Reel"
                                    width={32}
                                    height={32}
                                    className="invert"
                                />
                            ) : (
                                <SiInstagram className="w-8 h-8 text-white" />
                            )}
                        </div>
                    </div>
                );
            })}
            {selectedPostIndex !== null && (
                // Instagram modal for detailed view of selected post
                <InstagramModal
                    post={{
                        ...visiblePosts[selectedPostIndex],
                        hashtags: extractHashtags(visiblePosts[selectedPostIndex].caption),
                    }}
                    onClose={closeModal}
                    totalPosts={visiblePosts.length}
                    currentIndex={selectedPostIndex}
                    onNavigate={setSelectedPostIndex}
                    onNext={() =>
                        setSelectedPostIndex((prev) => (prev + 1) % visiblePosts.length)
                    }
                    onPrev={() =>
                        setSelectedPostIndex((prev) =>
                            (prev - 1 + visiblePosts.length) % visiblePosts.length
                        )
                    }
                    showNav={true}
                />
            )}
        </section>
    );
}
