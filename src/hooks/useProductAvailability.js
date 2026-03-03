"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

/**
 * Custom hook to check product availability using the Pimento API.
 *
 * @hook
 *
 * @param {string} pimentoProductId - The product ID used for checking availability via Pimento API.
 *
 * @returns {Object} An object containing:
 *  - available: A boolean indicating whether the product is available.
 *  - isLoading: A boolean indicating whether the availability check is still loading.
 */
export function useProductAvailability(pimentoProductId) {
    const checkAvailability = process.env.NEXT_PUBLIC_CHECK_AVAILABILITY !== "false";

    const { data, isLoading } = useSWR(
        pimentoProductId
            ? `/api/pimento/products/availability?pimentoProductId=${pimentoProductId}`
            : null,
        fetcher,
        { refreshInterval: 300_000 }
    );

    if (!checkAvailability) {
        return { available: true, isLoading: false };
    }

    return {
        available: data?.available ?? true,
        isLoading,
    };
}
