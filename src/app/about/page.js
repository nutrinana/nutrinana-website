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
        alt: "Nana at DELLI warehouse",
    },
    {
        image: "/about/about-slide3.jpg",
        alt: "Nana preparing granola in her kitchen",
    },
];

const sideSliderTitle = "Who We Are";
const sideSliderDescription = (
    <>
        Nutrinana started in Nana&apos;s kitchen, where she whipped up granola so good, even her
        kids couldn&apos;t keep it to themselves — and neither could the neighbours! What began as a
        small, family-run operation quickly grew, fuelled by Nana&apos;s mission to prove that
        nutritious, tasty granola doesn&apos;t need a sprinkle of sugar or a dash of anything
        artificial. Our secret? “Activated” nuts and seeds that have gone through a special soaking
        process to make them as easy on your digestion as they are on your taste buds.
        <br />
        <br />
        At Nutrinana, we&apos;re all about keeping it real — literally. We&apos;re a family-run
        business with Nana&apos;s kids handling the social media and website (when they&apos;re not
        busy asking for more granola). We&apos;re on a mission to become your go-to healthy
        breakfast alternative, so whether you&apos;re looking to ditch the sugar or dodge the bloat,
        we&apos;ve got you covered. Plus, when Nana&apos;s not making granola, she&apos;s growing
        her own veggies — because, of course she is!
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
        text: "Nutrinana’s Activated Granola finds a home in the Black Farmers Shop in Brixton and White City, bringing the taste of Nana’s kitchen to even more happy customers.",
        image: "/timeline/2024.jpg",
    },
];

export default function AboutPage() {
    return (
        <div className="site-container section-y flow">
            <section className="section-y">
                <SideSlider
                    slides={sideSlides}
                    title={sideSliderTitle}
                    description={sideSliderDescription}
                />
            </section>

            <section className="section-y">
                <NoteCard />
            </section>

            <section className="section-y">
                <div className="bg-green/76 relative right-1/2 left-1/2 -mx-[50vw] mb-20 w-screen py-3">
                    <h2 className="text-center text-3xl text-white">A Timeline...</h2>
                </div>
                <Timeline timelineData={timelineData} />
            </section>
        </div>
    );
}
