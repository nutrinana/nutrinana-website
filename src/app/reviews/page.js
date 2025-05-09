'use client';


export default function ReviewsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">Yotpo Reviews</h1>
      <p className="text-gray-700">
        This page demonstrates the Yotpo Reviews widget for a sample product. You can customize the product details below.
      </p>
      {/* Direct Yotpo Widget */}
      <div
        className="yotpo-widget-instance"
        data-yotpo-instance-id="1092490"
        data-yotpo-product-id="activated-granola-mfc"
        data-yotpo-name="Nutrinana's Activated Granola - Mixed Fruits & Coconut"
        data-yotpo-url="https://www.nutrinana.co.uk/activated-granola"
        data-yotpo-image-url="https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg"
        data-yotpo-price="8.50"
        data-yotpo-currency="GBP"
        data-yotpo-description="Nutrinana's Activated Granola is a delicious and nutritious blend of mixed fruits and coconut, perfect for breakfast or a snack."
      ></div>
    </div>
  );
}
