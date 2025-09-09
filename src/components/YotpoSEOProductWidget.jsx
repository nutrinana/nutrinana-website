"use client";

import { useEffect } from "react";

/**
 * Yotpo SEO Product Widget component for displaying Yotpo reviews.
 *
 * It initializes the Yotpo widgets after the component mounts.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered YotpoSEOProductWidget component.
 */
export default function YotpoSEOProductWidget() {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window !== "undefined" && window.yotpoWidgetsContainer?.initWidgets) {
                window.yotpoWidgetsContainer.initWidgets();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, []);

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
