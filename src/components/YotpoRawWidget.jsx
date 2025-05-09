'use client';

import { useEffect } from 'react';

export default function YotpoRawWidget() {
  useEffect(() => {
    if (window.yotpo?.initWidgets) {
      window.yotpo.initWidgets();
    }
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
          <div
            class="yotpo-widget-instance"
            data-yotpo-instance-id="1092490"
            data-yotpo-product-id="activated-granola-mfc"
            data-yotpo-name="Nutrinana's Activated Granola - Mixed Fruits & Coconut"
            data-yotpo-url="https://www.nutrinana.co.uk/activated-granola"
            data-yotpo-image-url="https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg"
            data-yotpo-price="8.50"
            data-yotpo-currency="GBP"
            data-yotpo-description="Nutrinana's Activated Granola is a delicious and nutritious blend of mixed fruits and coconut, perfect for breakfast or a snack."
          ></div>
        `,
      }}
    />
  );
}