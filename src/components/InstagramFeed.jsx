"use client";

import { useEffect, useState } from "react";

export default function InstagramFeed() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);

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
    ];

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

    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(posts || []).map((post) => (
                <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-2xl shadow hover:scale-105 transition-transform"
                >
                    <img
                        src={post.media_url}
                        alt={post.caption || "Instagram post"}
                        className="w-full h-auto object-cover"
                    />
                </a>
            ))}
        </section>
    );
}
