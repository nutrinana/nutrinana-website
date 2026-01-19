"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "nutrinana_cart_v1";

/**
 * Safely parse JSON, returning a fallback value on failure.
 *
 * @param {string} json - The JSON string to parse.
 * @param {any} fallback - The fallback value if parsing fails.
 *
 * @returns {any} The parsed JSON or the fallback value.
 */
function safeParse(json, fallback) {
    try {
        const val = JSON.parse(json);

        return Array.isArray(val) ? val : fallback;
    } catch {
        return fallback;
    }
}

/**
 * Custom hook to manage a shopping cart.
 *
 * It provides methods to add, update, and remove items,
 * as well as to clear the cart and get the total item count.
 *
 * @hook
 *
 * @returns {Object} The cart state and methods.
 * @returns {Array} items - The current items in the cart.
 * @returns {Function} addItem - Function to add an item to the cart.
 * @returns {Function} setQty - Function to set the quantity of an item.
 * @returns {Function} removeItem - Function to remove an item from the cart.
 * @returns {Function} clear - Function to clear the cart.
 * @returns {number} itemCount - The total count of items in the cart.
 * @returns {Function} toCheckoutPayload - Function to get the cart items in a checkout-friendly format.
 */
export function useCart() {
    const [items, setItems] = useState([]); // [{ productId: string, qty: number }]

    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        setItems(safeParse(raw, []));
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (productId, qty = 1) => {
        if (!productId) {
            return;
        }
        const n = Number(qty);
        if (!Number.isFinite(n) || n <= 0) {
            return;
        }

        setItems((prev) => {
            const idx = prev.findIndex((x) => x.productId === productId);
            if (idx === -1) {
                return [...prev, { productId, qty: n }];
            }

            const copy = [...prev];
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + n };

            return copy;
        });
    };

    const setQty = (productId, qty) => {
        if (!productId) {
            return;
        }
        const n = Number(qty);
        if (!Number.isFinite(n)) {
            return;
        }

        setItems((prev) =>
            prev
                .map((x) => (x.productId === productId ? { ...x, qty: n } : x))
                .filter((x) => x.qty > 0)
        );
    };

    const removeItem = (productId) => {
        if (!productId) {
            return;
        }
        setItems((prev) => prev.filter((x) => x.productId !== productId));
    };

    const clear = () => setItems([]);

    const itemCount = useMemo(() => items.reduce((sum, x) => sum + x.qty, 0), [items]);

    // Useful later for checkout payloads
    const toCheckoutPayload = () =>
        items.map((x) => ({
            productId: x.productId,
            qty: x.qty,
        }));

    return {
        items,
        addItem,
        setQty,
        removeItem,
        clear,
        itemCount,
        toCheckoutPayload,
    };
}
