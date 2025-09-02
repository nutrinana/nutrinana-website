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
        <div className="site-container">
            <section className="section-y">
                <RecentReviewCards />
            </section>

            <section className="section-y">
                <h2 className="h2 mb-6">Leave a Review</h2>
                <LeaveReviewForm productId={mainProduct.productId} />
            </section>

            <section className="section-y">
                <h2 id="more-reviews" className="h2 mb-6">
                    More Reviews
                </h2>
                <div className="max-w-400">
                    <YotpoSEOProductWidget />
                </div>
            </section>
            <style jsx global>{`
                /* Override Yotpo widget container styles */
                .not-prose[style*="width: 100vw"] {
                    width: 100% !important;
                    margin-left: 0 !important;
                    padding: 0 !important;
                }
            `}</style>
        </div>
    );
}
