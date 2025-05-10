'use client';

import { useEffect } from 'react';

/**
 * YotpoReviewWidget component for displaying Yotpo reviews.
 * It initializes the Yotpo widgets after the component mounts.
 * 
 * @param {Object} props - The properties for the YotpoReviewWidget component.
 * @param {string} props.productId - The unique identifier for the product.
 * @param {string} props.name - The name of the product.
 * @param {string} props.url - The URL of the product page.
 * @param {string} props.imageUrl - The URL of the product image.
 * @param {number} props.price - The price of the product.
 * @param {string} [props.currency='GBP'] - The currency of the price (default is 'GBP').
 * @param {string} props.description - The description of the product.
 * 
 * @returns {JSX.Element} The rendered YotpoReviewWidget component.
 */
export default function YotpoReviewWidget({
    productId,
    name,
    url,
    imageUrl,
    price,
    currency = 'GBP',
    description,
}) {
    // Check if the Yotpo script is already loaded
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window !== 'undefined' && window.yotpoWidgetsContainer?.initWidgets) {
                // Initialize Yotpo widgets after a delay to ensure the script is loaded and the DOM is ready
                window.yotpoWidgetsContainer.initWidgets();
            }
        }, 200);
        return () => clearTimeout(timer);
    }, [productId]);

  return (
    <div
        className="yotpo-widget-instance"
        data-yotpo-instance-id="1092490"
        data-yotpo-product-id={productId}
        data-yotpo-name={name}
        data-yotpo-url={url}
        data-yotpo-image-url={imageUrl}
        data-yotpo-price={price}
        data-yotpo-currency={currency}
        data-yotpo-description={description}
    ></div>
  );
}