import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch and return the average product rating from Yotpo API.
 *
 * @param {string} productId - The external product ID for which to fetch the rating.
 * 
 * @returns {string|null} The average score of the product formatted to one decimal place, or null if unavailable.
 */
export default function useProductRating(productId) {
    const [rating, setRating] = useState(null);

    useEffect(() => {
        // Check if productId is provided 
        if (!productId) return;

        const fetchRating = async () => {
            try {
                // Fetch the average rating from the Yotpo API
                const res = await fetch(`/api/yotpo/average-rating?productId=${productId}`);
                const data = await res.json();

                // Check if the response is ok and contains the average score
                if (res.ok && data.average_score != null) {
                    setRating(Number(data.average_score).toFixed(1));
                } else {
                    console.warn('Rating data missing or request failed');
                }
            } catch (err) {
                // Handle any errors that occur during the fetch
                console.error('Error fetching rating:', err);
            }
        };

        fetchRating();
    }, [productId]);

    return rating;
}