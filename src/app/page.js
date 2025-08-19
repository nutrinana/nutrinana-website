// Home Page
import CalloutSection from "@/components/CalloutSection";
import HeroSlider from "@/components/HeroSlider";
import InstagramFeed from "@/components/InstagramFeed";
import LeaveReviewForm from "@/components/LeaveReviewForm";
import ProductCarousel from "@/components/ProductCarousel";

const slides = [
    {
        image: "/home/slide1.jpg",
        title: "Tasting Session with The Black Farmer!",
        subtitle: "Saturday 7th July @ The Black Farmer’s Market, Market Row, SW9 8LD",
        buttonText: "Shop Now",
        buttonLink: "https://theblackfarmer.com",
    },
    {
        image: "/home/slide2.jpg",
        title: "Activated Granola, Made with Love",
        subtitle:
            "Handcrafted with wholesome ingredients to nourish your gut and delight your taste buds.",
        buttonText: "Discover More",
        buttonLink: "/products",
    },
    {
        image: "/home/slide3.jpg",
        title: "From Allotment to Table",
        subtitle: "Inspired by fresh, homegrown produce and Nana’s timeless recipes.",
        buttonText: "Our Story",
        buttonLink: "/about",
    },
];

const products = [
    {
        images: [
            "/products/mixed-fruits/granola1.jpg",
            "/products/mixed-fruits/granola2.jpg",
            "/products/mixed-fruits/granola3.jpg",
        ],
        title: "Nutrinana's Activated Granola",
        subtitle: "mixed fruits & coconuts",
        features: ["Gluten Free", "Dairy Free", "No Refined Sugar"],
        price: "£8.50",
        shopLinks: [
            {
                text: "Shop DELLI",
                href: "https://delli.market/products/nutrinanas-special-granola?_pos=1&_sid=1d1806f92&_ss=r",
            },
            {
                text: "Shop Black Farmer",
                href: "https://theblackfarmer.com",
            },
        ],
        externalId: "activated-granola-mfc",
    },
];

export default function HomePage() {
    return (
        <>
            <HeroSlider slides={slides} />

            <main className="space-y-16 px-4 py-10 sm:px-6 lg:px-10">
                <section className="mt-12">
                    <CalloutSection
                        heading="Great Taste Award Winner in 2025"
                        buttonText="About Nutrinana"
                        buttonLink="/about"
                        variant="yellow"
                    />
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold">Activated Granola</h2>
                    <ProductCarousel products={products} />
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold">Leave a Review</h2>
                    <LeaveReviewForm productId="activated-granola-mfc" />
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold">Follow us on Instagram!</h2>
                    <InstagramFeed />
                </section>
            </main>
        </>
    );
}
