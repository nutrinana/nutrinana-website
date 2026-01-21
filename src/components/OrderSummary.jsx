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
 * @param {number} props.subtotal - The subtotal amount of the order.
 * @param {Function} props.onCheckout - Handler for the checkout action.
 * @param {Function} props.onClear - Handler for clearing the order.
 *
 * @returns {JSX.Element} The rendered OrderSummary component.
 */
export default function OrderSummary({ itemCount, subtotal, onCheckout, onClear }) {
    return (
        <aside className="rounded-xl border p-6">
            <h2 className="mb-4 text-lg font-semibold">Order summary</h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span>Items</span>
                    <span>{itemCount}</span>
                </div>

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                </div>

                <div className="font-heading mt-4 flex justify-between text-base font-semibold">
                    <span>Estimated total</span>
                    <span className="font-body">£{subtotal.toFixed(2)}</span>
                </div>
            </div>

            <p className="mt-3 text-xs text-gray-600">
                Taxes, discounts, and shipping calculated at checkout.
            </p>

            <Button variant="green" size="lg" className="mt-6 w-full" onClick={onCheckout}>
                Proceed to checkout
            </Button>

            <Button
                variant="unstyled"
                className="mt-4 w-full text-sm font-medium text-gray-500 hover:underline"
                onClick={onClear}
            >
                Clear bag
            </Button>
        </aside>
    );
}
