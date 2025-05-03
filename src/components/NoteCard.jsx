"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Pin, Sprout } from "lucide-react";

/**
 * Displays a styled note card from Nana using ShadCN's Card component.
 * Includes title, note text, and an image representing Nana's signature.
 *
 * @returns {JSX.Element} A themed card styled to reflect Nana's personality and message.
 */
export default function NanaNoteCard() {
  return (
    <Card className="bg-[#fdf2cf] rounded-2xl shadow border border-black relative max-w-4xl mx-auto">
      <CardContent className="py-8 px-6 sm:px-12 text-center">
        <h2 className="pt-6 text-2xl sm:text-3xl font-bold font-handwriting mb-6">
          A Note From Nana (aka, Nutrinana)
        </h2>

        <p className="text-base sm:text-lg leading-relaxed text-gray-900">
          Hey there! I’m Nana, but you can call me Nutrinana. What started as a way to sneak
          some healthy granola into my kids’ breakfasts has blossomed into this incredible
          journey of sharing my passion for wholesome, no-nonsense food with all of you.
          Every batch of granola I make is like a little love letter to your taste buds—
          packed with nutrition and free from anything artificial. Whether you're here for the
          flavour or the health benefits, I’m thrilled to have you join the Nutrinana family.
          Now, let’s make breakfast the best meal of the day!
        </p>

        <div className="mt-8">
          <Image
            src="/about/nana-signature-placeholder.png"
            alt="With love and a sprinkle of granola, Nana x"
            width={300}
            height={100}
            className="mx-auto object-contain"
          />
        </div>
      </CardContent>

        {/* TODO: Sprout or Pin? */}
      <Sprout className="absolute top-6 left-1/2 -translate-x-1/2 text-black w-9 h-9 z-10 fill-current" />
      {/* <Pin className="absolute -top-3 -left-3 rotate-[-45deg] text-black w-9 h-9 z-10 fill-current" /> */}
    </Card>
  );
}
