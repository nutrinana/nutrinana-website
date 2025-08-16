import { useEffect, useState, useMemo } from "react";
import { buildConsentState } from "@/lib/cookies/buildConsentState";
import { formatConsentDate } from "@/lib/cookies/formatConsentDate";

export function useCookieConsentStatus() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const update = () => setConsent(buildConsentState());

    update();

    const events = [
      "CookiebotOnConsentReady",
      "CookiebotOnAccept",
      "CookiebotOnDecline",
      "CookiebotOnLoad",
      "CookiebotOnDialogInit",
      "CookiebotOnDialogDisplay",
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, update);
    });

    const fallbackPoll = setInterval(update, 1500);

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, update);
      });
      clearInterval(fallbackPoll);
    };
  }, []);

  const consentDate = useMemo(() => {
    if (!consent?.utc) return null;
    return formatConsentDate(consent.utc);
  }, [consent?.utc]);

  const stateLabel = useMemo(() => {
    if (!consent) return "Unknown";
    const enabled = [];
    if (consent.necessary) enabled.push("Necessary");
    if (consent.preferences) enabled.push("Preferences");
    if (consent.statistics) enabled.push("Statistics");
    if (consent.marketing) enabled.push("Marketing");
    if (enabled.length === 4)
      return "Allow all (Necessary, Preferences, Statistics, Marketing)";
    if (enabled.length === 1) return `Allow ${enabled[0]}`;
    if (enabled.length > 1) return `Allow ${enabled.join(", ")}`;
    return "No categories allowed (only strictly necessary)";
  }, [consent]);

  const reopenBanner = () => {
    if (window.Cookiebot?.renew) {
      window.Cookiebot.renew();
      setTimeout(() => setConsent(buildConsentState()), 200);
    } else {
      alert(
        "To change or withdraw your consent, click the Cookiebot badge in the bottom-left corner of the page."
      );
    }
  };

  const withdrawAll = () => {
    if (window.Cookiebot?.withdraw) {
      window.Cookiebot.withdraw();
      setTimeout(() => setConsent(buildConsentState()), 200);
    } else if (window.Cookiebot?.renew) {
      window.Cookiebot.renew();
      setTimeout(() => setConsent(buildConsentState()), 200);
    } else {
      alert(
        "To withdraw your consent, click the Cookiebot badge in the bottom-left corner of the page."
      );
    }
  };

  return {
    consent,
    consentDate,
    stateLabel,
    reopenBanner,
    withdrawAll,
  };
}