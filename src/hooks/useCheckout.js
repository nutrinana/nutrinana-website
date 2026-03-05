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

    const GENERIC_CHECKOUT_ERROR =
        "Something went wrong while starting checkout. Please try again or contact us if the issue persists.";

    const checkout = async ({ items, purchaseType, customerEmail = null }) => {
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
                    customerEmail,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                console.error("Checkout API error:", data);
                throw new Error(GENERIC_CHECKOUT_ERROR);
            }

            if (!data?.url) {
                console.error("Missing Stripe Checkout URL:", data);
                throw new Error(GENERIC_CHECKOUT_ERROR);
            }

            window.location.href = data.url;
        } catch (error) {
            console.error("Checkout failed:", error);
            setCheckoutError(GENERIC_CHECKOUT_ERROR);
            setIsCheckingOut(false);
        }
    };

    return {
        checkout,
        isCheckingOut,
        checkoutError,
    };
}
