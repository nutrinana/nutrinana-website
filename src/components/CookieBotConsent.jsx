"use client";

import { useEffect } from "react";

export default function CookieBotConsent() {
    useEffect(() => {
        const script = document.createElement("script");
        script.id = "Cookiebot";
        script.src = "https://consent.cookiebot.com/uc.js";
        script.setAttribute("data-cbid", process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID);
        script.setAttribute("type", "text/javascript");
        script.setAttribute("async", "true");
        script.setAttribute("data-blockingmode", "auto");
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

  return null;
}