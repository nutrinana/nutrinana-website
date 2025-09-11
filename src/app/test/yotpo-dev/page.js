"use client";

import { useState } from "react";

export default function YotpoDevPage() {
    const [message, setMessage] = useState("");

    const triggerCreateProduct = async () => {
        const res = await fetch("/api/yotpo/create-product");
        const data = await res.json();
        setMessage(JSON.stringify(data, null, 2));
    };

    const triggerGenerateUtoken = async () => {
        const res = await fetch("/api/yotpo/generate-utoken", { method: "POST" });
        const data = await res.json();
        setMessage(JSON.stringify(data, null, 2));
    };

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-xl font-bold">Yotpo Dev Tools</h1>
            <button
                onClick={triggerCreateProduct}
                className="rounded bg-green-600 px-4 py-2 text-white"
            >
                Create Sample Product
            </button>
            <button
                onClick={triggerGenerateUtoken}
                className="rounded bg-blue-600 px-4 py-2 text-white"
            >
                Generate Utoken
            </button>
            <pre className="rounded bg-gray-100 p-4 whitespace-pre-wrap">{message}</pre>
        </div>
    );
}
