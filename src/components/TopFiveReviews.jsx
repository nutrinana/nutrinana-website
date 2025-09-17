"use client";

import { motion, AnimatePresence } from "framer-motion";
import { decode } from "he";
import { Star, MoveRight } from "lucide-react";
import Link from "next/link";

import { useAutoRotateIndex } from "@/hooks/useAutoRotateIndex";
import useRecentReviewCards from "@/hooks/useRecentReviewCards";
import { formatDate } from "@/lib/utils";

/**
 * TopFiveReviews displays the top five reviews by score and date, showing one card at a time with navigation and auto-rotation features.
 *
 * @component
 *
 * @param {number} props.autoRotateMs - Auto-rotate interval in milliseconds.
 * @param {string} props.className - Additional class names for the component.
 *
 * @returns {JSX.Element} TopFiveReviews component.
 */
export default function TopFiveReviews({ autoRotateMs = 7000 }) {
    const reviews = useRecentReviewCards();
    const topFive = Array.isArray(reviews) ? reviews.slice(0, 5) : [];

    const [index, setPaused] = useAutoRotateIndex(topFive.length, autoRotateMs);

    if (topFive.length === 0) {
        return (
            <div className="p-6">
                <p className="text-raisin/70 text-sm">
                    No reviews yet. Be the first to share your thoughts!
                </p>
            </div>
        );
    }

    const review = topFive[index];

    return (
        <section
            aria-labelledby="top-reviews-title"
            className="flex flex-col p-6"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <h3 className="font-handwritten mb-4 text-center text-xl">Activated Thoughts!</h3>
            <div className="relative">
                {/* Card */}
                <div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="rounded-xl bg-[var(--color-light-green,#eaf6ee)]/40 p-5"
                        >
                            <header className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                {/* Stars */}
                                <div className="flex">
                                    {Array.from({ length: review.score }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="mr-1 h-4 w-4 fill-yellow-400 stroke-yellow-400"
                                        />
                                    ))}
                                </div>
                                <span className="mt-1 text-sm text-gray-600 sm:mt-0">
                                    {formatDate(review.created_at, "dd/mm/yyyy")}
                                </span>
                            </header>

                            <h4 className="font-display text-raisin mb-1 text-base sm:text-lg">
                                {decode(review.title)}
                            </h4>
                            <p className="text-sm text-gray-700">
                                {decode(review.content).length > 100
                                    ? decode(review.content).slice(0, 100) + "..."
                                    : decode(review.content)}
                            </p>

                            <footer className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                                <span className="text-green">{review.user.display_name}</span>
                                {review.user.user_type === "User" && (
                                    <>
                                        <span className="mx-1 text-xs text-gray-500">|</span>
                                        <span className="text-raisin flex items-center gap-1 text-xs">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3 w-3"
                                                viewBox="0 0 20 20"
                                                fill="var(--color-green)"
                                                aria-hidden="true"
                                            >
                                                <circle cx="10" cy="10" r="10" />
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
                                    </>
                                )}
                            </footer>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <Link
                href="/reviews"
                className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-[var(--color-green)] hover:underline"
            >
                See more reviews <MoveRight className="h-4 w-4 align-middle" />
            </Link>
        </section>
    );
}
