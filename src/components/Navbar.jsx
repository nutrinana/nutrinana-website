"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Importing ShadCN Button

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Activated Granola", href: "/shop" },
    { name: "Reviews", href: "/reviews" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

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

    return (
        <nav className="bg-white sticky top-0 w-full z-50 py-4 border-b border-gray-300">
            <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                
                {/* Mobile Layout - Hamburger on Left, Logo in Center */}
                <div className="flex items-center md:hidden w-full justify-between">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative z-50 ml-4">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>

                    <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
                        <img src="/NUTRINA_LOGO.png" alt="Nutrinana Logo" className="h-12 mb-2" />
                    </Link>
                </div>

                {/* Desktop Layout - Centered Logo and Navigation */}
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
                                        ? "bg-[#507153] text-white font-bold"
                                        : "text-gray-900 hover:text-[#507153]"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Full Screen Slide In */}
            <div className={`fixed inset-0 bg-white z-50 w-full h-screen flex flex-col border-r border-gray-300 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                {/* Close Button - Top Left */}
                <div className="flex items-center px-4 py-4">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="absolute left-8 mt-11">
                        <X size={24} />
                    </Button>
                    <Link href="/" onClick={() => setIsOpen(false)} className="mx-auto">
                        <img src="/NUTRINA_LOGO.png" alt="Nutrinana Logo" className="h-12 mt-6" />
                    </Link>
                </div>

                {/* Page Navigations (Stacked Left) */}
                <div className="flex flex-col space-y-6 mt-12 w-full">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`block w-full px-8 py-4 text-left text-2xl transition-all ${
                                pathname === link.href
                                    ? "text-[#507153] font-bold"
                                    : "text-gray-900 hover:text-black hover:bg-muted"
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Divider */}
                <hr className="my-8 border-gray-300 mt-auto w-[80%] ml-8" />

                {/* Social Media Icons (Button Style Like Footer) */}
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