import { useState, useEffect } from "react";

/**
 * Custom hook to fetch Instagram posts from the API.
 *
 * Falls back to static embeds if the API fails.
 *
 * @hook
 *
 * @returns {Object} - Contains:
 * @returns {Array} Posts: The fetched Instagram posts.
 * @returns {boolean} Error: Whether an error occurred during fetching.
 * @returns {boolean} Fallback: Whether the fallback content is being shown.
 * @returns {boolean} Loading: Whether the posts are still being loaded.
 */
export function useInstagramFeed() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);
    const [fallback, setFallback] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInstagramPosts() {
            // Start fetching posts from the API
            try {
                const res = await fetch("/api/instagram-feed");
                // If the response is not OK, throw an error
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                // Parse the response JSON and update the posts state
                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error("Malformed data");
                }

                setPosts(data);
            } catch (err) {
                // Log the error and activate fallback mode
                console.error("Instagram feed error:", err);

                setError(true);
                setFallback(true);
                setPosts([]);
            } finally {
                // Always stop the loading spinner, whether the fetch succeeded or failed
                setLoading(false);
            }
        }

        fetchInstagramPosts();
    }, []);

    return { posts, error, fallback, loading };
}
