import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

/**
 * The main layout for the Nutrinana website.
 * This layout is used for all the main pages of the website (home, products, about, etc.).
 * Wraps all main pages with the Banner, Navbar, and Footer components.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The page layout with the Banner, Navbar, and Footer components.
 */
export default function MainLayout({ children }) {
    return (
        <>
            {/* Banner Announcement */}
            <Banner />

            {/* Sticky Navbar */}
            <Navbar />

            {/* Main Page Content */}
            <main id="main-content" className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}
