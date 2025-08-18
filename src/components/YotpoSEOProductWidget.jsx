"use client";

import { useEffect } from "react";

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
                width: "100vw",
                marginLeft: "calc(-50vw + 50%)",
                padding: "0",
                paddingTop: "0",
                marginTop: "0",
                backgroundColor: "#fff",
            }}
        >
            <div
                className="yotpo-widget-instance"
                data-yotpo-instance-id="1119658"
                style={{
                    maxWidth: "100%",
                    overflowX: "auto",
                }}
            />
        </div>
    );
}
