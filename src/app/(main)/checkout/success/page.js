// Checkout success page for Nutrinana
"use client";

import { useEffect, useState } from "react";

import { MoveRight, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import ClosingCTA from "@/components/ClosingCTA";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { generateOrderReferenceFromSessionId, formatDate, formatMoneyFromMinor } from "@/lib/utils";

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const stripeSessionId = searchParams.get("session_id");
    const orderReference = generateOrderReferenceFromSessionId(stripeSessionId);
    const { clear } = useCart();
    const [orderDate] = useState(new Date());
    const [orderItems, setOrderItems] = useState([]);
    const [orderTotals, setOrderTotals] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!stripeSessionId) {
            setLoading(false);

            return;
        }

        clear();

        async function fetchOrderDetails() {
            try {
                const response = await fetch(`/api/checkout/session?session_id=${stripeSessionId}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrderItems(data.items || []);
                    setOrderTotals({
                        subtotal: data.amountSubtotal || 0,
                        shipping: data.amountShipping || 0,
                        tax: data.amountTax || 0,
                        total: data.amountTotal || 0,
                        currency: data.currency || "gbp",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch order details:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrderDetails();
    }, [stripeSessionId, clear]);

    const getProductImage = (itemName) => {
        const name = itemName?.toLowerCase() || "";

        if (name.includes("mixed fruits") || name.includes("coconut")) {
            return "/products/mixed-fruits/granola1.jpg";
        }
        if (name.includes("chocolate") || name.includes("hazelnut")) {
            return "/products/chocolate-hazelnut/granola1.jpg";
        }

        return "/products/mixed-fruits/granola1.jpg";
    };

    return (
        <>
            <div className="site-container">
                <section className="section-y:first-child">
                    {/* Success Header */}
                    <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
                        <h1 className="font-heading mb-3 text-4xl font-bold sm:mb-4 sm:text-4xl lg:text-4xl">
                            Order Confirmed 🎉
                        </h1>
                        <p className="text-base text-gray-600 sm:text-lg">
                            Thank you for your order! We&apos;re preparing your nourishing granola
                            with care. You&apos;ll receive a confirmation email shortly.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                        {/* Left Column - Main Content */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Order Details Card */}
                            <div className="overflow-hidden rounded-xl border bg-white">
                                {/* Order Header */}
                                <div className="bg-light-green/40 border-b px-4 py-4 sm:px-6">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-green mb-1 text-xs font-bold tracking-wide uppercase">
                                                Order Reference
                                            </p>
                                            {orderReference ? (
                                                <code className="font-mono text-sm font-semibold text-black sm:text-base">
                                                    {orderReference}
                                                </code>
                                            ) : (
                                                <p className="text-sm text-gray-600">
                                                    Processing...
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-green mb-1 text-xs font-bold tracking-wide uppercase">
                                                Order Date
                                            </p>
                                            <p className="text-sm font-semibold text-black sm:text-base">
                                                {formatDate(orderDate.toISOString(), "dd/mm/yyyy")}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="px-4 py-4 sm:px-6 sm:py-6">
                                    <p className="mb-3 text-xs font-bold tracking-wide text-gray-500 uppercase sm:mb-4">
                                        Items Ordered
                                    </p>

                                    {loading ? (
                                        <div className="py-8 text-center">
                                            <div className="border-green inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent"></div>
                                            <p className="mt-3 text-sm text-gray-500">
                                                Loading order details...
                                            </p>
                                        </div>
                                    ) : orderItems && orderItems.length > 0 ? (
                                        <div className="space-y-3 sm:space-y-4">
                                            {orderItems.map((item, index) => (
                                                <div
                                                    key={item.id || index}
                                                    className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0 sm:gap-4 sm:pb-4"
                                                >
                                                    {/* Product Image */}
                                                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-white sm:h-20 sm:w-20">
                                                        <Image
                                                            src={getProductImage(item.name)}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="(max-width: 640px) 64px, 80px"
                                                        />
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="mb-1 text-sm font-bold text-black sm:text-base">
                                                            {item.name}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 sm:text-sm">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                        {item.unitPrice && (
                                                            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                                                {formatMoneyFromMinor(
                                                                    item.unitPrice,
                                                                    item.currency
                                                                )}{" "}
                                                                each
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Item Total */}
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold text-black sm:text-base">
                                                            {formatMoneyFromMinor(
                                                                item.amount,
                                                                item.currency
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-6 text-center">
                                            <p className="text-sm text-gray-500">
                                                Your order details will appear in your confirmation
                                                email.
                                            </p>
                                        </div>
                                    )}

                                    {/* Order Totals */}
                                    {orderTotals && !loading && (
                                        <div className="mt-6 space-y-2 border-t pt-6">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-medium text-black">
                                                    {formatMoneyFromMinor(
                                                        orderTotals.subtotal,
                                                        orderTotals.currency
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Shipping</span>
                                                <span className="font-medium text-black">
                                                    {formatMoneyFromMinor(
                                                        orderTotals.shipping,
                                                        orderTotals.currency
                                                    )}
                                                </span>
                                            </div>
                                            {orderTotals.tax > 0 && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Tax</span>
                                                    <span className="font-medium text-black">
                                                        {formatMoneyFromMinor(
                                                            orderTotals.tax,
                                                            orderTotals.currency
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex justify-between border-t pt-2 text-base">
                                                <span className="font-bold text-black">Total</span>
                                                <span className="text-lg font-bold text-black">
                                                    {formatMoneyFromMinor(
                                                        orderTotals.total,
                                                        orderTotals.currency
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* What's Next Section */}
                            <div className="bg-light-green/40 rounded-xl px-4 py-5 sm:px-6 sm:py-6">
                                <h2 className="font-heading mb-4 text-lg text-black sm:mb-5 sm:text-xl">
                                    What happens next?
                                </h2>
                                <div className="space-y-4 sm:space-y-5">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="bg-green flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <p className="mb-1 text-sm font-medium sm:text-base">
                                                Order Confirmation Email
                                            </p>
                                            <p className="text-xs text-black/80 sm:text-sm">
                                                You&apos;ll receive a detailed confirmation with
                                                your order summary and tracking information.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="bg-green flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <p className="mb-1 text-sm font-medium sm:text-base">
                                                We Prepare Your Order
                                            </p>
                                            <p className="text-xs text-black/80 sm:text-sm">
                                                Our team carefully packs your activated granola with
                                                love and care.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="bg-green flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <p className="mb-1 text-sm font-medium sm:text-base">
                                                Delivery
                                            </p>
                                            <p className="text-xs text-black/80 sm:text-sm">
                                                We&apos;ll send you tracking details as soon as your
                                                order is dispatched. You can follow your delivery
                                                using the link in your email, or read more on our{" "}
                                                <Link href="/legal/delivery" className="underline">
                                                    Delivery &amp; Returns
                                                </Link>{" "}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Action Buttons */}
                            <div className="rounded-xl border bg-white p-5 sm:p-6">
                                <h3 className="font-heading mb-4 text-lg">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Button
                                        variant="greenOutlined"
                                        size="lg"
                                        asChild
                                        className="w-full"
                                    >
                                        <Link href="/">Return to Home</Link>
                                    </Button>
                                    <Button variant="outline" size="lg" asChild className="w-full">
                                        <Link href="/activated-granola">Continue Shopping</Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Subscription Management Info */}
                            <div className="bg-light-yellow/40 rounded-lg p-5">
                                <div className="flex items-start gap-3">
                                    <Info className="h-5 w-5 text-yellow-600" />
                                    <div className="flex-1">
                                        <h3 className="font-display mb-1 text-sm text-yellow-600">
                                            Subscription Orders
                                        </h3>
                                        <p className="text-xs text-gray-700 sm:text-sm">
                                            If you ordered a subscription, you can manage it anytime
                                            through the customer portal link in your confirmation
                                            email.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Support Section */}
                            <div className="rounded-xl border bg-white p-5 sm:p-6">
                                <h3 className="font-heading mb-2 text-lg">Need Help?</h3>
                                <p className="mb-4 text-sm text-gray-600">
                                    Questions about your order?
                                </p>
                                <Link
                                    href="/help"
                                    className="text-green mt-4 flex gap-1 text-sm font-medium hover:underline"
                                >
                                    Contact Support <MoveRight className="h-4 w-4 align-middle" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Debug Info (only shown if orderReference fails) */}
                    {!orderReference && stripeSessionId && (
                        <details className="mt-6 max-w-2xl sm:mt-8">
                            <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-600">
                                Technical Details (for support)
                            </summary>
                            <div className="mt-2 rounded border bg-gray-50 p-3">
                                <p className="mb-1 text-xs font-bold text-gray-500">
                                    Checkout Session ID:
                                </p>
                                <code className="block rounded border bg-white p-2 font-mono text-xs break-all text-gray-700">
                                    {stripeSessionId}
                                </code>
                            </div>
                        </details>
                    )}
                </section>

                <section className="section-y" />

                {/* Closing CTA */}
                <section className="section-y:last-child">
                    <ClosingCTA
                        header="Want to stock up or try something new?"
                        description="Explore our full range of activated granola flavours and find your new favourite."
                        button={{
                            text: "Shop All Granola",
                            href: "/activated-granola",
                            variant: "green",
                        }}
                    />
                </section>
            </div>
        </>
    );
}
