"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useCookieConsentStatus } from "@/hooks/useCookieConsentStatus";

/**
 * Yotpo SEO Product Widget component for displaying Yotpo reviews.
 *
 * It initializes the Yotpo widgets after the component mounts.
 * If the user has not given consent for statistics or marketing cookies,
 * it displays a placeholder message instead of the review widget.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered YotpoSEOProductWidget component.
 */
export default function YotpoSEOProductWidget() {
    const { consent, reopenBanner } = useCookieConsentStatus();

    const hasConsent = consent?.statistics === true || consent?.marketing === true;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window !== "undefined" && window.yotpoWidgetsContainer?.initWidgets) {
                window.yotpoWidgetsContainer.initWidgets();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [hasConsent]);

    // If no consent for stats/marketing: show placeholder instead of widget
    if (!hasConsent) {
        return (
            <div
                className="not-prose w-full rounded-xl bg-gray-50 px-4 py-6 text-center text-gray-800"
                style={{
                    width: "110vw",
                    marginLeft: "calc(-55vw + 50%)",
                    marginTop: 0,
                    marginBottom: "2rem",
                }}
            >
                <p className="font-semibold">Reviews are currently unavailable</p>
                <p className="mt-1 text-sm text-gray-700">
                    To view customer reviews, please enable{" "}
                    <span className="font-medium">statistics</span> or{" "}
                    <span className="font-medium">marketing</span> cookies in your cookie settings.
                </p>

                <Button
                    type="button"
                    variant="unstyled"
                    onClick={reopenBanner}
                    className="mt-3 rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
                >
                    Update cookie settings
                </Button>
            </div>
        );
    }

    return (
        <div
            className="not-prose"
            style={{
                width: "90vw",
                marginLeft: "calc(-45vw + 50%)",
                padding: "0",
                paddingTop: "0",
                marginTop: "0",
            }}
        >
            <div className="yotpo-widget-instance" data-yotpo-instance-id="1119658" />
        </div>
    );
}
