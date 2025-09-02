// Home Page
import CalloutSection from "@/components/CalloutSection";
import HeroSlider from "@/components/HeroSlider";
import InstagramFeed from "@/components/InstagramFeed";
import LeaveReviewForm from "@/components/LeaveReviewForm";
import ProductCarousel from "@/components/ProductCarousel";

const slides = [
    {
        image: "/home/slide1.jpg",
        title: "Available Now on DELLI",
        subtitle: "Shop Nutrinana’s Activated Granola today on the DELLI marketplace.",
        buttonText: "Shop Now",
        buttonLink:
            "https://delli.market/products/nutrinanas-special-granola?_pos=1&_psq=nutrin&_ss=e&_v=1.0",
    },
    {
        image: "/home/slide2.jpg",
        title: "Activated Granola, Made with Love",
        subtitle:
            "Handcrafted with wholesome ingredients to nourish your gut and delight your taste buds.",
        buttonText: "Discover More",
        buttonLink: "/activated-granola",
    },
    {
        image: "/home/slide3.jpg",
        title: "It All Began in Nana’s Kitchen",
        subtitle:
            "Nutrinana started as homemade granola for loved ones, now enjoyed by families everywhere.",
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

            <div className="site-container section-y flow">
                <section className="section-y">
                    <CalloutSection
                        heading="Great Taste Award Winner in 2025"
                        buttonText="About Nutrinana"
                        buttonLink="/about"
                        variant="yellow"
                    />
                </section>

                <section className="section-y">
                    <h2 className="font-display h2">activated granola</h2>
                    <ProductCarousel products={products} />
                </section>

                <section className="section-y">
                    <h2 className="h2">Leave a Review</h2>
                    <LeaveReviewForm productId="activated-granola-mfc" />
                </section>

                <section className="section-y">
                    <h2 className="h2">Follow us on Instagram!</h2>
                    <InstagramFeed />
                </section>
            </div>
        </>
    );
}
