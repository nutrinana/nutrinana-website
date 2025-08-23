// Reviews page with Yotpo Reviews Widget
"use client";

import dynamic from "next/dynamic";

import LeaveReviewForm from "@/components/LeaveReviewForm";
import RecentReviewCards from "@/components/RecentReviewCards";

const YotpoSEOProductWidget = dynamic(() => import("@/components/YotpoSEOProductWidget"), {
    ssr: false,
});

const YotpoReviewWidget = dynamic(() => import("@/components/YotpoReviewWidget"), { ssr: false });

export default function ReviewsPage() {
    const mainProduct = {
        productId: "activated-granola",
        name: "Nutrinana's Activated Granola",
        url: "https://www.nutrinana.co.uk/activated-granola",
        imageUrl: "https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg",
        price: 8.5,
        currency: "GBP",
        description: "A delicious and nutritious base granola for all flavours.",
    };

    return (
        <>
            <section className="w-full bg-white px-4 py-10">
                <RecentReviewCards />
            </section>

            <section className="w-full bg-white px-4 py-10">
                <h2 className="font-heading mb-6 text-2xl">Leave a Review</h2>
                <LeaveReviewForm productId={mainProduct.productId} />
            </section>

            <h2 id="more-reviews" className="font-heading mb-6 text-2xl">
                More Reviews
            </h2>
            <div className="mx-auto max-w-400 px-4">
                <YotpoSEOProductWidget />
            </div>
            <style jsx global>{`
                /* Override Yotpo widget container styles */
                .not-prose[style*="width: 100vw"] {
                    width: 100% !important;
                    margin-left: 0 !important;
                    padding: 0 !important;
                }
            `}</style>
            {/* TODO: Remove this commented code block now we can get SEO to work with margins */}
            {/* <YotpoReviewWidget
        productId={mainProduct.productId}
        name={mainProduct.name}
        url={mainProduct.url}
        imageUrl={mainProduct.imageUrl}
        price={mainProduct.price}
        currency={mainProduct.currency}
        description={mainProduct.description} 
      /> */}
        </>
    );
}
