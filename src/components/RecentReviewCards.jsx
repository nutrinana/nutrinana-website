"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { decode } from "he";
import { Star, ArrowDown } from "lucide-react";
import Link from "next/link";
import Masonry from "react-masonry-css";

import useRecentReviewCards from "@/hooks/useRecentReviewCards";
import useWindowWidth from "@/hooks/useWindowWidth";
import { formatDate } from "@/lib/utils";
import styles from "@/styles/RecentReviewCards.module.css";

/**
 * RecentReviewCards component displays a grid of recent reviews.
 *
 * It fetches reviews from a custom hook and displays them in a responsive masonry layout.
 *
 * @component
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
            <div className="w-full bg-white px-4 py-10">
                <div className="mx-auto max-w-6xl text-center">
                    <h2 className="mb-4 text-2xl">What people are saying</h2>
                    <p className="text-gray-600">
                        No reviews available just yet. Be the first to leave one!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl">
            {/* Section title */}
            {/* TODO: change to quirky header */}
            <h2 className="mb-6 text-2xl">What people are saying</h2>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className={styles.myMasonryGrid}
                columnClassName={styles.myMasonryGridColumn}
            >
                {reviews.slice(0, windowWidth < 640 ? 5 : 9).map((review, i) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="break-inside-avoid bg-[var(--color-light-green)]/40 p-6"
                    >
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                {/* Review stars*/}
                                <div className="flex items-center">
                                    {Array.from({ length: review.score }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="mr-1 h-4 w-4 fill-yellow-400 stroke-yellow-400"
                                        />
                                    ))}
                                </div>
                                {/* Review date */}
                                <span className="text-sm text-gray-600">
                                    {formatDate(review.created_at, "dd/mm/yyyy")}
                                </span>
                            </div>
                            {/* Review title and content */}
                            <h3 className="font-display mb-1 text-lg text-[var(--color-raisin)]">
                                {review.title}
                            </h3>
                            <p className="mb-2 text-sm text-gray-700">
                                {decode(review.content).length > 180 ? (
                                    <>
                                        {expandedReviews[review.id]
                                            ? decode(review.content)
                                            : `${decode(review.content).slice(0, 180)}...`}
                                        <button
                                            onClick={() =>
                                                setExpandedReviews((prev) => ({
                                                    ...prev,
                                                    [review.id]: !prev[review.id],
                                                }))
                                            }
                                            className="ml-1 cursor-pointer text-xs font-bold text-[var(--color-green)] hover:underline"
                                        >
                                            {expandedReviews[review.id] ? "Read less" : "Read more"}
                                        </button>
                                    </>
                                ) : (
                                    decode(review.content)
                                )}
                            </p>
                        </div>
                        {/* Review details and verified badge */}
                        <div className="mt-2 flex items-center text-sm text-gray-600">
                            <span className="text-sm text-[var(--color-green)]">
                                {review.user.display_name}
                            </span>
                            {review.user.user_type === "User" && (
                                <span className="ml-2 flex items-center">
                                    <span className="mx-1 text-sm text-gray-500">|</span>
                                    <span className="flex items-center gap-1 text-xs text-[var(--color-raisin)]">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3"
                                            viewBox="0 0 20 20"
                                            fill="var(--color-green)"
                                        >
                                            <circle
                                                cx="10"
                                                cy="10"
                                                r="10"
                                                fill="var(--color-green)"
                                            />
                                            <path
                                                d="m7 10 2 2 4-4"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
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
            <div className="mt-6 flex justify-end">
                <Link
                    href="#more-reviews"
                    className="relative inline-flex items-center gap-1 text-[var(--color-raisin)] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-green)] after:transition-transform after:duration-300 after:content-[''] hover:font-semibold hover:text-[var(--color-green)] hover:after:scale-x-100"
                >
                    See more reviews <ArrowDown className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
