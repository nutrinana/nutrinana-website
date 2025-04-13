import { useState, useEffect } from "react";

export function useInstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

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
      }
    }

    fetchInstagramPosts();
  }, []);

  return { posts, error };
}