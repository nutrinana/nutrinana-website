"use client";

import dynamic from "next/dynamic";

const YotpoSEOProductWidget = dynamic(() => import("@/components/YotpoSEOProductWidget"), {
    ssr: false,
});

/**
 * Client-side wrapper for YotpoSEOProductWidget to enable ssr: false in server components.
 */
export default function YotpoSEOClientWrapper(props) {
    return <YotpoSEOProductWidget {...props} />;
}
