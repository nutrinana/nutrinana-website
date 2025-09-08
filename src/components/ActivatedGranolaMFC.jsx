"use client";

import NutritionTable from "@/components/NutritionTable";
import ProductShowcase from "@/components/ProductShowcase";

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

const productData = {
    images: [
        "/products/mixed-fruits/granola1.jpg",
        "/products/mixed-fruits/granola2.jpg",
        "/products/mixed-fruits/granola3.jpg",
    ],
    title: "Nutrinana's Activated Granola",
    subtitle: "Mixed Fruits & Coconut",
    description:
        "Our activated granola is gluten-free, dairy-free, and made without refined sugar. Crafted with traditionally soaked and dried nuts and seeds, wholesome oats, dried fruits, and coconut. Perfect for breakfast or a nourishing snack, enjoy it with Greek yoghurt and fresh berries, sprinkled over porridge, or simply by the handful straight from the bag.",
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
};

/**
 * ActivatedGranolaMFC component for displaying the Mixed Fruits & Coconut granola product.
 *
 * This component wraps ProductShowcase with the specific data for this product variant.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered ActivatedGranolaMFC component.
 */
export default function ActivatedGranolaMFC() {
    return <ProductShowcase {...productData} />;
}
