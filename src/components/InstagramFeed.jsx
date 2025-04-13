"use client";

import { useEffect, useState } from "react";
import InstagramModal from "./InstagramModal";
import { SiInstagram } from "react-icons/si";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function InstagramFeed() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [selectedPostIndex, setSelectedPostIndex] = useState(null);
    const isMobile = useMediaQuery("(max-width: 640px)");

    // Mock fallback data
    const mockPosts = [
        {
            id: "1",
            media_url: "/fallback1.jpg",
            permalink: "https://instagram.com/nutrinanaa",
            caption: "Mock caption 1",
        },
        {
            id: "2",
            media_url: "/fallback2.jpg",
            permalink: "https://instagram.com/nutrinanaa",
            caption: "Mock caption 2",
        },
        {
            id: "3",
            media_url: "/fallback3.jpg",
            permalink: "https://instagram.com/nutrinanaa",
            caption: "Mock caption 3",
        },
        {
            id: "4",
            media_url: "/fallback4.jpg",
            permalink: "https://instagram.com/nutrinanaa",
            caption: "Mock caption 4",
        },
        {
            id: "5",
            media_url: "/fallback5.jpg",
            permalink: "https://instagram.com/nutrinanaa",
            caption: "Mock caption 5",
        },
    ];

    const extractHashtags = (text) => {
        if (!text) return [];
        return text.match(/#[a-zA-Z0-9_]+/g) || [];
    };

    useEffect(() => {
        async function fetchInstagramPosts() {
            try {
                const res = await fetch("/api/instagram-feed");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error("Instagram feed error:", err);
                setError(true);
                setPosts(mockPosts);
            }
        }

        fetchInstagramPosts();
    }, []);

    const openModal = (index) => {
        setSelectedPostIndex(index);
    };

    const closeModal = () => {
        setSelectedPostIndex(null);
    };

    const visiblePosts = posts.slice(0, isMobile ? 4 : 10);

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
