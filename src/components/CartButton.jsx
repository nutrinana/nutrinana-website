"use client";

import { ShoppingBag } from "lucide-react";
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
        <Link href="/basket" onClick={onClick} aria-label="Open basket" className="bag-icon">
            <ShoppingBag size={24} strokeWidth={1.5} />
            {itemCount > 0 && <span className="bag-icon-badge">{itemCount}</span>}
        </Link>
    );
}
