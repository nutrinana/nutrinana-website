"use client";

import { Button } from "@/components/ui/button";

/**
 * OrderSummary component.
 *
 * Displays a summary of the order including item count and checkout/clear actions.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {number} props.itemCount - The total number of items in the order.
 * @param {Function} props.onCheckout - Handler for the checkout action.
 * @param {Function} props.onClear - Handler for clearing the order.
 *
 * @returns {JSX.Element} The rendered OrderSummary component.
 */
export default function OrderSummary({ itemCount, onCheckout, onClear }) {
    return (
        <aside className="rounded-xl border p-6">
            <h2 className="mb-4 text-lg font-medium">Order summary</h2>

            <div className="mb-6 flex justify-between text-sm">
                <span>Items</span>
                <span>{itemCount}</span>
            </div>

            <Button variant="green" size="lg" className="w-full" onClick={onCheckout}>
                Proceed to checkout
            </Button>

            <Button
                variant="unstyled"
                className="mt-4 w-full text-sm font-medium text-gray-500 hover:underline"
                onClick={onClear}
            >
                Clear basket
            </Button>
        </aside>
    );
}
