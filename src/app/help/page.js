// Help Centre page: FAQ and contact form for Nutrinana website
import GlobalAccordion from "@/components/GlobalAccordion";
import { ContactForm } from "@/components/ContactForm";

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
        </a>
        {" "}to place an order. We also offer our products at{" "}
        <a
          href="https://theblackfarmer.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
            The Black Farmer Farmshop 
        </a>
        {" "}in Brixton and White City if you prefer to shop in person. Add your favourite granola to your basket, proceed to checkout, and choose your preferred payment method. Once your order is placed, we’ll take care of the rest!
      </>
    ),
  },
  {
    title: "Allergens",
    subtitle: "Is Nutrinana's Activated Granola suitable for people with allergies?",
    content: "Our granola is made with a variety of nuts and seeds, so it may not be suitable for those with nut or seed allergies. We take great care to avoid cross-contamination, but we recommend that anyone with severe allergies consult the ingredient list carefully and reach out to us with any concerns. Your health and safety are our top priority!",
  },
  {
    title: 'What Does "Activated" Mean?',
    subtitle: 'What does it mean when we say our granola is "Activated"?',
    content: '"Activated" means that the nuts and seeds in our granola have gone through a special soaking process. This process enhances their natural flavours, makes them easier to digest, and helps your body absorb more of their nutrients. It\'s part of what makes Nutrinana\'s granola so unique and delicious!',
  },
  {
    title: "Storage and Date",
    subtitle: "How should I store my Nutrinana's Activated Granola, and how long will it last?",
    content: "To keep your granola fresh and crunchy, store it in an airtight container in a cool, dry place. Our granola has a shelf life of 6-12 months if stored properly—but let's be honest, it'll probably last less than that because it's just that tasty! You'll find the best-before date printed on the package, so you can enjoy every bite at its peak. Remember to reseal the packaging after each use to maintain its freshness!",
  },
];

export default function HelpPage() {
  return (
    <main className="max-w-6xl mx-auto py-6 px-4 mt-4">
      {/* TODO: Check if we need a title, try "Help Centre or "Help & Information" (like the footer) */}  
      {/* <h1 className="text-4xl font-extrabold mb-8 text-center">Help Centre</h1> */}
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <GlobalAccordion items={accordionData} />
      <section className="mt-15">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <ContactForm />
      </section>
    </main>
  );
}
