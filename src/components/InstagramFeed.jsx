"use client";

import { useEffect, useState } from "react";
import { useInstagramFeed } from "@/hooks/useInstagramFeed";
import InstagramModal from "./InstagramModal";
import { SiInstagram } from "react-icons/si";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { extractHashtags } from "@/lib/utils";

export default function InstagramFeed() {
    const { posts, error } = useInstagramFeed();
    const [selectedPostIndex, setSelectedPostIndex] = useState(null);
    const isMobile = useMediaQuery("(max-width: 640px)");

    const openModal = (index) => {
        setSelectedPostIndex(index);
    };

    const closeModal = () => {
        setSelectedPostIndex(null);
    };

    const visiblePosts = posts.slice(0, isMobile ? 4 : 10);

    if (error) {
        return (
            <section className="flex flex-col items-center justify-center text-center py-10 px-2 sm:px-4 bg-white">
                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"} gap-2 w-full max-w-screen-xl`}>
                    <iframe
                        src="https://www.instagram.com/p/DH0pat-o2hW/embed"
                        className="w-full aspect-square border shadow-md sm:max-w-full"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency
                    />
                    {!isMobile && (
                        <>
                            <iframe
                                src="https://www.instagram.com/p/DHT9SK3IqlY/embed"
                                className="w-full aspect-square border shadow-md sm:max-w-full"
                                frameBorder="0"
                                scrolling="no"
                                allowTransparency
                            />
                            <iframe
                                src="https://www.instagram.com/p/DF5lKfbop_Y/embed"
                                className="w-full aspect-square border shadow-md sm:max-w-full"
                                frameBorder="0"
                                scrolling="no"
                                allowTransparency
                            />
                        </>
                    )}
                </div>
                <a
                    href="https://www.instagram.com/nutrinanaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-blue-600 hover:underline text-sm"
                >
                    Visit @nutrinanaa on Instagram →
                </a>
            </section>
        );
    }

    return (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px">
            {(visiblePosts || []).map((post, index) => {
                const imageUrl = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;

                if (!imageUrl) return null;

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
