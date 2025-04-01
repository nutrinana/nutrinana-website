/**
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
