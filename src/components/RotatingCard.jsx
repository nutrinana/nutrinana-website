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
export default function RotatingCard({ intervalMs = 6000 }) {
    const BENEFITS = [
        {
            id: 0,
            icon: Leaf,
            title: "Traditionally Made",
            copy: "We soak and slowly dry our nuts and seeds — a mindful method inspired by natural sprouting conditions.",
        },
        {
            id: 1,
            icon: ShieldCheck,
            title: "Naturally Nutritious",
            copy: "Made with whole food ingredients and no refined sugar, our granola is high in fibre, low in salt, and a source of protein.",
        },
        {
            id: 2,
            icon: Sparkles,
            title: "Crafted in Small Batches",
            copy: "Prepared with care in Nana’s kitchen, every batch is slowly baked for a deliciously crisp and wholesome crunch.",
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
            className="bg-light-green/40 supports-[backdrop-filter]:bg-light-green/40 rounded-2xl p-6 backdrop-blur"
        >
            <h3 className="font-heading mb-4 text-center text-xl sm:text-2xl">
                Why Activated Granola
            </h3>

            <div className="flex items-start gap-4">
                <div className="border-green/60 shrink-0 rounded-full border p-3">
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
