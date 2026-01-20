"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

/**
 * AddToBagButton
 *
 * Adds a product to the cart using productId.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} props.productId - The ID of the product to add to the cart.
 * @param {number} [props.quantity=1] - The quantity of the product to add.
 * @param {string} [props.variant="green"] - The button variant.
 * @param {string} [props.size="default"] - The button size.
 *
 * @returns {JSX.Element} The rendered AddToBagButton component.
 */
export default function AddToBagButton({
    productId,
    quantity = 1,
    variant = "green",
    size = "default",
}) {
    const { addItem } = useCart();

    return (
        <Button variant={variant} size={size} onClick={() => addItem(productId, quantity)}>
            Add to basket
        </Button>
    );
}
