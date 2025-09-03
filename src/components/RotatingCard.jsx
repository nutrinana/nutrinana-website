"use client";

import { useEffect, useState } from "react";

import { Leaf, Sparkles, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Rotating card component for displaying benefits.
 *
 * @component
 *
 * @param {number} param0.intervalMs - The interval in milliseconds for auto-rotation (default: 6000).
 * @param {string} param0.className - Additional class names for the outer <aside> element.
 *
 * @returns {JSX.Element} The rotating card component.
 */
export default function RotatingCard({ intervalMs = 6000, className = "" }) {
    const BENEFITS = [
        {
            id: 0,
            icon: Leaf,
            title: "Gentle on digestion",
            copy: "Activation helps reduce phytic acid and enzyme inhibitors, making every spoonful easier on the gut.",
        },
        {
            id: 1,
            icon: ShieldCheck,
            title: "Nutrient availability",
            copy: "Soaking and drying supports mineral absorption so your body can make the most of honest ingredients.",
        },
        {
            id: 2,
            icon: Sparkles,
            title: "Naturally delicious",
            copy: "Small-batch, no refined sugar — just wholesome taste crafted with care in Nana’s kitchen.",
        },
    ];

    const [index, setIndex] = useState(0);

    // Auto-rotate
    useEffect(() => {
        const t = setInterval(
            () => setIndex((i) => (i + 1) % BENEFITS.length),
            Math.max(2000, intervalMs)
        );

        return () => clearInterval(t);
    }, [intervalMs, BENEFITS.length]);

    const benefit = BENEFITS[index];
    const Icon = benefit.icon;

    return (
        <aside
            aria-label="Why Activated Granola"
            className={[
                "bg-light-green/40 rounded-2xl p-6",
                "supports-[backdrop-filter]:bg-light-green/40 backdrop-blur",
                className,
            ].join(" ")}
        >
            <h3 className="font-heading mb-4 text-center text-xl sm:text-2xl">
                Why Activated Granola
            </h3>

            <div className="flex items-start gap-4">
                <div className="border-grey shrink-0 rounded-full border p-3">
                    <Icon className="text-green h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                    <p className="mb-1 font-medium">{benefit.title}</p>
                    <p className="text-raisin/80 text-sm sm:text-base">{benefit.copy}</p>
                </div>
            </div>

            {/* controls */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2" role="tablist" aria-label="Benefits">
                    {BENEFITS.map((b, i) => (
                        <Button
                            key={b.id}
                            role="tab"
                            aria-selected={i === index}
                            aria-controls={`benefit-panel-${b.id}`}
                            onClick={() => setIndex(i)}
                            variant="noOutline"
                            size="icon"
                            className={`h-2 w-6 rounded-full shadow-none transition-all ${
                                i === index ? "bg-green" : "bg-green/20 hover:bg-green"
                            }`}
                            title={b.title}
                        />
                    ))}
                </div>
                <span className="text-raisin/60 text-xs">
                    {index + 1} / {BENEFITS.length}
                </span>
            </div>
        </aside>
    );
}
