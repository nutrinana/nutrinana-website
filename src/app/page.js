import HeroSlider from "@/components/HeroSlider";
import ProductCarousel from "@/components/ProductCarousel";
import InstagramFeed from "@/components/InstagramFeed";
import { Button } from "@/components/ui/button";

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

const products = [
  {
    images: [
      "/products/mixed-fruits/granola1.jpg",
      "/products/mixed-fruits/granola2.jpg",
      "/products/mixed-fruits/granola3.jpg"
    ],
    title: "Nutrinana's Activated Granola",
    subtitle: "mixed fruits & coconuts",
    features: ["Gluten Free", "Dairy Free", "No Refined Sugar"],
    price: "£8.50",
    rating: "5.0",
    shopLinks: [
      {
        text: "Shop DELLI",
        href: "https://delli.market/products/nutrinanas-special-granola?_pos=1&_sid=1d1806f92&_ss=r"
      },
      {
        text: "Shop Black Farmer",
        href: "https://theblackfarmer.com"
      }
    ]
  }
];

export default function Home() {
  return (
    <>
      <HeroSlider slides={slides} />

      <main className="px-4 sm:px-6 lg:px-10 py-10 space-y-16">
        <section className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Great Taste Award Winner in 2025</h2>
          <Button variant="yellow" size="sm" asChild>
            <a href="/about">About Nutrinana</a>
          </Button>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Activated Granola</h2>
          <ProductCarousel products={products} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
          {/* TODO: Add review component */}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Follow us on Instagram!</h2>
          <InstagramFeed />
        </section>
      </main>
    </>
  );
}