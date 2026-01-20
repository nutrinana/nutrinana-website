// Shopping cart page for Nutrinana
"use client";

import Link from "next/link";

import CartLineItem from "@/components/CartLineItem";
import ClosingCTA from "@/components/ClosingCTA";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
    const { items, itemCount, setQty, removeItem, clear } = useCart();

    if (items.length === 0) {
        return (
            <div className="site-container py-16 text-center">
                <h1 className="mb-4 text-2xl font-semibold">Your bag is empty</h1>
                <Link href="/activated-granola">
                    <Button variant="green">Shop granola</Button>
                </Link>
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

                    <OrderSummary itemCount={itemCount} onCheckout={() => {}} onClear={clear} />
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
