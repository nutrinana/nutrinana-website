// Home Page
import CalloutSection from "@/components/CalloutSection";
import HeroSlider from "@/components/HeroSlider";
import InstagramFeed from "@/components/InstagramFeed";
import LeaveReviewForm from "@/components/LeaveReviewForm";
import ProductCarousel from "@/components/ProductCarousel";
import RotatingCard from "@/components/RotatingCard";
import TipCard from "@/components/TipCard";
import TopFiveReviews from "@/components/TopFiveReviews";

export const metadata = {
    title: "Nutrinana's Activated Granola",
    description:
        "Discover Nutrinana's Activated Granola, made with traditionally activated nuts and seeds. Shop online via DELLI or find us at the Black Farmer Farmshop in London.",
};

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
    {
        image: "/home/slide4.jpg",
        title: "Activate Your Christmas",
        subtitle:
            "Celebrate the season with a wholesome crunch — crafted with love for festive mornings.",
        buttonText: "Explore",
        buttonLink: "/activated-granola",
        objectPosition: "left 30%",
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
                href: "https://theblackfarmer.com/products/nutrinanaa-special-granola-500g_141594?_pos=1&_psq=nutrina&_ss=e&_v=1.0",
            },
        ],
        externalId: "activated-granola",
    },
];

export default function HomePage() {
    return (
        <>
            <HeroSlider slides={slides} />

            <div className="site-container section-y flow">
                <section className="section-y">
                    <CalloutSection
                        heading="Started in Nana’s kitchen, Nutrinana brings handcrafted, activated granola made with love and honest ingredients to breakfast tables everywhere."
                        buttonText="About Nutrinana"
                        buttonLink="/about"
                        variant="yellow"
                    />
                </section>

                <section className="section-y">
                    <h2 className="font-display h2 text-green">activated granola</h2>

                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
                        <div className="lg:col-span-2">
                            <ProductCarousel products={products} />
                        </div>

                        <div className="flex flex-col gap-6">
                            <RotatingCard />
                            <TipCard />
                        </div>
                    </div>
                </section>

                <section className="section-y">
                    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
                        <div className="lg:col-span-1">
                            <TopFiveReviews />
                        </div>
                        <div className="lg:col-span-2">
                            <h2 className="h2">Leave a Review</h2>
                            <LeaveReviewForm productId="activated-granola" />
                        </div>
                    </div>
                </section>

                <section className="section-y:last-child">
                    <h2 className="h2">Follow us on Instagram!</h2>
                    <InstagramFeed />
                </section>
            </div>
        </>
    );
}
