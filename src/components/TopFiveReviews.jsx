"use client";

import { useMemo, useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { decode } from "he";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
export default function TopFiveReviews({ autoRotateMs = 7000, className = "" }) {
    const reviews = useRecentReviewCards();

    const topFive = useMemo(() => {
        if (!Array.isArray(reviews)) {
            return [];
        }
        const sorted = [...reviews].sort((a, b) => {
            // Higher score first
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            // Most recent first
            const bd = new Date(b.created_at).getTime();
            const ad = new Date(a.created_at).getTime();

            return bd - ad;
        });

        return sorted.slice(0, 5);
    }, [reviews]);

    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || topFive.length <= 1) {
            return;
        }
        const t = setInterval(
            () => {
                setIndex((i) => (i + 1) % topFive.length);
            },
            Math.max(2500, autoRotateMs)
        );

        return () => clearInterval(t);
    }, [paused, autoRotateMs, topFive.length]);

    if (topFive.length === 0) {
        return (
            <div className={["p-6", className].join(" ")}>
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
            className={["flex flex-col p-6", className].join(" ")}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="relative">
                {/* Card */}
                <div className="px-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="rounded-xl bg-[var(--color-light-green,#eaf6ee)]/40 p-5"
                        >
                            <header className="mb-2 flex items-center justify-between">
                                {/* Stars */}
                                <div className="flex">
                                    {Array.from({ length: review.score }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className="mr-1 h-4 w-4 fill-yellow-400 stroke-yellow-400"
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {formatDate(review.created_at, "dd/mm/yyyy")}
                                </span>
                            </header>

                            <h4 className="font-display text-raisin mb-1 text-lg">
                                {review.title}
                            </h4>
                            <p className="text-sm text-gray-700">{decode(review.content)}</p>

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

            {/* Dots */}
            <div className="mt-4 flex justify-center gap-2">
                {topFive.map((r, i) => (
                    <button
                        key={r.id}
                        aria-label={`Go to review ${i + 1}`}
                        aria-current={i === index ? "true" : "false"}
                        onClick={() => setIndex(i)}
                        className={`h-2 w-6 rounded-full transition ${
                            i === index
                                ? "bg-[var(--color-green)]"
                                : "bg-[var(--color-grey)]/60 hover:bg-[var(--color-grey)]"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
