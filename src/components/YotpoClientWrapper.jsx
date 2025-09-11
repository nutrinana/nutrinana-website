"use client";

import dynamic from "next/dynamic";

const YotpoReviewWidget = dynamic(() => import("@/components/YotpoReviewWidget"), { ssr: false });

/**
 * Client-side wrapper for @see {@link YotpoReviewWidget} to enable ssr: false in server components.
 *
 * @component
 *
 * @param {Object} props - The properties for the YotpoClientWrapper component.
 *
 * @returns {JSX.Element} The rendered YotpoClientWrapper component.
 */
export default function YotpoClientWrapper(props) {
    return <YotpoReviewWidget {...props} />;
}
