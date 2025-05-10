'use client';

import dynamic from 'next/dynamic';
import YotpoRawWidget
from '@/components/YotpoRawWidget';

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

  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         if (window?.yotpo?.initWidgets) {
  //             window.yotpo.initWidgets();
  //         }
  //     });
  //     return () => clearTimeout(timer);
  // }, []);
  return (
    // <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    //   <h1 className="text-2xl font-bold">Yotpo Reviews</h1>
    //   {/* Yotpo Reviews Widget for sample product */}


    //   {/* Yotpo Reviews Widget rendered with raw HTML */}
      
    // </div>

    // <YotpoReviewWidget
    // productId={sampleProduct.productId}
    // name={sampleProduct.name}
    // url={sampleProduct.url}
    // imageUrl={sampleProduct.imageUrl}
    // price={sampleProduct.price}
    // currency={sampleProduct.currency}
    // description={sampleProduct.description}
    // />

    //<div className="yotpo-widget-instance" data-yotpo-instance-id="1092490" data-yotpo-product-id="Product ID" data-yotpo-name="Product Title" data-yotpo-url="The URL of your product page" data-yotpo-image-url="The product image URL" data-yotpo-price="Product Price" data-yotpo-currency="Product Currency" data-yotpo-description="Product Description"></div>
    //<YotpoRawWidget />
    <YotpoReviewWidget 
      productId= {sampleProduct.productId}
      name={sampleProduct.name}
      url={sampleProduct.url}
      imageUrl={sampleProduct.imageUrl}
      price={sampleProduct.price}
      currency={sampleProduct.currency}
      description={sampleProduct.description} />
  );
}
