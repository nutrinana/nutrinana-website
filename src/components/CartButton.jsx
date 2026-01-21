"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/hooks/useCart";
import { calcItemCount } from "@/lib/cartTotals";

/**
 * CartButton component.
 *
 * Displays a shopping bag icon with the number of items in the bag.
 *
 * @component
 *
 * @param {Function} props.onClick - Click handler for the button.
 *
 * @returns {JSX.Element} The rendered CartButton component.
 */
export default function CartButton({ onClick }) {
    const { items } = useCart();
    const itemCount = calcItemCount(items);

    return (
        <Link href="/cart" onClick={onClick} aria-label="Open bag" className="bag-icon">
            <ShoppingBag size={24} strokeWidth={1.5} />
            {itemCount > 0 && <span className="bag-icon-badge">{itemCount}</span>}
        </Link>
    );
}
