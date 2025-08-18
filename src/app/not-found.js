import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Custom 404 Not Found page.
 * This page is shown when a user navigates to a non-existent route.
 */
export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <h1 className="mb-4 text-4xl font-bold">404 — Page Not Found 🥜</h1>
            <p className="mb-6 text-gray-600">
                Aw, nuts! We couldn’t find the page you were looking for...
            </p>
            <Button variant="green" asChild>
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
    );
}
