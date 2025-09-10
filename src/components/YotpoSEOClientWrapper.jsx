"use client";

import dynamic from "next/dynamic";

const YotpoSEOProductWidget = dynamic(() => import("@/components/YotpoSEOProductWidget"), {
    ssr: false,
});

/**
 * Client-side wrapper for @see {@link YotpoSEOProductWidget} to enable ssr: false in server components.
 *
 * @component
 *
 * @param {Object} props - The properties for the YotpoSEOClientWrapper component.
 *
 * @returns {JSX.Element} The rendered YotpoSEOClientWrapper component.
 */
export default function YotpoSEOClientWrapper(props) {
    return <YotpoSEOProductWidget {...props} />;
}
