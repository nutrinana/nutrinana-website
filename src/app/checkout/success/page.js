import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Order Confirmed",
    description: "Thank you for your order — your checkout was successful.",
};

/**
 * Checkout Success Page
 *
 * This page is the landing page for Stripe Checkout `success_url`.
 * Keep it simple and reassuring. We can enhance later using webhooks
 * to show real order details.
 */
export default function CheckoutSuccessPage() {
    return (
        <div className="site-container">
            <section className="section-y:first-child">
                <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-10">
                    <h1 className="font-display text-2xl sm:text-3xl">Order confirmed 🎉</h1>
                    <p className="mt-4 text-sm text-gray-700 sm:text-base">
                        Thank you! Your payment went through.
                        <br />
                        You’ll receive an email confirmation shortly.
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
