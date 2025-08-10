"use client";

import { useEffect } from "react";

export default function CookieBotDeclaration() {
    useEffect(() => {
        const script = document.createElement("script");
        script.id = "CookieDeclaration";
        script.src = `https://consent.cookiebot.com/${process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID}/cd.js`;
        script.setAttribute("type", "text/javascript");
        script.setAttribute("async", "true");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

  return null;
}