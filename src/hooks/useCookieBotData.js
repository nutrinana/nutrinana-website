import { useEffect, useMemo, useState, useRef } from "react";
import { groupCookiesByCategory } from "@/lib/cookies/groupCookiesByCategory";

/**
 * Custom hook to fetch and manage Cookiebot data.
 * It retrieves cookie data for a specified domain and culture,
 * and groups the cookies by their categories.
 * 
 * @param {Object} params - The parameters for the hook.
 * - {string} [params.domain="www.nutrinana.co.uk"] - The domain to fetch cookies for.
 * - {string} [params.culture="default"] - The culture/language for the cookies.
 * @returns {Object} An object containing:
 * - {Array} data.cookies - The list of cookies.
 * - {string} data.domain - The domain for which cookies were fetched.
 * - {string} data.culture - The culture/language for the cookies.
 * - {boolean} loading - Whether the data is currently being loaded.
 * - {Error|null} error - Any error that occurred during the fetch.
 * - {Object} grouped - An object with categories as keys and arrays of cookies as values
 */
export function useCookieBotData({ domain = "www.nutrinana.co.uk", culture = "default" }) {
    const [data, setData] = useState({ cookies: [], domain: "", culture: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetchedRef = useRef(false);

    const resolvedDomain = useMemo(() => {
        if (domain) return domain;
        if (typeof window !== "undefined") return window.location.hostname;
        return "";
    }, [domain]);

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        if (!resolvedDomain) {
            setLoading(false);
            setError("No domain available");
            return;
        }

        const controller = new AbortController();
        const url = `/api/cookiebot?domain=${encodeURIComponent(resolvedDomain)}&culture=${encodeURIComponent(culture)}`;

        (async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                setData(json || { cookies: [] });
            } catch (e) {
                if (e?.name !== "AbortError") setError(e?.message || "Failed to load cookies");
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [resolvedDomain, culture]);

    const grouped = useMemo(() => {
        return groupCookiesByCategory(data?.cookies || []);
    }, [data]);

    return { data, loading, error, grouped };
}
