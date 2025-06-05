'use client';

import { useEffect, useState } from 'react';
import { decode } from 'he';
import { Star, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function RecentReviewCards() {
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

    if (reviews.length === 0) {
        return null;
    }

    return (
        <section className="w-full px-4 py-10 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* TODO: Will probably need to add a loading state here with maybe caching and potentially empty state */}
                <h2 className="text-2xl font-bold mb-6">What people are saying</h2>
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {reviews.slice(0, 9).map((review) => (
                    // bg-[var(--color-green)]/20
                    <div key={review.id} className="bg-[var(--color-light-green)]/40 p-6 break-inside-avoid">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    {Array.from({ length: review.score }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  {new Date(review.created_at).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: '2-digit',
                                  })}
                                </span>
                            </div>
                            <h3 className="text-xl text-[var(--color-raisin)] font-bold mb-1">{review.title}</h3>
                            <p className="text-sm text-gray-700 mb-2">
                                {decode(review.content).length > 180
                                    ? <>
                                        {decode(review.content).slice(0, 180)}... <span className="text-green-700 cursor-pointer hover:underline">Read more</span>
                                      </>
                                    : decode(review.content)}
                            </p>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-2">
                            <span className="text-sm text-[var(--color-green)] ">{review.user.display_name}</span>
                            {review.user.reviewer_type === 'verified_reviewer' && (
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
                    </div>
                ))}
                </div>
                <div className="flex justify-end mt-6">
                    <Link href="/reviews" className="text-[var(--color-raisin)] relative inline-flex items-center gap-1 transition-colors duration-200 hover:text-[var(--color-green)] hover:font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[var(--color-green)] after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100">
                        See more reviews <ArrowDown className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}