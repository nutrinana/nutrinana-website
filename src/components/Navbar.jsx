"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Navbar component for Nutrinana website.
 * Handles both mobile and desktop navigation with responsive layout.
 * Includes a slide-in menu on smaller screens and inline navigation on desktop.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // State to track mobile menu open/closed
    const pathname = usePathname(); // Hook to get the current path

    // Close the mobile menu if screen is resized above mobile breakpoint
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Navigation link definitions
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Activated Granola", href: "/shop" },
        { name: "Reviews", href: "/reviews" },
    ];

    return (
        <nav className="bg-white sticky top-0 w-full z-50 py-4 border-b border-gray-300">
            {/* Header wrapper */}
            <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">

                {/* Mobile layout: Hamburger left, logo center */}
                <div className="flex items-center md:hidden w-full justify-between">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative z-50 ml-4">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>

                    <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
                        <img src="/NUTRINA_LOGO.png" alt="Nutrinana Logo" className="h-12 mb-2" />
                    </Link>
                </div>

                {/* Desktop layout: logo top center, links underneath */}
                <div className="hidden md:flex flex-col items-center w-full">
                    <Link href="/">
                        <img src="/NUTRINA_LOGO.png" alt="Nutrinana Logo" className="h-16 my-0" />
                    </Link>

                    <div className="flex space-x-12 mt-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-4 py-0 rounded-full transition-all ${
                                    pathname === link.href
                                        ? "bg-[var(--color-green)] text-white font-bold"
                                        : "text-gray-900 hover:text-[var(--color-green)]"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile menu overlay with slide-in effect */}
            <div className={`fixed inset-0 bg-white z-50 w-full h-screen flex flex-col border-r border-gray-300 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                {/* Close button and logo in mobile menu */}
                <div className="flex items-center px-4 py-4">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="absolute left-8 mt-11">
                        <X size={24} />
                    </Button>
                    <Link href="/" onClick={() => setIsOpen(false)} className="mx-auto">
                        <img src="/NUTRINA_LOGO.png" alt="Nutrinana Logo" className="h-12 mt-6" />
                    </Link>
                </div>

                {/* Mobile navigation links */}
                <div className="flex flex-col space-y-6 mt-12 w-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`block w-full px-8 py-4 text-left text-2xl transition-all ${
                                pathname === link.href
                                    ? "text-[var(--color-green)] font-bold"
                                    : "text-gray-900 hover:text-black hover:bg-muted"
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Divider line */}
                <hr className="my-8 border-gray-300 mt-auto w-[80%] ml-8" />

                {/* Social media buttons in mobile menu */}
                <div className="flex justify-start space-x-4 px-6 pb-6 w-full">
                    <Button variant="ghost" size="icon" className="w-12 h-12" asChild>
                        <Link href="https://instagram.com/nutrinanaa" target="_blank">
                            <img src="/icons/instagram-logo.svg" alt="Instagram" className="h-6" />
                        </Link>
                    </Button>

                    <Button variant="ghost" size="icon" className="w-12 h-12" asChild>
                        <Link href="https://tiktok.com/" target="_blank">
                            <img src="/icons/tiktok-logo.svg" alt="TikTok" className="h-6" />
                        </Link>
                    </Button>

                    <Button variant="ghost" className="w-20 h-12 flex justify-center items-center" asChild>
                        <Link href="https://delli.market/collections/nutrinana">
                            <img src="/icons/delli-logo.svg" alt="Delli" className="h-6" />
                        </Link>
                    </Button>

                    <Button variant="ghost" className="w-30 h-12 flex justify-center items-center" asChild>
                        <Link href="https://theblackfarmer.com/">
                            <img src="/icons/black-farmer-logo.svg" alt="Black Farmer" className="h-6" />
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}