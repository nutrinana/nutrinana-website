'use client';

import { useState } from 'react';
import { decode } from 'he';
import { Star, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import styles from '@/styles/RecentReviewCards.module.css';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import useRecentReviewCards from '@/hooks/useRecentReviewCards';
import useWindowWidth from '@/hooks/useWindowWidth';

/**
 * RecentReviewCards component displays a grid of recent reviews.
 * It fetches reviews from a custom hook and displays them in a responsive masonry layout.
 * 
 * @returns {JSX.Element} The rendered RecentReviewCards component.
 */
export default function RecentReviewCards() {
    // State to manage expanded reviews
    const [expandedReviews, setExpandedReviews] = useState({});

    // Custom hooks to get window width and recent reviews
    const windowWidth = useWindowWidth();
    const reviews = useRecentReviewCards();

    // Define the breakpoint columns for the masonry layout
    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        640: 1,
    };

    // If there are no reviews, display a message
    if (reviews.length === 0) {
        return (
            <div className="w-full px-4 py-10 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">What people are saying</h2>
                    <p className="text-gray-600">No reviews available just yet. Be the first to leave one!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Section title */}
            {/* TODO: cange to quirky header */}
            <h2 className="text-2xl font-bold mb-6">What people are saying</h2>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={styles.myMasonryGrid}
                columnClassName={styles.myMasonryGridColumn}
            >
            {reviews
                .slice(0, windowWidth < 640 ? 5 : 9)
                .map((review, i) => (
                <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-[var(--color-light-green)]/40 p-6 break-inside-avoid"
                >
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            {/* Review stars*/}
                            <div className="flex items-center">
                                {Array.from({ length: review.score }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                                ))}
                            </div>
                            {/* Review date */}
                            <span className="text-sm text-gray-600">
                                {formatDate(review.created_at, 'dd/mm/yyyy')}
                            </span>
                        </div>
                        {/* Review title and content */}
                        <h3 className="text-xl text-[var(--color-raisin)] font-bold mb-1">{review.title}</h3>
                        <p className="text-sm text-gray-700 mb-2">
                            {decode(review.content).length > 180 ? (
                            <>
                                {expandedReviews[review.id]
                                ? decode(review.content)
                                : `${decode(review.content).slice(0, 180)}...`}
                                <button
                                onClick={() =>
                                    setExpandedReviews(prev => ({
                                    ...prev,
                                    [review.id]: !prev[review.id]
                                    }))
                                }
                                className="text-[var(--color-green)] cursor-pointer hover:underline ml-1 font-bold text-xs"
                                >
                                {expandedReviews[review.id] ? 'Read less' : 'Read more'}
                                </button>
                            </>
                            ) : (
                            decode(review.content)
                            )}
                        </p>
                    </div>
                    {/* Review details and verified badge */}
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                        <span className="text-sm text-[var(--color-green)] ">{review.user.display_name}</span>
                        {review.user.user_type === 'User' && (
                            <span className="flex items-center ml-2">
                                <span className="mx-1 text-gray-500 text-sm">|</span>
                                <span className="text-[var(--color-raisin)] text-xs flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="var(--color-green)">
                                        <circle cx="10" cy="10" r="10" fill="var(--color-green)" />
                                        <path d="m7 10 2 2 4-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Verified Reviewer
                                </span>
                            </span>
                        )}
                    </div>
                </motion.div>
            ))}
            </Masonry>
            {/* Link to see more reviews */}
            <div className="flex justify-end mt-6">
                <Link href="#more-reviews" className="text-[var(--color-raisin)] relative inline-flex items-center gap-1 transition-colors duration-200 hover:text-[var(--color-green)] hover:font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[var(--color-green)] after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100">
                    See more reviews <ArrowDown className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}