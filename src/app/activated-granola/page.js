// Activated Granola: Product page for Nutrinana website
"use client";

import dynamic from "next/dynamic";

import GlobalAccordion from "@/components/GlobalAccordion";
import NutritionTable from "@/components/NutritionTable";
import ProductShowcase from "@/components/ProductShowcase";
import { Separator } from "@/components/ui/separator";

const YotpoReviewWidget = dynamic(() => import("@/components/YotpoReviewWidget"), { ssr: false });

const accordionData = [
    {
        title: "Ingredients & Allergens",
        content: (
            <>
                Activated Seeds and <strong>Nuts</strong> (
                <strong>Almonds, Cashews, Walnuts, Brazil nuts, Pecan nuts, Hazelnuts</strong>,
                Pumpkin seeds, Sunflower seeds); Organic Oats; Dried Mixed Fruits (Raisins,
                Sultanas, Cranberries); Unsweetened Dried Coconut Chips; Himalayan Salt; Organic
                Virgin Coconut Oil; Maple Syrup; Mixed Spices.
                <br />
                <br />
                <strong>For allergens, see words in bold.</strong>
            </>
        ),
    },
    {
        title: "Nutritional Information",
        content: (
            <NutritionTable
                data={[
                    {
                        name: "Energy",
                        per100g: "2300 kJ / 550 kcal",
                        perServing: "1400 kJ / 330 kcal",
                        ri: "17%",
                    },
                    {
                        name: "Fat\nof which saturates",
                        per100g: "42 g\n7.1 g",
                        perServing: "25 g\n4.3 g",
                        ri: "36%\n22%",
                    },
                    {
                        name: "Carbohydrate\nof which sugars",
                        per100g: "30 g\n4.4 g",
                        perServing: "18 g\n2.7 g",
                        ri: "7%\n3%",
                    },
                    { name: "Protein", per100g: "22 g", perServing: "13 g", ri: "26%" },
                    { name: "Salt", per100g: "0.14 g", perServing: "0.08 g", ri: "1%" },
                    { name: "Fibre", per100g: "17 g", perServing: "10 g", ri: "33%" },
                ]}
                recommendation="We recommend a 60g serving of our Activated Granola, which is about 8 servings per pack. This granola contains no added sugar or artificial ingredients, making it a healthy choice for your breakfast or snack."
                note="*RI = Reference Intake of an average adult’s daily intake of 8400kJ/2000kcal."
            />
        ),
    },
];

const productData = [
    {
        images: [
            "/products/mixed-fruits/granola1.jpg",
            "/products/mixed-fruits/granola2.jpg",
            "/products/mixed-fruits/granola3.jpg",
        ],
        title: "Nutrinana's Activated Granola",
        subtitle: "Mixed Fruits & Coconut",
        description:
            "Our activated granola is gluten-free, dairy-free, and contains no refined sugar. Made with traditionally activated nuts and seeds for better digestibility.",
        price: "£8.50",
        size: "500g",
        shopLinks: [
            {
                text: "Shop DELLI",
                href: "https://delli.market/products/nutrinanas-special-granola?_pos=1&_sid=1d1806f92&_ss=r",
            },
            { text: "Shop Black Farmer", href: "https://theblackfarmer.com" },
        ],
        externalId: "activated-granola-mfc",
        accordionData: accordionData,
    },
];

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
        <div className="site-container">
            {/* Product Card Section */}
            <section className="section-y:first-child">
                <ProductShowcase {...productData[0]} />
            </section>

            {/* Product Information */}
            <section className="section-y">
                <h2 className="h2 text-2xl">Product Information</h2>
                <Separator className="bg-raisin my-4" />
                <h3 className="font-display mb-2 text-lg text-yellow-600">What is activated?</h3>
                <p className="text-lg">
                    Activation is a traditional method that involves soaking nuts and seeds before
                    drying them. This process is commonly used by those looking to replicate natural
                    sprouting conditions, and is often associated with traditional food preparation
                    techniques. At Nutrinana, we use this method as part of our careful ingredient
                    preparation.
                </p>
            </section>

            {/* Reviews Section */}
            <section className="section-y">
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
    );
}
