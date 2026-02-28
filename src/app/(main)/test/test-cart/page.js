"use client";

import { useCart } from "@/hooks/useCart";

export default function CartTestPage() {
    const { items, addItem, itemCount, clear } = useCart();

    return (
        <main className="p-6">
            <h1 className="text-xl font-semibold">Cart test</h1>
            <p className="mt-2">Item count: {itemCount}</p>

            <div className="mt-4 flex gap-2">
                <button
                    className="rounded border px-3 py-2"
                    onClick={() => addItem("NUTR-GRAN-MFC-500G", 1)}
                >
                    Add MFC
                </button>
                <button
                    className="rounded border px-3 py-2"
                    onClick={() => addItem("NUTR-GRAN-CHH-500G", 1)}
                >
                    Add CHH
                </button>
                <button className="rounded border px-3 py-2" onClick={clear}>
                    Clear
                </button>
            </div>

            <pre className="mt-6 rounded bg-gray-100 p-4 text-sm">
                {JSON.stringify(items, null, 2)}
            </pre>
        </main>
    );
}
