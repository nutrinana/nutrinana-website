"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBanner } from "@/hooks/useBanner";

/**
 * Predefined banner messages.
 * Each message can include text, a link, link text, and emojis.
 */
const messages = [
    { text: "Our New Website is Live! Explore now!", link:"#", linkText:"", emoji: "🚀" },
    { text: "Find out more about Nutrinana!", link: "#", linkText: "Learn More", emoji: "🤔👩🏾‍🍳" },
    { text: "Shop now on DELLI or The Black Farmer!", link: "#", linkText: "Shop Now", emoji: "🥰🛍️" }
];

/**
 * Banner functional component that renders the banner UI with navigation arrows.
 * It uses the useBanner hook to manage the current message index and navigation.
 * 
 * @returns {JSX.Element} The rendered banner component.
 */
export default function Banner() {
    // Get current message index and navigation functions from the useBanner hook
    const { currentIndex, prevMessage, nextMessage } = useBanner(messages);

    return (
        <div className="bg-[var(--color-pink)] text-black text-sm py-0 px-4 flex items-center justify-between relative">
            {/* Left Arrow Button to navigate to previous message */}
            <button  className="outline-arrow" onClick={prevMessage}>
                <ArrowLeft size={20} /> 
            </button>
            {/* Banner Content: message text, optional link and emoji */}
            <p className="flex-1 text-center whitespace-nowrap overflow-hidden text-ellipsis">
                <strong>{messages[currentIndex].text}</strong>{" "}
                {messages[currentIndex].link && (
                    <>
                        <Link href={messages[currentIndex].link} className="underline hover:text-gray-100">
                            {messages[currentIndex].linkText}
                        </Link>{" "}
                        {/* {messages[currentIndex].emoji} */}
                        <span className="text-lg">{messages[currentIndex].emoji}</span> {/* Increased emoji size */}
                    </>
                )}
            </p>

            {/* Right Arrow Button to navigate to next message */}
            <button  className="outline-arrow" onClick={nextMessage}>
                <ArrowRight size={20} /> 
            </button>
        </div>
    );
}