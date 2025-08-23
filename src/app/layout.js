import "@/styles/globals.css";
import { Montserrat, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import Banner from "@/components/Banner";
import CookieBotConsent from "@/components/CookieBotConsent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-playfair",
    style: ["normal", "italic"],
    display: "swap",
});

const tanNimbus = localFont({
    src: "../fonts/tan-nimbus.woff2",
    variable: "--font-tan-nimbus",
    display: "swap",
});

const feelingPassionate = localFont({
    src: "../fonts/feeling-passionate.woff2",
    variable: "--font-feeling-passionate",
    display: "swap",
});

/**
 * Metadata for the page layout.
 * This includes the title, description, and Open Graph data for SEO and social sharing.
 * This metadata applies to all pages unless overridden in a nested layout or page.
 */
export const metadata = {
    metadataBase: new URL("https://www.nutrinana.co.uk"),
    title: "Nutrinana's Activated Granola",
    description:
        "Discover Nutrinana’s Activated Granola, made with activated nuts for better digestion. Shop online via DELLI or find us at the Black Farmer Farmshop in London.",
    openGraph: {
        title: "Nutrinana's Activated Granola",
        description:
            "Discover Nutrinana’s Activated Granola, made with activated nuts for better digestion. Shop online via DELLI or find us at the Black Farmer Farmshop in London.",
        url: "https://www.nutrinana.co.uk",
        siteName: "Nutrinana",
        images: [
            {
                url: "/opengraph-image.jpg",
                width: 1200,
                height: 630,
                alt: "Nutrinana's Activated Granola",
            },
        ],
        locale: "en_GB",
        type: "website",
    },
    icons: {
        icon: "/icon1.png",
        shortcut: "/favicon.ico",
        apple: "/apple-icon.png",
        other: [
            {
                rel: "icon",
                url: "/icon.svg",
            },
        ],
    },
    appleWebApp: {
        title: "Nutrinana",
    },
};

/**
 * The root layout for the Nutrinana website.
 * Applies global styles, wraps all pages with the Navbar, Footer, and Banner components.
 * It also includes a Toaster for notifications.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The page layout with global components and metadata.
 */
export default function RootLayout({ children }) {
    const yotpoStoreId = process.env.NEXT_PUBLIC_YOTPO_STORE_ID;

    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${playfairDisplay.variable} ${tanNimbus.variable} ${feelingPassionate.variable}`}
        >
            <head>
                {/* Yotpo Reviews Loader Script */}
                {yotpoStoreId && (
                    <script
                        src={`https://cdn-widgetsrepository.yotpo.com/v1/loader/${yotpoStoreId}`}
                        async
                    ></script>
                )}
            </head>
            <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
                {/* Cookie Banner */}
                <CookieBotConsent />

                {/* Banner Announcement */}
                <Banner />

                {/* Sticky Navbar */}
                <Navbar />

                {/* Main Page Content */}
                <main id="main-content" className="mb-12 flex-1">
                    {children}
                </main>

                {/* Footer */}
                <Footer />

                {/* Toaster for notifications */}
                <Toaster position="bottom-right" richColors />
            </body>
        </html>
    );
}
