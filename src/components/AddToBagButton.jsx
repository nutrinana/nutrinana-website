"use client";

import { useState } from "react";

import { Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

/**
 * AddToBagButton
 *
 * Adds a product to the bag using productId.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} props.productId - The ID of the product to add to the bag.
 * @param {string} [props.size="default"] - The button size.
 *
 * @returns {JSX.Element} The rendered AddToBagButton component.
 */
export default function AddToBagButton({ productId, size = "default" }) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex w-full max-w-xl items-stretch">
            {/* Quantity selector */}
            <div className="flex items-center gap-4 rounded-l-lg border border-black px-6">
                <Button
                    variant="unstyled"
                    size="icon"
                    className="text-2xl text-black disabled:opacity-40"
                    onClick={(e) => {
                        e.stopPropagation();
                        setQuantity((q) => Math.max(1, q - 1));
                    }}
                    disabled={quantity === 1}
                >
                    <Minus size={20} />
                </Button>

                <span className="min-w-[24px] text-center text-lg font-medium">{quantity}</span>

                <Button
                    variant="unstyled"
                    size="icon"
                    className="text-2xl text-black"
                    onClick={(e) => {
                        e.stopPropagation();
                        setQuantity((q) => q + 1);
                    }}
                >
                    <Plus size={20} />
                </Button>
            </div>

            {/* Add to bag button */}
            <Button
                variant="unstyled"
                size="lg"
                className="bg-green text-primary-foreground hover:bg-green/90 focus-visible:ring-green/40 flex-1 rounded-none rounded-r-lg border border-l-0 border-black px-6 text-lg font-medium transition-colors focus-visible:ring-2"
                onClick={(event) => {
                    event.stopPropagation();
                    addItem(productId, quantity);
                }}
            >
                Add To Bag
            </Button>
        </div>
    );
}
