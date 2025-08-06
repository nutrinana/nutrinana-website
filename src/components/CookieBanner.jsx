"use client";

import ReactCookieBot from "react-cookiebot";

const domainGroupId = process.env.NEXT_PUBLIC_COOKIEBOT_DOMAIN_ID;

/**
 * CookieBanner component to display the CookieBot banner for cookie consent.
 * It uses the ReactCookieBot library to handle cookie consent management.
 * 
 * @returns {JSX.Element} The rendered CookieBanner component.
 */
export default function CookieBanner() {
    
    return (
        <ReactCookieBot domainGroupId={domainGroupId}/>
    );
}