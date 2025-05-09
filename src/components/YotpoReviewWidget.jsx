'use client';

import { useState, useEffect } from 'react';

export default function YotpoReviewWidget({
  productId,
  name,
  url,
  imageUrl,
  price,
  currency = 'GBP',
  description,
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

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