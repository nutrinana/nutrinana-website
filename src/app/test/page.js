import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ProductCarousel from "@/components/ProductCarousel";

// TODO: uncomment the following code snippet to see the ProductCarousel component in action
const products = [
    {
        images: ["/products/mixed-fruits/granola1.jpg", "/products/mixed-fruits/granola2.jpg", "/products/mixed-fruits/granola3.jpg"],
        title: "Nutrinana's Activated Granola",
        subtitle: "Mixed Fruits & Coconut",
        features: ["Gluten-Free", "Dairy-Free", "No Refined Sugar"],
        price: "£8.50",
        rating: "5.0",
        shopLinks: [
            { text: "Shop DELLI", href: "https://delli.market/products/nutrinanas-special-granola?_pos=1&_sid=1d1806f92&_ss=r" },
            { text: "Shop Black Farmer", href: "https://theblackfarmer.com" }
        ]
    },
    {
        images: ["/products/mixed-fruits/granola1.jpg", "/products/mixed-fruits/granola2.jpg", "/products/mixed-fruits/granola3.jpg"],
        title: "Nutrinana's Activated Granola",
        subtitle: "Mixed Fruits & Coconut",
        features: ["Gluten-Free", "Dairy-Free", "No Refined Sugar"],
        price: "£8.50",
        rating: "5.0",
        shopLinks: [
            { text: "Shop DELLI", href: "https://delli.market/products/nutrinanas-special-granola?_pos=1&_sid=1d1806f92&_ss=r" },
            { text: "Shop Black Farmer", href: "https://theblackfarmer.com" }
        ]
    },
    {
        images: ["/products/mixed-fruits/granola1.jpg", "/products/mixed-fruits/granola2.jpg", "/products/mixed-fruits/granola3.jpg"],
        title: "Nutrinana's Activated Granola",
        subtitle: "Mixed Fruits & Coconut",
        features: ["Gluten-Free", "Dairy-Free", "No Refined Sugar"],
        price: "£8.50",
        rating: "5.0",
        shopLinks: [
            { text: "Shop DELLI", href: "https://delli.market/products/nutrinanas-special-granola?_pos=1&_sid=1d1806f92&_ss=r" },
            { text: "Shop Black Farmer", href: "https://theblackfarmer.com" }
        ]
    },
    // Add more products
];


export default function TestPage() {
  return (
    <div>
        <Banner />
        <Navbar />
        <main className="p-10">
            <h1 className="text-3xl font-bold">Component Preview</h1>
            <ProductCarousel products={products} />
        </main>
        <Footer />
    </div>
  );
}