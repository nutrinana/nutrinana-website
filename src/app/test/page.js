import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Timeline from "@/components/Timeline";
import ProductCarousel from "@/components/ProductCarousel";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import GlobalAccordion from "@/components/GlobalAccordion";
import NutritionTable from "@/components/NutritionTable";
import InstagramFeed from "@/components/InstagramFeed";

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
            <ProductCarousel products={products} />
            <br></br>
            <br></br>
            <br></br>
            <GlobalAccordion items={accordionData} />
            <br></br>
            <br></br>
            <br></br>
            <Timeline timelineData={timelineData} />  
            <br /><br /><br />
            <h2 className="text-2xl font-bold mb-4">Instagram Feed</h2>
            <InstagramFeed />
            <br /><br /><br />
            
            {/* Embedded Instagram Post: */}
            <blockquote 
                className="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink="https://www.instagram.com/p/DH0pat-o2hW/?utm_source=ig_embed&amp;utm_campaign=loading" 
                data-instgrm-version="14" 
                style={{ background: "#FFF", border: 0, borderRadius: "3px", boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)", margin: "1px", maxWidth: "540px", minWidth: "326px", padding: 0, width: "calc(100% - 2px)" }}
            >
                <div style={{ padding: "16px" }}>
                    <a 
                    href="https://www.instagram.com/p/DH0pat-o2hW/?utm_source=ig_embed&amp;utm_campaign=loading" 
                    style={{ background: "#FFFFFF", lineHeight: 0, padding: 0, textAlign: "center", textDecoration: "none", width: "100%" }} 
                    target="_blank"
                    >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", flexGrow: 0, height: "40px", marginRight: "14px", width: "40px" }}/>
                        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                        <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", height: "14px", marginBottom: "6px", width: "100px" }}/>
                        <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", height: "14px", width: "60px" }}/>
                        </div>
                    </div>

                    <div style={{ padding: "19% 0" }}/>

                    <div style={{ display: "block", height: "50px", margin: "0 auto 12px", width: "50px" }}>
                        <svg width="50px" height="50px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd">
                                <g transform="translate(-511, -20)" fill="#000">
                                <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101"/>
                                </g>
                            </g>
                        </svg>
                    </div>

                    <div style={{ paddingTop: "8px" }}>
                        <div style={{ color: "#3897f0", fontFamily: "Arial, sans-serif", fontSize: "14px", fontWeight: 550, lineHeight: "18px" }}>
                        View this post on Instagram
                        </div>
                    </div>

                    <div style={{ padding: "12.5% 0" }}/>

                    <div style={{ display: "flex", flexDirection: "row", marginBottom: "14px", alignItems: "center" }}>
                        <div>
                            <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", height: "12.5px", width: "12.5px", transform: "translateX(0px) translateY(7px)" }}/>
                            <div style={{ backgroundColor: "#F4F4F4", height: "12.5px", transform: "rotate(-45deg) translateX(3px) translateY(1px)", width: "12.5px", flexGrow: 0, marginRight: "14px", marginLeft: "2px" }}/>
                            <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", height: "12.5px", width: "12.5px", transform: "translateX(9px) translateY(-18px)" }}/>
                        </div>
                        <div style={{ marginLeft: "8px" }}>
                            <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", height: "20px", width: "20px" }}/>
                            <div style={{ width: 0, height: 0, borderTop: "2px solid transparent", borderLeft: "6px solid #f4f4f4", borderBottom: "2px solid transparent", transform: "translateX(16px) translateY(-4px) rotate(30deg)" }}/>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                            <div style={{ width: 0, borderTop: "8px solid #F4F4F4", borderRight: "8px solid transparent", transform: "translateY(16px)" }}></div>
                            <div style={{ backgroundColor: "#F4F4F4", height: "12px", width: "16px", transform: "translateY(-4px)" }}/>
                            <div style={{ width: 0, height: 0, borderTop: "8px solid #F4F4F4", borderLeft: "8px solid transparent", transform: "translateY(-4px) translateX(8px)" }}/>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center", marginBottom: "24px" }}>
                        <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", height: "14px", marginBottom: "6px", width: "224px" }}/>
                        <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", height: "14px", width: "144px" }}/>
                    </div>
                    </a>

                    <p style={{ color: "#c9c8cd", fontFamily: "Arial, sans-serif", fontSize: "14px", lineHeight: "17px", margin: "8px 0 0", textAlign: "center" }}>
                    <a 
                        href="https://www.instagram.com/p/DH0pat-o2hW/?utm_source=ig_embed&amp;utm_campaign=loading" 
                        style={{ color: "#c9c8cd", fontFamily: "Arial, sans-serif", fontSize: "14px", lineHeight: "17px", textDecoration: "none" }} 
                        target="_blank"
                    >
                        A post shared by Nana (@nutrinanaa)
                    </a>
                    </p>
                </div>
            </blockquote>

            <script async src="//www.instagram.com/embed.js"></script>
        </main>
        <Footer />
    </div>
  );
}