"use client";

import { useEffect, useMemo, useState, useRef } from "react"; 
import CookieCategoryTable from "@/components/CookieCategoryTable";

/**
 * CookieBotTable component to display cookies from Cookiebot API.
 * 
 * It fetches cookie data for a specified domain and culture,
 * and displays them in categorised tables.
 * 
 * @param {object} props - The properties for the component.
 * - {string} [props.domain] - The domain to fetch cookies for (default: "www.nutrinana.co.uk").
 * - {string} [props.culture] - The culture/language for the cookies (default: "default").
 * - {string} [props.className] - Additional CSS classes for the component.
 * - {boolean} [props.showAdvanced=false] - Whether to show advanced cookie details.
 * - {Array} [props.categories=[1, 2, 3, 4, 5]] - The categories of cookies to display. 
 * @returns {JSX.Element} The rendered CookieBotTable component.
 */
export default function CookieBotTable({
    domain = "www.nutrinana.co.uk",
    culture = "default",
    className = "",
    showAdvanced = false,
    categories = [1, 2, 3, 4, 5],
}) {
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
        const buckets = { 1: [], 2: [], 3: [], 4: [], 5: [] };

        for (const c of data?.cookies || []) {
            const cat = parseInt(c?.category ?? 5, 10);
            if (buckets[cat]) buckets[cat].push(c);
            else buckets[5].push(c);
        }
        return buckets;
    }, [data]);

    if (loading) return <p>Loading cookie information...</p>;
    if (error) return <p role="alert">Could not load cookie information. {String(error)}</p>;
    const anyCookies = (data?.cookies || []).length > 0;
    if (!anyCookies) return <p>No cookies found for this domain.</p>;

    return (
        <section className={className}>
            <div className="cookie-meta">
                <p>
                <strong>Domain:</strong> {data.domain || resolvedDomain}
                {data.culture ? (
                    <>
                        {" "}•{" "}
                        <strong>Language:</strong> {data.culture}
                    </>
                ) : null}
                </p>
            </div>

            {categories.map((cat) => (
                <CookieCategoryTable
                    key={cat}
                    category={cat}
                    cookies={grouped[cat]}
                    showAdvanced={showAdvanced}
                />
            ))}
        </section>
    );
}