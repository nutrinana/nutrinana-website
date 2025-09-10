// Help Centre page: FAQ and contact form for Nutrinana website
import { ContactForm } from "@/components/ContactForm";
import GlobalAccordion from "@/components/GlobalAccordion";

export const metadata = {
    title: "Help Centre",
    description:
        "Find answers to frequently asked questions about Nutrinana's products, ordering, allergens, and storage. Contact us for additional support.",
};

const accordionData = [
    {
        title: "How to Buy",
        content: (
            <>
                Buying our delicious, healthy granola is easy! Simply visit our online store on{" "}
                <a
                    href="https://delli.market/products/nutrinanas-special-granola?_pos=1&_psq=nutrinana&_ss=e&_v=1.0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    DELLI
                </a>{" "}
                to place an order. We also offer our products at{" "}
                <a
                    href="https://theblackfarmer.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    The Black Farmer Farmshop
                </a>{" "}
                in Brixton and White City if you prefer to shop in person. Add your favourite
                granola to your basket, proceed to checkout, and choose your preferred payment
                method. Once your order is placed, we’ll take care of the rest!
            </>
        ),
    },
    {
        title: "Allergens",
        subtitle: "Is Nutrinana’s Activated Granola suitable for people with allergies?",
        content:
            "Our granola is made with a variety of nuts and seeds, so it may not be suitable for those with nut or seed allergies. We take great care to avoid cross-contamination, but we recommend that anyone with severe allergies consult the ingredient list carefully and reach out to us with any concerns. Your health and safety are our top priority!",
    },
    {
        title: "What Does ‟Activated” Mean?",
        subtitle: "What does it mean when we say our granola is ‟Activated”?",
        content:
            "‟Activated” means that the nuts and seeds in our granola are soaked and gently dried as part of a traditional preparation method. This process is often used to mirror the natural sprouting conditions of seeds and is valued for its thoughtful approach to ingredient preparation. At Nutrinana, it’s one of the ways we give extra care to what goes into every batch, contributing to the unique texture and flavour of our granola.",
    },
    {
        title: "Storage and Date",
        subtitle: "How should I store my Nutrinana’s Activated Granola, and how long will it last?",
        content:
            "To keep your granola fresh and crunchy, store it in an airtight container in a cool, dry place. Our granola has a shelf life of 6-12 months if stored properly—but let’s be honest, it’ll probably last less than that because it’s just that tasty! You’ll find the best-before date printed on the package, so you can enjoy every bite at its peak. Remember to reseal the packaging after each use to maintain its freshness!",
    },
];

export default function HelpPage() {
    return (
        <div className="site-container">
            {/* Page Header */}
            <section className="section-y">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-6 text-center text-3xl">Help Centre</h1>
                    <p className="mt-2 text-center text-lg text-gray-700">
                        Need a hand? You&apos;ll find answers to common questions here, or reach out
                        to us directly — we&apos;re always happy to help!
                    </p>
                </div>
            </section>

            {/* FAQs */}
            <section className="section-y">
                <div className="mx-auto max-w-4xl">
                    <h2 className="h2 text-2xl font-semibold">Frequently Asked Questions</h2>
                    <GlobalAccordion items={accordionData} />
                </div>
            </section>

            {/* Divider */}
            <hr className="mx-auto my-6 max-w-4xl" />

            {/* Contact Form */}
            <section className="section-y">
                <div className="mx-auto max-w-4xl">
                    <h2 className="h2 text-2xl font-semibold">Contact Us</h2>
                    <ContactForm />
                </div>
            </section>
        </div>
    );
}
