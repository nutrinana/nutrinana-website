// Shopping cart page for Nutrinana
"use client";

import Link from "next/link";

import CartLineItem from "@/components/CartLineItem";
import ClosingCTA from "@/components/ClosingCTA";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { calcSubtotalGBP } from "@/lib/cartTotals";
import { getProduct } from "@/lib/products";

export default function CartPage() {
    const { items, itemCount, setQty, removeItem, clear } = useCart();

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

                    <OrderSummary
                        itemCount={itemCount}
                        subtotal={subtotal}
                        onCheckout={() => {}}
                        onClear={clear}
                    />
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
