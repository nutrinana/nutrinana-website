'use client';

import YotpoReviewWidget from '@/components/YotpoReviewWidget';

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
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">Yotpo Reviews</h1>
      <p className="text-gray-700">
        This page demonstrates the Yotpo Reviews widget for a sample product. You can customize the product details below.
      </p>
      {/* Yotpo Reviews Widget for sample product */}
      <YotpoReviewWidget
        productId={sampleProduct.productId}
        name={sampleProduct.name}
        url={sampleProduct.url}
        imageUrl={sampleProduct.imageUrl}
        price={sampleProduct.price}
        currency={sampleProduct.currency}
        description={sampleProduct.description}
      />
    </div>
  );
}
