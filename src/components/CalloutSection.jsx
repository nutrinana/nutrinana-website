"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

/**
 * CalloutSection component.
 *
 * Renders a section with a heading and a CTA button.
 *
 * @component
 *
 * @param {Object} props - The properties for the CalloutSection component.
 * @param {string} props.heading - The headline text to display.
 * @param {string} props.buttonText - The text inside the button.
 * @param {string} props.buttonLink - The href the button should link to.
 * @param {string} [props.variant] - The button variant.
 *
 * @returns {JSX.Element} The rendered CalloutSection component.
 */
export default function CalloutSection({ heading, buttonText, buttonLink, variant }) {
    const router = useRouter();

    return (
        <div className="text-center">
            <h2 className="font-heading mb-4 text-3xl font-semibold sm:text-4xl">{heading}</h2>
            <Button variant={variant} size="lg" onClick={() => router.push(buttonLink)}>
                {buttonText}
            </Button>
        </div>
    );
}
