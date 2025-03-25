import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Timeline from "@/components/Timeline";
import ProductCarousel from "@/components/ProductCarousel";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";

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
    },
    {
      image: "/home/slide2.jpg",
      title: "Activated Granola, Made with Love",
      subtitle: "Handcrafted with wholesome ingredients to nourish your gut and delight your taste buds.",
      buttonText: "Discover More",
    },
    {
      image: "/home/slide3.jpg",
      title: "From Allotment to Table",
      subtitle: "Inspired by fresh, homegrown produce and Nana’s timeless recipes.",
      buttonText: "Our Story",
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
            <ProductCarousel products={products} />
            <br></br>
            <br></br>
            <br></br>
            <ProductCard {...products[0]} />
          <Timeline
          timelineData={[
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
          ]}
          />  
        </main>
        <Footer />
    </div>
  );
}