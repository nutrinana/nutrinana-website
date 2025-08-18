"use client";

import { Button } from "@/components/ui/button";
import { useCookieConsentStatus } from "@/hooks/useCookieConsentStatus";

/**
 * CookieConsentStatus component to display the user's cookie consent status.
 *
 * It shows the current consent state, consent ID, consent date,
 * and provides buttons to change or withdraw consent.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered CookieConsentStatus component.
 */
export default function CookieConsentStatus() {
    const { consent, consentDate, stateLabel, reopenBanner, withdrawAll } =
        useCookieConsentStatus();

    return (
        <div className="space-y-3 rounded-xl border p-4 md:p-6">
            <h3 className="text-xl font-bold">Your cookie consent</h3>

            {/* Display consent information */}
            <div className="space-y-1">
                <p>
                    <span className="font-semibold">Current state:</span> {stateLabel}
                </p>
                <p>
                    <span className="font-semibold">Consent ID:</span>{" "}
                    {consent?.stamp ?? "Not available"}
                </p>
                <p>
                    <span className="font-semibold">Consent date:</span>{" "}
                    {consentDate ?? "Not available"}
                </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
                {/* Change or withdraw consent buttons */}
                <Button
                    type="button"
                    variant="unstyled"
                    onClick={reopenBanner}
                    className="rounded-lg border px-3 py-2 hover:bg-gray-50"
                >
                    Change consent
                </Button>
                <Button
                    type="button"
                    variant="unstyled"
                    onClick={withdrawAll}
                    className="rounded-lg border px-3 py-2 hover:bg-gray-50"
                >
                    Withdraw consent
                </Button>
            </div>

            <p className="text-sm text-gray-600">
                Tip: you can always change or withdraw your consent by clicking the Cookiebot badge
                in the bottom-left corner of the screen.
            </p>
        </div>
    );
}
