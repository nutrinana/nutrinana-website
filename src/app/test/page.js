import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Timeline from "@/components/Timeline";
import ProductCarousel from "@/components/ProductCarousel";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import GlobalAccordion from "@/components/GlobalAccordion";
import NutritionTable from "@/components/NutritionTable";
import { ContactForm } from "@/components/ContactForm";
import InstagramFeed from "@/components/InstagramFeed";
import { Button } from "@/components/ui/button";

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

const slides = [
    {
      image: "/home/slide1.jpg",
      title: "Tasting Session with The Black Farmer!",
      subtitle: "Saturday 7th July @ The Black Farmer’s Market, Market Row, SW9 8LD",
      buttonText: "Shop Now",
      buttonLink: "https://theblackfarmer.com"
    },
    {
      image: "/home/slide2.jpg",
      title: "Activated Granola, Made with Love",
      subtitle: "Handcrafted with wholesome ingredients to nourish your gut and delight your taste buds.",
      buttonText: "Discover More",
      buttonLink: "/products"
    },
    {
      image: "/home/slide3.jpg",
      title: "From Allotment to Table",
      subtitle: "Inspired by fresh, homegrown produce and Nana’s timeless recipes.",
      buttonText: "Our Story",
      buttonLink: "/about"
    },
];

const timelineData = [
    {
        year: "2021",
        text: "The magic begins! Nana perfects her activated granola recipe and starts selling it to her local neighbourhood.",
        image: "/timeline/2021.jpg"
    },
    {
        year: "2022",
        text: "Nutrinana goes digital! The Activated Granola hits the virtual shelves on DELLI, making its way to kitchens across the UK.",
        image: "/timeline/2022.jpeg"
    },
    {
        year: "2023",
        text: "Nana joins forces with a group of green-thumbed garden enthusiasts to grow her own veggies in a shared allotment. Fresh, home-grown ingredients inspire new recipes, which she shares with her growing Instagram family.",
        image: "/timeline/2023.jpg"
    },
    {
        year: "2024",
        text: "Nutrinana’s Activated Granola finds a home in the Black Farmers Shop in Brixton, bringing the taste of Nana’s kitchen to even more happy customers. This is only just the beginning!",
        image: "/timeline/2024.jpeg"
    }
];

const accordionData = [
    {
        title: "Ingredients & Allergens",
        content: (
            <>
                Activated Seeds and <strong>Nuts</strong> (<strong>Almonds, Cashews, Walnuts, Brazil nuts, Pecan nuts, Hazelnuts</strong>, Pumpkin seeds, Sunflower seeds); Organic Oats; Dried Mixed Fruits (Raisins, Sultanas, Cranberries); Unsweetened Dried Coconut Chips; Himalayan Salt; Organic Virgin Coconut Oil; Maple Syrup; Mixed Spices.
                <br /><br />
                <strong>For allergens, see words in bold.</strong>
            </>
        ),
    },
    {
        title: "Storage and Date",
        subtitle: "How should I store my granola, and how long does it last?",
        content: "To keep your granola fresh and crunchy, store it in an airtight container in a cool, dry place. Our granola has a shelf life of 6-12 months if stored properly—but let's be honest, it'll probably last less than that because it's just that tasty! You'll find the best-before date printed on the package, so you can enjoy every bite at its peak. Remember to reseal the packaging after each use to maintain its freshness!",
    },
    {
        title: "Nutritional Information",
        content: (
            <NutritionTable
                data={[
                    { name: "Energy", per100g: "2300 kJ / 550 kcal", perServing: "1400 kJ / 330 kcal", ri: "17%" },
                    { name: "Fat\nof which saturates", per100g: "42 g\n7.1 g", perServing: "25 g\n4.3 g", ri: "36%\n22%" },
                    { name: "Carbohydrate\nof which sugars", per100g: "30 g\n4.4 g", perServing: "18 g\n2.7 g", ri: "7%\n3%" },
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

export default function TestPage() {
  return (
    <div>
        <Banner />
        <Navbar />
        <HeroSlider slides={slides} />
        <main className="p-10">
            <h1 className="text-3xl font-bold">Component Preview</h1>
            <h2 className="text-2xl font-bold mb-4">Error Test</h2>
            <p>Visit <a href="test/test-error" className="text-blue-600 underline">/test-error</a> to trigger the error page.</p>
            <section className="my-10">
              <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="green">Green</Button>
                <Button variant="greenOutlined">Green Outlined</Button>
                <Button variant="yellow">Yellow</Button>
                <Button variant="pink">Pink</Button>
                <Button variant="pinkOutlined">Pink Outlined</Button>
                <Button variant="grey">Grey</Button>
              </div>
            </section>
            <ProductCarousel products={products} />
            <br></br>
            <br></br>
            <br></br>
            <GlobalAccordion items={accordionData} />
            <br></br>
            <br></br>
            <br></br>
            <Timeline timelineData={timelineData} />  
            <br></br>
            <br></br>
            <br></br>
            <ContactForm/>
            <br /><br /><br />
            <h2 className="text-2xl font-bold mb-4">Instagram Feed</h2>
            <InstagramFeed />
            <br /><br /><br />
        </main>
        <Footer />
    </div>
  );
}