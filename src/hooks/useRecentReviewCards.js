import { useEffect, useState } from "react";

/**
 * Custom hook to fetch recent review cards from the Yotpo API.
 *
 * It retrieves the latest reviews and returns them as an array.
 *
 * @hook
 *
 * @returns {Array} An array of recent review cards.
 */
export default function useRecentReviewCards() {
    // State to hold the fetched reviews
    const [reviews, setReviews] = useState([]);

    // Fetch recent reviews from the Yotpo API
    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch("/api/yotpo/recent-reviews");
                const data = await res.json();
                setReviews(data.reviews || []);
            } catch (err) {
                console.error("Failed to fetch recent reviews", err);
            }
        }
        // Call the fetch function to get reviews when the component mounts
        fetchReviews();
    }, []);

    // Return the fetched reviews
    return reviews;
}
