"use client";

import dynamic from "next/dynamic";

const YotpoReviewWidget = dynamic(() => import("@/components/YotpoReviewWidget"), { ssr: false });

/**
 * Client-side wrapper for YotpoReviewWidget to enable ssr: false in server components.
 */
export default function YotpoClientWrapper(props) {
    return <YotpoReviewWidget {...props} />;
}
