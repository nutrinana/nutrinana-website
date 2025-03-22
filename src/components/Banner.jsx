"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBanner } from "@/hooks/useBanner";

const messages = [
    { text: "Our New Website is Live! Explore now!", link:"#", linkText:"", emoji: "🚀" },
    { text: "Find out more about Nutrinana!", link: "#", linkText: "Learn More", emoji: "🤔👩🏾‍🍳" },
    { text: "Shop now on DELLI or The Black Farmer!", link: "#", linkText: "Shop Now", emoji: "🥰🛍️" }
];

export default function Banner() {
    const { currentIndex, prevMessage, nextMessage } = useBanner(messages);

    return (
        <div className="bg-[var(--color-pink)] text-black text-sm py-0 px-4 flex items-center justify-between relative">
            {/* Left Arrow */}
            <Button variant="ghost" size="icon" onClick={prevMessage} className="text-black hover:text-gray-100 hover:bg-transparent">
                <ArrowLeft size={20} />
            </Button>

            {/* Banner Content */}
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

            {/* Right Arrow */}
            <Button variant="ghost" size="icon" onClick={nextMessage} className="text-black hover:text-gray-100 hover:bg-transparent">
                <ArrowRight size={20} />
            </Button>
        </div>
    );
}