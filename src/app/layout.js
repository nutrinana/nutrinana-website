import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import { Toaster } from "sonner";

export const metadata = {
  title: "Nutrinana's Activated Granola",
  description: "Discover Nutrinana’s Activated Granola, made with activated nuts for better digestion. Shop online via DELLI or find us at the Black Farmer Market in Brixton. A perfect start to your day!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Banner Announcement */}
        <Banner />

        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Page Content */}
        <main className="mt-24">{children}</main>

        {/* Footer */}
        <Footer />

        {/* Toaster for notifications */}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
