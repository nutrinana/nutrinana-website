"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

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

const CartContext = createContext(null);

/**
 * CartProvider
 *
 * Provides a shared cart store across the app so all components
 * see live updates (Navbar badge updates immediately).
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components.
 *
 * @returns {JSX.Element} The CartProvider component.
 */
export function CartProvider({ children }) {
    const [items, setItems] = useState([]); // [{ productId: string, qty: number }]

    // Load cart from localStorage on mount
    useEffect(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        setItems(safeParse(raw, []));
    }, []);

    // Save cart to localStorage on items change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    // Add an item to the cart
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

    // Set the quantity of a specific item
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

    // Remove an item from the cart
    const removeItem = (productId) => {
        if (!productId) {
            return;
        }
        setItems((prev) => prev.filter((x) => x.productId !== productId));
    };

    // Clear the cart
    const clear = () => setItems([]);

    // Total item count
    const itemCount = useMemo(() => items.reduce((sum, x) => sum + x.qty, 0), [items]);

    // Convert cart items to checkout payload format
    const toCheckoutPayload = useCallback(
        () =>
            items.map((x) => ({
                productId: x.productId,
                qty: x.qty,
            })),
        [items]
    );

    const value = useMemo(
        () => ({
            items,
            addItem,
            setQty,
            removeItem,
            clear,
            itemCount,
            toCheckoutPayload,
        }),
        [items, itemCount, toCheckoutPayload]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Custom hook to access the cart context.
 *
 * @hook useCart
 *
 * @returns {object} The cart context value.
 */
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used within a CartProvider");
    }

    return ctx;
}
