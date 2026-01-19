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
 * @param {Function} props.onClick - Click handler for the button.
 *
 * @returns {JSX.Element} The rendered CartButton component.
 */
export default function CartButton({ onClick }) {
    const { itemCount } = useCart();

    return (
        <Link
            href="/basket"
            onClick={onClick}
            className="relative inline-flex items-center"
            aria-label="Open basket"
        >
            <ShoppingBasket size={22} />
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-black px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {itemCount}
                </span>
            )}
        </Link>
    );
}
