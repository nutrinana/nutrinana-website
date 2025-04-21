/****
 * Utility functions used throughout the Nutrinana website.
 * Includes class name merging and safe rendering of line-breaks in strings.
 */

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes conditionally using `clsx` and `tailwind-merge`.
 * 
 * @param  {...any} inputs - Class names or conditional expressions.
 * @returns {string} A single merged class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Renders a string with newline characters (`\n`) as line breaks (`<br />`) in JSX.
 * 
 * @param {string} text - The text to be rendered with line breaks.
 * @returns {JSX.Element} A React fragment containing the text with line breaks.
 */
export function renderWithLineBreaks(text) {
  // Splits the text into lines and adds <br /> for each line
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}

/**
 * Formats a date string into "DD MMM YYYY" format.
 *
 * @param {string} dateString - The ISO or UTC date string to format.
 * @returns {string} Formatted date string.
 */
export function formatDate(dateString) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

/**
 * Extracts hashtags from a given text string.
 *
 * @param {string} text - The text to extract hashtags from.
 * @returns {string[]} Array of hashtags.
 */
export function extractHashtags(text) {
  if (!text) return [];
  return text.match(/#[a-zA-Z0-9_]+/g) || [];
}

/**
 * Formats a caption string by wrapping hashtags and mentions with styled spans.
 *
 * @param {string} caption - The Instagram caption to format.
 * @returns {JSX.Element[]} Array of React elements with styled hashtags/mentions.
 */
export function formatCaption(caption) {
  return caption.split(/(\s+)/).map((word, index) => {
    if (word.startsWith('@') || word.startsWith('#')) {
      const match = word.match(/^([@#][\w_-]+(?:\.[\w_-]+)*)(['’]?[a-z]*)?(\W*)$/i);
      if (match) {
        return (
          <React.Fragment key={index}>
            <span style={{ color: "rgb(20, 54, 103)" }}>{match[1]}</span>
            {match[2]}
            {match[3]}
          </React.Fragment>
        );
      }
    }
    return word;
  });
}
