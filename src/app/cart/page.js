// Shopping cart page for Nutrinana
"use client";

import { useState } from "react";

import Link from "next/link";

import CartLineItem from "@/components/CartLineItem";
import ClosingCTA from "@/components/ClosingCTA";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { calcSubtotalGBP, calcItemCount } from "@/lib/cartTotals";
import { getProduct } from "@/lib/products";

export default function CartPage() {
    const { items, setQty, removeItem, clear } = useCart();
    const { checkout, isCheckingOut, checkoutError } = useCheckout();

    const [purchaseType, setPurchaseType] = useState("one_off"); // "one_off" | "monthly"

    const itemCount = calcItemCount(items);
    const subtotal = calcSubtotalGBP(items, getProduct);

    if (items.length === 0) {
        return (
            <div className="site-container">
                <h1 className="mb-8 text-3xl">Your Shopping Bag</h1>

                <div className="flex flex-col items-center px-6 pt-16 text-center">
                    <h1 className="mb-4 text-4xl font-bold">No crunch here... yet 👀</h1>
                    <p className="mb-6 text-gray-600">
                        Your shopping bag is empty, and that just won&apos;t do.
                        <br />
                        Let&apos;s fix that with some activated goodness.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button variant="green" asChild>
                            <Link href="/activated-granola">Shop Activated Granola</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/">Go Back Home</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="site-container">
            <h1 className="mb-8 text-3xl">Your Shopping Bag</h1>

            <section className="section-y:first-child">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        {items.map(({ productId, qty }) => {
                            return (
                                <CartLineItem
                                    key={productId}
                                    productId={productId}
                                    qty={qty}
                                    onDecrease={() => setQty(productId, Math.max(1, qty - 1))}
                                    onIncrease={() => setQty(productId, qty + 1)}
                                    onRemove={() => removeItem(productId)}
                                />
                            );
                        })}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="mb-4 rounded-xl border p-4">
                            <p className="mb-3 text-sm font-medium text-gray-900">Purchase type</p>

                            <div className="flex flex-col gap-2">
                                <label className="flex cursor-pointer items-center gap-3 text-sm">
                                    <input
                                        type="radio"
                                        name="purchaseType"
                                        value="one_off"
                                        checked={purchaseType === "one_off"}
                                        onChange={() => setPurchaseType("one_off")}
                                    />
                                    <span>One-off purchase</span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-3 text-sm">
                                    <input
                                        type="radio"
                                        name="purchaseType"
                                        value="monthly"
                                        checked={purchaseType === "monthly"}
                                        onChange={() => setPurchaseType("monthly")}
                                    />
                                    <span>Subscribe monthly</span>
                                </label>
                            </div>

                            <p className="mt-3 text-xs text-gray-600">
                                You can manage your subscription later via Stripe&apos;s customer
                                portal.
                            </p>
                        </div>

                        {checkoutError ? (
                            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                {checkoutError}
                            </div>
                        ) : null}

                        <OrderSummary
                            itemCount={itemCount}
                            subtotal={subtotal}
                            onCheckout={() =>
                                checkout({
                                    items: items.map(({ productId, qty }) => ({ productId, qty })),
                                    purchaseType,
                                })
                            }
                            onClear={clear}
                            isCheckingOut={isCheckingOut}
                        />
                    </div>
                </div>
            </section>

            <section className="section-y" />

            <section className="section-y:last-child">
                <ClosingCTA
                    header="Need more crunch?"
                    description="Our activated granola is crafted in small batches using traditionally soaked nuts and seeds. Perfect for breakfast, snacking, or gifting."
                    button={{
                        text: "Continue shopping",
                        href: "/activated-granola",
                        variant: "green",
                    }}
                />
            </section>
        </div>
    );
}
