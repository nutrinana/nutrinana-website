"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Global error boundary component for handling critical application errors.
 *
 * This component catches errors that bubble up from the root layout or
 * other parts of the application that aren't caught by page-level error boundaries.
 *
 * @param {Object} props - The component props.
 * @param {Error} props.error - The error object thrown.
 * @param {Function} props.reset - Callback to retry rendering the application.
 *
 * @returns {JSX.Element} The global error page component.
 */
export default function GlobalError({ error, reset }) {
    useEffect(() => {
        console.error("Critical global error caught by global-error.js:", error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Oops! Something&apos;s Not Right 🥜</h1>
                    <p className="mb-6 text-gray-600">
                        Oh no! Something went seriously wrong on our end.
                        <br />
                        Don&apos;t worry, we&apos;re nuts about fixing these issues!
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button variant="green" onClick={reset}>
                            Try Again
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/">Go to Home</Link>
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    );
}
