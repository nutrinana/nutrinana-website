// Reviews page with Yotpo Reviews Widget
import ClosingCTA from "@/components/ClosingCTA";
import LeaveReviewForm from "@/components/LeaveReviewForm";
import RecentReviewCards from "@/components/RecentReviewCards";
import YotpoSEOClientWrapper from "@/components/YotpoSEOClientWrapper";

export const metadata = {
    title: "Customer Reviews",
    description:
        "Read genuine customer reviews of Nutrinana's Activated Granola and leave your own review. See what our customers love about our healthy granola.",
};

const mainProduct = {
    productId: "activated-granola-mfc",
    name: "Nutrinana's Activated Granola",
    url: "https://www.nutrinana.co.uk/activated-granola",
    imageUrl: "https://www.nutrinana.co.uk/products/mixed-fruits/granola1.jpg",
    price: 8.5,
    currency: "GBP",
    description: "A delicious and nutritious base granola for all flavours.",
};

const closingCTAData = {
    header: "Ready to taste the granola everyone’s raving about?",
    description: "Join our happy customers and try Nutrinana’s Activated Granola for yourself.",
    button: {
        text: "Shop Activated Granola",
        href: "/activated-granola",
        variant: "green",
    },
};

export default function ReviewsPage() {
    return (
        <div className="site-container">
            <section className="section-y">
                <RecentReviewCards />
            </section>

            <section className="section-y">
                <h2 className="h2 mb-6">Leave a Review</h2>
                <LeaveReviewForm productId={mainProduct.productId} />
            </section>

            <section className="section-y:review-child">
                <h2 id="more-reviews" className="h2 mb-6">
                    More Reviews
                </h2>
                <div className="max-w-400">
                    <YotpoSEOClientWrapper />
                </div>
            </section>

            <section className="section-y:last-child">
                <ClosingCTA {...closingCTAData} />
            </section>
        </div>
    );
}
