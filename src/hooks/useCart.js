"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    useCallback,
    useRef,
} from "react";

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
    const [items, setItems] = useState([]);
    const [hydrated, setHydrated] = useState(false);
    const clearedBeforeHydrateRef = useRef(false);
    const MAX_QTY = 20;

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        if (clearedBeforeHydrateRef.current) {
            setHydrated(true);

            return;
        }

        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = safeParse(raw, []);
        setItems(parsed);
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        if (!hydrated) {
            return;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items, hydrated]);

    const addItem = useCallback((productId, qty = 1) => {
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
                return [...prev, { productId, qty: Math.min(n, MAX_QTY) }];
            }
            const copy = [...prev];
            copy[idx] = { ...copy[idx], qty: Math.min(copy[idx].qty + n, MAX_QTY) };

            return copy;
        });
    }, []);

    const setQty = useCallback((productId, qty) => {
        if (!productId) {
            return;
        }
        const n = Number(qty);
        if (!Number.isFinite(n)) {
            return;
        }

        setItems((prev) =>
            prev
                .map((x) => (x.productId === productId ? { ...x, qty: Math.min(n, MAX_QTY) } : x))
                .filter((x) => x.qty > 0)
        );
    }, []);

    const removeItem = useCallback((productId) => {
        if (!productId) {
            return;
        }
        setItems((prev) => prev.filter((x) => x.productId !== productId));
    }, []);

    const clear = useCallback(() => {
        clearedBeforeHydrateRef.current = true;

        setItems([]);

        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }

        setHydrated(true);
    }, []);

    const toCheckoutPayload = useCallback(
        () =>
            items.map((x) => ({
                productId: x.productId,
                qty: x.qty,
            })),
        [items]
    );

    const getItemQty = useCallback(
        (productId) => {
            return items.find((x) => x.productId === productId)?.qty ?? 0;
        },
        [items]
    );

    const value = useMemo(
        () => ({
            items,
            addItem,
            setQty,
            removeItem,
            clear,
            toCheckoutPayload,
            getItemQty,
        }),
        [items, addItem, setQty, removeItem, clear, toCheckoutPayload, getItemQty]
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
