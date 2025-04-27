import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { Toaster } from "sonner";

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
 * @returns {JSX.Element} The page layout with global components and metadata.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {/* Banner Announcement */}
        <Banner />

        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Page Content */}
        <main id="main-content" className="flex-1 mt-4 mb-12">
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