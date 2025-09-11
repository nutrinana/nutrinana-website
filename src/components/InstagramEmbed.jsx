"use client";

import React from "react";

/**
 * InstagramEmbed component for embedding Instagram posts.
 *
 * Reusable iframe-based component for embedding Instagram posts.
 * Accepts a permalink URL and renders a styled, responsive embed.
 *
 * @component
 *
 * @param {Object} props
 * @param {string} props.src - The Instagram permalink to embed.
 *
 * @returns {JSX.Element|null} The rendered iframe or null if no src is provided.
 */
export default function InstagramEmbed({ src }) {
    if (!src) {
        return null;
    }

    return (
        <div className="h-[460px] w-full overflow-hidden border shadow-md sm:h-[580px]">
            <iframe
                src={src}
                className="h-full w-full"
                allowTransparency
                loading="lazy"
                title="Instagram Embed"
                scrolling="no"
                style={{ border: "none" }}
            />
        </div>
    );
}
