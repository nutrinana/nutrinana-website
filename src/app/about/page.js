// About Page for Nutrinana
"use client";

import NoteCard from "@/components/NoteCard";
import SideSlider from "@/components/SideSlider";
import Timeline from "@/components/Timeline";

const sideSlides = [
    {
        image: "/about/about-slide1.jpg",
        alt: "Nana at Silverhand Farmers Market",
    },
    {
        image: "/about/about-slide2.jpg",
        alt: "Granola display on a table",
    },
    {
        image: "/about/about-slide3.jpg",
        alt: "Nana at The Black Farmer Farmshop, White City",
    },
];

const sideSliderTitle = "Who We Are";
const sideSliderDescription = (
    <>
        Nutrinana started in Nana Odamo’s kitchen, where she whipped up granola so good, even her
        kids couldn’t keep it to themselves—and neither could the neighbours! What began as a small,
        family-run operation quickly grew, fuelled by Nana’s mission to prove that nutritious, tasty
        granola doesn’t need a sprinkle of sugar or a dash of anything artificial. Our secret?
        “Activated” nuts and seeds that have gone through a special soaking process to make them as
        easy on your digestion as they are on your taste buds.
        <br />
        <br />
        At Nutrinana, we’re all about keeping it real—literally. We’re a family-run business with
        Nana’s kids handling the social media and website (when they’re not busy asking for more
        granola). We’re on a mission to become your go-to healthy breakfast alternative, so whether
        you’re looking to ditch the sugar or dodge the bloat, we’ve got you covered. Plus, when
        Nana’s not making granola, she’s growing her own veggies—because, of course, she is!
    </>
);

const timelineData = [
    {
        year: "2021",
        text: "The magic begins! Nana perfects her activated granola recipe and starts selling it to her local neighbourhood.",
        image: "/timeline/2021.jpg",
    },
    {
        year: "2022",
        text: "Nutrinana goes digital! The Activated Granola hits the virtual shelves on DELLI, making its way to kitchens across the UK.",
        image: "/timeline/2022.jpeg",
    },
    {
        year: "2023",
        text: "Nana joins forces with a group of green-thumbed garden enthusiasts to grow her own veggies in a shared allotment. Fresh, home-grown ingredients inspire new recipes, which she shares with her growing Instagram family.",
        image: "/timeline/2023.jpg",
    },
    {
        year: "2024",
        text: "Nutrinana’s Activated Granola finds a home in the Black Farmers Shop in Brixton, bringing the taste of Nana’s kitchen to even more happy customers. This is only just the beginning!",
        image: "/timeline/2024.jpeg",
    },
];

export default function AboutPage() {
    return (
        <main className="mx-auto mt-2 max-w-6xl p-10">
            <section className="mb-12">
                <SideSlider
                    slides={sideSlides}
                    title={sideSliderTitle}
                    description={sideSliderDescription}
                />
            </section>

            <section className="mb-12">
                <NoteCard />
            </section>

            <section className="mb-12">
                <div className="relative right-1/2 left-1/2 -mx-[50vw] mb-20 w-screen bg-[var(--color-green)]/76 py-3">
                    <h2 className="text-center text-3xl font-semibold text-white">A Timeline...</h2>
                </div>
                <Timeline timelineData={timelineData} />
            </section>
        </main>
    );
}
