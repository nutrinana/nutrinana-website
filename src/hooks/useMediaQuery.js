import { useState, useEffect } from "react";

/**
 * Custom hook to check if a media query matches.
 * It listens for changes in the media query and updates the state accordingly.
 * Use this hook to conditionally render components based on screen size or other media features.
 * 
 * @param {string} query - The media query string to match against.
 * @returns {boolean} - `true` if the media query matches, false otherwise.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query, matches]);

  return matches;
}
