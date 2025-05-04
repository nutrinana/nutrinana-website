import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Custom 404 Not Found page.
 * This page is shown when a user navigates to a non-existent route.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">404 — Page Not Found 🥜</h1>
      <p className="text-gray-600 mb-6">
        Oops! We couldn’t find the page you were looking for.
      </p>
      <Button variant="green" asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}