"use client";

import ReactCookieBot from "react-cookiebot";

/**
 * CookieBotConsent component to handle cookie consent management.
 * It uses the react-cookiebot library to display a cookie consent banner.
 * 
 * @returns {JSX.Element} The CookieBot consent banner component.
 */
export default function CookieBotConsent() {
    return (
        <ReactCookieBot
            domainGroupId={process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID}
        />
    );
}