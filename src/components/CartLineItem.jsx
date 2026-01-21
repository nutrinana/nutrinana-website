"use client";

import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/products";

/**
 * CartLineItem component.
 *
 * Renders a single line item in the shopping cart with product details and quantity controls.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} props.productId - The ID of the product.
 * @param {number} props.qty - The quantity of the product in the cart.
 * @param {Function} props.onDecrease - Handler to decrease the quantity.
 * @param {Function} props.onIncrease - Handler to increase the quantity.
 * @param {Function} props.onRemove - Handler to remove the item from the cart.
 *
 * @returns {JSX.Element} The rendered CartLineItem component.
 */
export default function CartLineItem({ productId, qty, onDecrease, onIncrease, onRemove }) {
    const product = getProduct(productId);

    if (!product) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
                <div className="relative aspect-square w-16 flex-none overflow-hidden rounded-md bg-white">
                    <Image
                        src={
                            product.imageUrl ||
                            product.image ||
                            product.images?.[0] ||
                            "/products/mixed-fruits/granola1.jpg"
                        }
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                    />
                </div>

                <div>
                    <h2 className="font-medium">{product.name}</h2>
                    <p className="text-sm text-gray-600">
                        Pack size: {product.size || product.packSize || "500g"}
                    </p>
                    <p className="text-sm text-gray-600">£{product.displayPriceGBP.toFixed(2)}</p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-start">
                <div className="flex items-center overflow-hidden rounded-md border sm:ml-auto">
                    <Button
                        variant="unstyled"
                        size="icon"
                        onClick={onDecrease}
                        aria-label="Decrease quantity"
                    >
                        <Minus size={14} />
                    </Button>

                    <span className="flex h-9 w-10 items-center justify-center text-sm font-medium">
                        {qty}
                    </span>

                    <Button
                        variant="unstyled"
                        size="icon"
                        onClick={onIncrease}
                        aria-label="Increase quantity"
                    >
                        <Plus size={14} />
                    </Button>
                </div>

                <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Remove item">
                    <Trash2 size={18} />
                </Button>
            </div>
        </div>
    );
}
