"use client";

import { useEffect } from "react";

export default function CookieBotDeclaration() {
    useEffect(() => {
        const script = document.createElement("script");
        script.id = "CookieDeclarationScript";
        script.src = "https://consent.cookiebot.com/27715517-ad64-4579-a081-c850bd53ca31/cd.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Render the target div for Cookiebot
    return <div id="CookieDeclaration"></div>;
}