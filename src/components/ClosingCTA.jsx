"use client";

import Link from "next/link";

/**
 * Closing Call-to-Action section for the website.
 *
 * Encourages users to try Nutrinana's Activated Granola with a brief message and a prominent button.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered ClosingCTA component.
 */
export default function ClosingCTA() {
    return (
        <section className="bg-light-yellow mx-auto my-16 max-w-4xl rounded-2xl px-6 py-12 text-center sm:px-12">
            <h2 className="font-display mb-4 text-2xl sm:text-3xl">
                Ready to taste Nutrinana’s Activated Granola?
            </h2>
            <p className="text-raisin/80 mb-8 text-base sm:text-lg">
                Handcrafted with love and honest ingredients, our granola is made to nourish your
                mornings and delight your taste buds.
            </p>
            <Link
                href="/activated-granola"
                className="bg-green hover:bg-green/90 inline-block rounded-xl px-6 py-3 font-semibold text-white transition"
            >
                Shop Activated Granola
            </Link>
        </section>
    );
}
