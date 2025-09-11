"use client";

import { WheatOff, Dumbbell, Vegan, Leaf } from "lucide-react";
import { TbWheat } from "react-icons/tb";

const DEFAULT_ITEMS = [
    { id: "plant", icon: Leaf, label: "100% PLANT-BASED" },
    { id: "fibre", icon: TbWheat, label: "HIGH IN FIBRE" },
    { id: "protein", icon: Dumbbell, label: "HIGH IN PROTEIN" },
    { id: "gluten", icon: WheatOff, label: "GLUTEN FREE" },
    { id: "vegan", icon: Vegan, label: "VEGAN FRIENDLY" },
];

/**
 * KeyFeaturesBand component for displaying product features in a horizontal band.
 *
 * @component
 *
 * @param {Object} props - The properties for the KeyFeaturesBand component.
 * @param {Object[]} [props.items] - Array of feature items to display. Defaults to DEFAULT_ITEMS.
 * @param {string} props.items[].id - Unique identifier for the feature.
 * @param {React.Component} props.items[].icon - Lucide icon component.
 * @param {string} props.items[].label - Display label for the feature.
 * @param {string} [props.className] - Additional CSS classes to apply to the container.
 *
 * @returns {JSX.Element} The rendered KeyFeaturesBand component.
 */
export default function KeyFeaturesBand({ items = DEFAULT_ITEMS, className = "" }) {
    return (
        <div
            className={`bg-light-green/40 relative right-1/2 left-1/2 -mx-[50vw] w-screen ${className}`}
        >
            {/* Mobile and Small Laptop */}
            <div className="flex justify-start gap-8 overflow-x-auto px-8 py-12 lg:justify-center lg:px-16 xl:hidden">
                {items.map((item) => {
                    const IconComponent = item.icon;

                    return (
                        <div
                            key={item.id}
                            className="flex min-w-[120px] flex-col items-center gap-2 text-center"
                        >
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
                                <IconComponent className="text-green h-10 w-10" strokeWidth={1.5} />
                            </div>
                            <span className="text-sm font-medium tracking-wide text-gray-700">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Desktop: Centered layout */}
            <div className="hidden flex-wrap items-center justify-center gap-6 py-12 xl:flex xl:gap-20">
                {items.map((item) => {
                    const IconComponent = item.icon;

                    return (
                        <div key={item.id} className="flex flex-col items-center gap-2 text-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white">
                                <IconComponent className="text-green h-12 w-12" strokeWidth={1.5} />
                            </div>
                            <span className="text-base font-medium tracking-wide text-gray-700">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
