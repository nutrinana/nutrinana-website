"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Closing Call-to-Action section for the website.
 *
 * Encourages users to take action with customizable header, description, and button.
 *
 * @component
 *
 * @param {Object} props - The properties for the ClosingCTA component.
 * @param {string} props.header - The main heading text.
 * @param {string|React.ReactNode} props.description - The description text or JSX content.
 * @param {Object} props.button - The button configuration.
 * @param {string} props.button.text - The button text.
 * @param {string} props.button.href - The button link URL.
 * @param {string} [props.button.variant='green'] - The button variant.
 *
 * @returns {JSX.Element} The rendered ClosingCTA component.
 */
export default function ClosingCTA({ header, description, button }) {
    return (
        <div className="bg-light-green/40 rounded-2xl px-6 py-12 text-center sm:px-12">
            <h2 className="font-display mb-4 text-lg sm:text-2xl lg:text-3xl">{header}</h2>
            <p className="text-raisin/80 mb-8 text-sm sm:text-base lg:text-lg">{description}</p>
            <Button
                variant={button.variant || "green"}
                size="sm"
                className="text-xs sm:h-10 sm:px-6 sm:text-sm"
                asChild
            >
                <Link href={button.href}>{button.text}</Link>
            </Button>
        </div>
    );
}
