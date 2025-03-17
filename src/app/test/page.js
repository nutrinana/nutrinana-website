import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";

export default function TestPage() {
  return (
    <div>
        <Banner />
        <Navbar />
        <main className="p-10">
            <h1 className="text-3xl font-bold">Component Preview</h1>
            <ProductCard
                images={[
                    "/products/granola1.jpg",
                    "/products/granola2.jpg",
                    "/products/granola3.jpg",
                ]}
                title="Nutrinana's Activated Granola"
                subtitle="Mixed Fruits & Coconuts"
                features={["Gluten Free", "Dairy Free", "No Refined Sugar"]}
                price="£8.50"
                rating="5.0"
                shopLinks={[
                    { text: "Shop DELLI", href: "https://delli.market/products/nutrinanas-special-granola?_pos=1&_sid=1d1806f92&_ss=r" },
                    { text: "Shop Black Farmer", href: "https://theblackfarmer.com" },
                ]}
            />
        </main>
        <Footer />
    </div>
  );
}