"use client";

import { useState } from "react";

/**
 * Custom hook to handle the checkout process with Stripe.
 *
 * This hook manages the state of the checkout process, including loading
 * and error states. It provides a `checkout` function that initiates the
 * checkout by calling the backend API to create a Stripe Checkout session.
 *
 * @hook useCheckout
 *
 * @returns {Object} An object containing:
 *  - checkout: Function to initiate the checkout process.
 *  - isCheckingOut: Boolean indicating if the checkout is in progress.
 *  - checkoutError: String containing any error message from the checkout process.
 */
export function useCheckout() {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState("");

    const checkout = async ({ items, purchaseType }) => {
        try {
            setCheckoutError("");
            setIsCheckingOut(true);

            const response = await fetch("/api/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items,
                    purchaseType,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data?.error || "Checkout failed. Please try again.");
            }

            if (!data?.url) {
                throw new Error("Stripe Checkout URL was not returned.");
            }

            window.location.href = data.url;
        } catch (error) {
            setCheckoutError(error?.message || "Checkout failed. Please try again.");
            setIsCheckingOut(false);
        }
    };

    return {
        checkout,
        isCheckingOut,
        checkoutError,
    };
}
