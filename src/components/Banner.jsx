"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useBanner } from "@/hooks/useBanner";

/**
 * Predefined banner messages.
 * Each message can include text, a link, link text, and emojis.
 */
const messages = [
    { text: "Our New Website is Live! Explore now!", link: "#", linkText: "", emoji: "🚀" },
    { text: "Find out more about Nutrinana!", link: "#", linkText: "Learn More", emoji: "🤔👩🏾‍🍳" },
    {
        text: "Shop now on DELLI or The Black Farmer!",
        link: "#",
        linkText: "Shop Now",
        emoji: "🥰🛍️",
    },
];

/**
 * Banner functional component that renders the banner UI with navigation arrows.
 *
 * It uses the useBanner hook to manage the current message index and navigation.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered banner component.
 */
export default function Banner() {
    // Get current message index and navigation functions from the useBanner hook
    const { currentIndex, prevMessage, nextMessage } = useBanner(messages);

    return (
        <div className="text-raisin bg-pink relative flex items-center justify-between px-4 py-0 text-sm">
            {/* Left Arrow Button to navigate to previous message */}
            <Button variant="arrow" onClick={prevMessage}>
                <ArrowLeft size={20} />
            </Button>
            {/* Banner Content: message text, optional link and emoji */}
            <p className="flex-1 overflow-hidden text-center text-ellipsis whitespace-nowrap">
                <strong>{messages[currentIndex].text}</strong>{" "}
                {messages[currentIndex].link && (
                    <>
                        <Link
                            href={messages[currentIndex].link}
                            className="underline hover:text-gray-100"
                        >
                            {messages[currentIndex].linkText}
                        </Link>{" "}
                        {/* {messages[currentIndex].emoji} */}
                        <span className="text-lg">{messages[currentIndex].emoji}</span>{" "}
                        {/* Increased emoji size */}
                    </>
                )}
            </p>

            {/* Right Arrow Button to navigate to next message */}
            <Button variant="arrow" onClick={nextMessage}>
                <ArrowRight size={20} />
            </Button>
        </div>
    );
}
