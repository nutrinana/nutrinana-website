'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("Global error caught by error.js:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong 😵‍💫</h1>
            <p className="text-gray-600 mb-6">
                Oops! Looks like one of our granola clusters fell apart.<br />
                Please try again or head back home.
            </p>
            <Button variant="green" asChild>
                <Link href="/">Go Back Home</Link>
            </Button>
        </div>
    );
}
