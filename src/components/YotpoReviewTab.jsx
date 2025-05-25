'use client';

import { useEffect } from 'react';

/**
 * YotpoReviewTab component for displaying product reviews using Yotpo widgets.
 * This component initializes the Yotpo review tab widget for a specific product ID.
 * 
 * @param {Object} props - The properties for the YotpoReviewTab component.
 * @param {string} props.productId - The unique identifier for the product to display reviews for.
 * 
 * @returns {JSX.Element} The rendered Yotpo review tab component.
 */
export default function YotpoReviewTab({productId}) {
    // Check if the Yotpo script is already loaded
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window !== 'undefined' && window.yotpoWidgetsContainer?.initWidgets) {
                // Initialize Yotpo widgets after a delay to ensure the script is loaded and the DOM is ready
                window.yotpoWidgetsContainer.initWidgets();
            }
        }, 200);
        // Cleanup function to clear the timeout if the component unmounts before the timer completes
        return () => clearTimeout(timer);
    }, [productId]);

    return (
        // Yotpo widget instance for displaying review tab
        <div 
            class="yotpo-widget-instance" 
            data-yotpo-instance-id="1115782" 
            data-yotpo-product-id={productId}
        />
    );
}