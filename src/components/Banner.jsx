"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBanner } from "@/hooks/useBanner";

const messages = [
    { text: "Our New Website is Live! Explore now! 🚀" },
    { text: "Find out more about Nutrinana and our journey!", link: "#", linkText: "Learn More", emoji: "🤔👩🏾‍🍳" },
    { text: "Shop now on DELLI or The Black Farmer!", link: "#", linkText: "Shop Now", emoji: "🥰🛍️" }
];

export default function Banner() {
    const { currentIndex, prevMessage, nextMessage } = useBanner(messages);

    return (
        // TODO: Change the background color of the banner here if needed, bg-[#XXXXXX]
        <div className="bg-[#E5BD68] text-black text-sm py-2 px-4 flex items-center justify-between relative">
            {/* Left Arrow */}
            {/* TODO: Change the colour of arrow before hover, text-black */}
            <Button variant="ghost" size="icon" onClick={prevMessage} className="text-gray-700 hover:text-gray-900 hover:bg-transparent">
                <ArrowLeft size={20} />
            </Button>

            {/* Banner Content */}
            <p className="flex-1 text-center">
                <strong>{messages[currentIndex].text}</strong>{" "}
                {messages[currentIndex].link && (
                    <>
                        {/* TODO: Change the hover effect colour */}
                        <Link href={messages[currentIndex].link} className="underline hover:text-green-700">
                            {messages[currentIndex].linkText}
                        </Link>{" "}
                        {messages[currentIndex].emoji}
                    </>
                )}
            </p>

            {/* Right Arrow */}
            {/* TODO: Change the colour of arrow before hover, text-black */}
            <Button variant="ghost" size="icon" onClick={nextMessage} className="text-gray-700 hover:text-gray-900 hover:bg-transparent">
                <ArrowRight size={20} />
            </Button>
        </div>
    );
}