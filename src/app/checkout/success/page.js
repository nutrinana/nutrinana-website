// Checkout success page for Nutrinana
"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export default function CheckoutSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const { clear } = useCart();

    useEffect(() => {
        if (sessionId) {
            clear();
        }
    }, [sessionId, clear]);

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
