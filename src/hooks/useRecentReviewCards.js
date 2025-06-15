import { useEffect, useState } from 'react';

export default function useRecentReviewCards() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch('/api/yotpo/recent-reviews');
                const data = await res.json();
                setReviews(data.reviews || []);
            } catch (err) {
                console.error('Failed to fetch recent reviews', err);
            }
        }

        fetchReviews();
    }, []);

    return reviews;
}