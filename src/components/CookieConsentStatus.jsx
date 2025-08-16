"use client";

import { useCookieConsentStatus } from "@/hooks/useCookieConsentStatus";

export default function CookieConsentStatus() {
  const {
    consent,
    consentDate,
    stateLabel,
    reopenBanner,
    withdrawAll,
  } = useCookieConsentStatus();

  return (
    <div className="rounded-xl border p-4 md:p-6 space-y-3">
      <h3 className="text-xl font-bold">Your cookie consent</h3>

      <div className="space-y-1">
        <p><span className="font-semibold">Current state:</span> {stateLabel}</p>
        <p><span className="font-semibold">Consent ID:</span> {consent?.stamp ?? "Not available"}</p>
        <p><span className="font-semibold">Consent date:</span> {consentDate ?? "Not available"}</p>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={reopenBanner}
          className="rounded-lg border px-3 py-2 hover:bg-gray-50"
        >
          Change consent
        </button>
        <button
          type="button"
          onClick={withdrawAll}
          className="rounded-lg border px-3 py-2 hover:bg-gray-50"
        >
          Withdraw consent
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Tip: you can always change or withdraw your consent by clicking the Cookiebot badge in the bottom-left corner of the screen.
      </p>
    </div>
  );
}