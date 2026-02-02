// Checkout success page for Nutrinana
"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { generateOrderReferenceFromSessionId } from "@/lib/utils";

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const stripeSessionId = searchParams.get("session_id");
    const orderReference = generateOrderReferenceFromSessionId(stripeSessionId);

    const { clear } = useCart();

    useEffect(() => {
        if (!stripeSessionId) {
            return;
        }
        clear();
    }, [stripeSessionId, clear]);

    return (
        <div className="site-container">
            <section className="section-y:first-child">
                <div className="mx-auto max-w-2xl p-6 text-center sm:p-10">
                    <h1 className="text-4xl font-bold">Order confirmed 🎉</h1>
                    <p className="mt-4 text-sm text-gray-600 sm:text-base">
                        Thank you! Your payment went through.
                        <br />
                        You&apos;ll receive an email confirmation shortly.
                    </p>

                    <div className="mt-6 rounded-lg border bg-white p-4 text-left">
                        {orderReference ? (
                            <>
                                <p className="text-xs font-medium text-gray-500">Order reference</p>
                                <code className="mt-1 block rounded bg-gray-50 px-2 py-1 font-mono text-xs break-all text-gray-900">
                                    {orderReference}
                                </code>
                                <p className="mt-2 text-xs text-gray-500">
                                    Keep this for your records.
                                </p>
                            </>
                        ) : stripeSessionId ? (
                            <>
                                <p className="text-xs font-medium text-gray-500">Order reference</p>
                                <p className="mt-1 text-xs text-gray-600">
                                    We couldn&apos;t display your order reference on this page.
                                </p>
                                <p className="mt-2 text-xs text-gray-500">
                                    For support, you can share this checkout session id:
                                </p>
                                <code className="mt-1 block rounded bg-gray-50 px-2 py-1 font-mono text-xs break-all text-gray-900">
                                    {stripeSessionId}
                                </code>
                            </>
                        ) : (
                            <p className="text-xs text-gray-500">
                                Order reference is unavailable. Please check your email
                                confirmation.
                            </p>
                        )}
                    </div>

                    <p className="mt-4 text-xs text-gray-500 sm:text-sm">
                        If you chose a subscription, you can manage it later via your Stripe
                        customer portal link in your emails.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button variant="green" asChild>
                            <Link href="/">Back to home</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/activated-granola">Continue shopping</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
