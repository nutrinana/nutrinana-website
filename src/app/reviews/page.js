// Reviews page with Yotpo Review Widget

'use client';

import dynamic from 'next/dynamic';

const YotpoReviewWidget = dynamic(
  () => import('@/components/YotpoReviewWidget'),
  { ssr: false }
);

export default function ReviewsPage() {
  const sampleProduct = {
    productId: 'activated-granola-mfc',
    name: 'Nutrinana\'s Activated Granola - Mixed Fruits & Coconut',
    url: 'https://www.nutrinana.co.uk/activated-granola',
    imageUrl: 'https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg',
    price: 8.50,
    currency: 'GBP',
    description: 'Nutrinana\'s Activated Granola is a delicious and nutritious blend of mixed fruits and coconut, perfect for breakfast or a snack.',
  };

  return (
    <YotpoReviewWidget
      productId= {sampleProduct.productId}
      name={sampleProduct.name}
      url={sampleProduct.url}
      imageUrl={sampleProduct.imageUrl}
      price={sampleProduct.price}
      currency={sampleProduct.currency}
      description={sampleProduct.description} 
    />
  );
}
