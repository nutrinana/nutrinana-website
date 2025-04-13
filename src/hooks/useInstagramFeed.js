import { useState, useEffect } from "react";

/**
 * Custom hook to fetch Instagram posts from the API.
 * Falls back to static embeds if the API fails.
 * 
 * @returns {Object} { posts: Array, error: boolean, fallback: boolean, loading: boolean }
 */
export function useInstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, []);

  return { posts, error, fallback, loading };
}