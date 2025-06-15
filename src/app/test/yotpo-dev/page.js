'use client';

import { useState } from 'react';

export default function YotpoDevPage() {
  const [message, setMessage] = useState('');

  const triggerCreateProduct = async () => {
    const res = await fetch('/api/yotpo/create-product');
    const data = await res.json();
    setMessage(JSON.stringify(data, null, 2));
  };

  const triggerGenerateUtoken = async () => {
    const res = await fetch('/api/yotpo/generate-utoken', { method: 'POST' });
    const data = await res.json();
    setMessage(JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Yotpo Dev Tools</h1>
      <button onClick={triggerCreateProduct} className="px-4 py-2 bg-green-600 text-white rounded">
        Create Sample Product
      </button>
      <button onClick={triggerGenerateUtoken} className="px-4 py-2 bg-blue-600 text-white rounded">
        Generate Utoken
      </button>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{message}</pre>
    </div>
  );
}