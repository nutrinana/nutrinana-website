"use client";

import CookieCategoryTable from "@/components/CookieCategoryTable";
import { useCookieBotData } from "@/hooks/useCookieBotData";

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
    const { data, loading, error, grouped } = useCookieBotData({ domain, culture });

    if (loading) {
        return <p>Loading cookie information...</p>;
    }
    
    if (error) { 
        return <p role="alert">Could not load cookie information. {String(error)}</p>;
    }
    const anyCookies = (data?.cookies || []).length > 0;
    if (!anyCookies) return <p>No cookies found for this domain.</p>;

    return (
        <section className={className}>
            <div className="cookie-meta">
                <p>
                <strong>Domain:</strong> {data.domain || domain}
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