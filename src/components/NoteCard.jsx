"use client";

import { Sprout } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

/**
 * Displays a styled note card from Nana using ShadCN's Card component.
 *
 * Includes title, note text, and an image representing Nana's signature.
 *
 * @component
 *
 * @returns {JSX.Element} A themed card styled to reflect Nana's personality and message.
 */
export default function NoteCard() {
    return (
        <Card className="border-raisin relative mx-auto max-w-4xl rounded-2xl border bg-[#fdf2cf] shadow">
            <CardContent className="px-6 py-8 text-center sm:px-12">
                {/* Card title */}
                <h2 className="mb-6 pt-6 text-2xl sm:text-3xl">
                    A Note From Nana <em>(aka, Nutrinana)</em>
                </h2>

                {/* Card content */}
                <p className="text-base leading-relaxed text-gray-900 sm:text-lg">
                    Hey there! I&apos;m Nana, but you can call me Nutrinana. What started as a way
                    to sneak some healthy granola into my kids&apos; breakfasts has blossomed into
                    this incredible journey of sharing my passion for wholesome, no-nonsense food
                    with all of you. Every batch of granola I make is like a little love letter to
                    your taste buds— packed with nutrition and free from anything artificial.
                    Whether you&apos;re here for the flavour or the health benefits, I&apos;m
                    thrilled to have you join the Nutrinana family. Now, let&apos;s make breakfast
                    the best meal of the day!
                </p>

                {/* Signature image */}
                <div className="mt-8">
                    <Image
                        src="/about/nana-signature.png"
                        alt="With love and a sprinkle of granola, Nana x"
                        width={500}
                        height={150}
                        className="mx-auto object-contain"
                    />
                </div>
            </CardContent>

            {/* Decorative elements */}
            <Sprout className="text-raisin absolute top-6 left-1/2 z-10 h-9 w-9 -translate-x-1/2 fill-current" />
        </Card>
    );
}
