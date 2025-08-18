"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Global error page component for handling unhandled exceptions.
 * Displayed when a rendering or data-fetching error occurs in the app.
 *
 * @param {Object} props - The component props.
 * @param {Error} props.error - The error object thrown.
 * @param {Function} props.reset - Callback to retry rendering the route.
 *
 * @returns {JSX.Element} The error page component.
 */
export default function Error({ error }) {
    useEffect(() => {
        console.error("Global error caught by error.js:", error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-4 text-4xl font-bold">Something went wrong 😵‍💫</h1>
            <p className="mb-6 text-gray-600">
                Oops! Looks like one of our granola clusters fell apart.
                <br />
                Please try again or head back home.
            </p>
            <Button variant="green" asChild>
                <Link href="/">Go Back Home</Link>
            </Button>
        </div>
    );
}
