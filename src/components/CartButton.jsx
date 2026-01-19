"use client";

import { ShoppingBasket } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/hooks/useCart";

/**
 * CartButton component.
 *
 * Displays a shopping cart icon with the number of items in the cart.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered CartButton component.
 */
export default function CartButton() {
    const { itemCount } = useCart();

    return (
        <Link href="/basket" className="relative inline-flex items-center">
            <ShoppingBasket className="h-5 w-5" />
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-black px-1.5 py-0.5 text-xs text-white">
                    {itemCount}
                </span>
            )}
        </Link>
    );
}
