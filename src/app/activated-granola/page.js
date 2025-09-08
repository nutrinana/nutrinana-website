// Activated Granola: Product page for Nutrinana website
"use client";

import dynamic from "next/dynamic";

import ActivatedGranolaMFC from "@/components/ActivatedGranolaMFC";
import KeyFeaturesBand from "@/components/KeyFeaturesBand";

const YotpoReviewWidget = dynamic(() => import("@/components/YotpoReviewWidget"), { ssr: false });

const mainProduct = {
    productId: "activated-granola-mfc",
    name: "Nutrinana's Activated Granola",
    url: "https://www.nutrinana.co.uk/activated-granola",
    imageUrl: "https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg",
    price: 8.5,
    currency: "GBP",
    description: "A delicious and nutritious base granola for all flavours.",
};

export default function ActivatedGranolaPage() {
    return (
        <>
            <div className="site-container">
                {/* Product Card Section */}
                <section className="section-y:first-child">
                    <ActivatedGranolaMFC />
                </section>

                {/* Key Features Band */}
                <section className="section-y">
                    <KeyFeaturesBand />
                </section>

                {/* Product Information */}
                <section className="section-y">
                    <h3 className="font-display mb-2 text-lg text-yellow-600">
                        What is activated?
                    </h3>
                    <p className="text-lg">
                        Activation is a traditional method that involves soaking nuts and seeds
                        before drying them. This process is commonly used by those looking to
                        replicate natural sprouting conditions, and is often associated with
                        traditional food preparation techniques. At Nutrinana, we use this method as
                        part of our careful ingredient preparation.
                    </p>
                </section>

                {/* Reviews Section */}
                <section className="section-y:last-child">
                    <h2 className="h2 text-2xl">Reviews</h2>
                    <YotpoReviewWidget
                        productId={mainProduct.productId}
                        name={mainProduct.name}
                        url={mainProduct.url}
                        imageUrl={mainProduct.imageUrl}
                        price={mainProduct.price}
                        currency={mainProduct.currency}
                        description={mainProduct.description}
                    />
                </section>
            </div>
        </>
    );
}
