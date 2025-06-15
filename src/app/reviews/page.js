// Reviews page with Yotpo Reviews Widget
'use client';

import LeaveReviewForm from '@/components/LeaveReviewForm';
import RecentReviewCards from '@/components/RecentReviewCards';
import dynamic from 'next/dynamic';

const YotpoReviewWidget = dynamic(
  () => import('@/components/YotpoReviewWidget'),
  { ssr: false }
);

export default function ReviewsPage() {
  const mainProduct = {
    productId: 'activated-granola',
    name: "Nutrinana's Activated Granola",
    url: 'https://www.nutrinana.co.uk/activated-granola',
    imageUrl: 'https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg',
    price: 8.50,
    currency: 'GBP',
    description: 'A delicious and nutritious base granola for all flavours.',
  };

  return (
    <>
      <section className="w-full px-4 py-10 bg-white">
        <RecentReviewCards/>
      </section>

      <section className="w-full px-4 py-10 bg-white">
        <h2 className="text-2xl font-bold mb-6">Leave a Review</h2>
        <LeaveReviewForm productId={mainProduct.productId} />
      </section>

      <h2 id="more-reviews" className="text-2xl font-bold mb-6">More Reviews</h2>
      <YotpoReviewWidget
        productId={mainProduct.productId}
        name={mainProduct.name}
        url={mainProduct.url}
        imageUrl={mainProduct.imageUrl}
        price={mainProduct.price}
        currency={mainProduct.currency}
        description={mainProduct.description} 
      />
    </>
  );
}
