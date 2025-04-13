"use client";

import React from "react";

/**
 * InstagramEmbed
 * Reusable iframe-based component for embedding Instagram posts.
 * Accepts a permalink URL and renders a styled, responsive embed.
 *
 * @param {Object} props
 * @param {string} props.src - The Instagram permalink to embed.
 * 
 * @returns {JSX.Element|null} The Instagram embed component or null if no src is provided.
 */
export default function InstagramEmbed({ src }) {
  if (!src) return null;

  return (
    <div className="w-full aspect-[4/5] border shadow-md sm:max-w-full overflow-hidden">
      <iframe
        src={src}
        className="w-full h-full"
        allowTransparency
        loading="lazy"
        title="Instagram Embed"
        scrolling="no"
        style={{ border: "none" }}
      />
    </div>
  );
}
