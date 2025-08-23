"use client";

import { Pin, Sprout } from "lucide-react";
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
export default function NanaNoteCard() {
    return (
        <Card className="relative mx-auto max-w-4xl rounded-2xl border border-black bg-[#fdf2cf] shadow">
            <CardContent className="px-6 py-8 text-center sm:px-12">
                {/* Card title */}
                <h2 className="mb-6 pt-6 text-2xl font-bold sm:text-3xl">
                    A Note From Nana (aka, Nutrinana)
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
                    {/* <Image
                        src="/about/nana-signature-placeholder.png"
                        alt="With love and a sprinkle of granola, Nana x"
                        width={300}
                        height={100}
                        className="mx-auto object-contain"
                    /> */}
                    <p className="font-script mx-auto text-2xl text-black">
                        With love and a sprinkle of granola,
                        <br />
                        Nana x
                    </p>
                </div>
            </CardContent>

            {/* Decorative elements */}
            {/* TODO: Sprout or Pin? */}
            <Sprout className="absolute top-6 left-1/2 z-10 h-9 w-9 -translate-x-1/2 fill-current text-black" />
            {/* <Pin className="absolute -top-3 -left-3 rotate-[-45deg] text-black w-9 h-9 z-10 fill-current" /> */}
        </Card>
    );
}
