"use client";
import { useState, useEffect } from "react";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiInstagram, SiTiktok } from "react-icons/si";

import { Button } from "@/components/ui/button";

/**
 * Navbar component for Nutrinana website.
 *
 * Handles both mobile and desktop navigation with responsive layout.
 * Includes a slide-in menu on smaller screens and inline navigation on desktop.
 *
 * @component
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
        { name: "Activated Granola", href: "/activated-granola" },
        { name: "Reviews", href: "/reviews" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white py-4">
            {/* Header wrapper */}
            <div className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Mobile layout: Hamburger left, logo center */}
                <div className="flex w-full items-center justify-between md:hidden">
                    <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 transform">
                        <Image
                            src="/nutrinana-logo.svg"
                            alt="Nutrinana Logo"
                            width={120}
                            height={48}
                            className="mb-2 h-12 w-auto"
                        />
                    </Link>
                </div>

                {/* Desktop layout: logo top center, links underneath */}
                <div className="hidden w-full flex-col items-center md:flex">
                    <Link href="/">
                        <Image
                            src="/nutrinana-logo.svg"
                            alt="Nutrinana Logo"
                            width={160}
                            height={64}
                            className="my-0 h-16 w-auto"
                        />
                    </Link>

                    <div className="mt-5 flex space-x-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`rounded-full px-4 py-0 transition-all ${
                                    pathname === link.href
                                        ? "bg-[var(--color-green)] font-bold text-white"
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
            <div
                className={`fixed inset-0 z-50 flex h-screen w-full transform flex-col border-r border-gray-300 bg-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Close button and logo in mobile menu */}
                <div className="flex items-center px-4 py-4">
                    <Button
                        variant="ghost"
                        className="absolute left-5 mt-11"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={24} />
                    </Button>
                    <Link href="/" onClick={() => setIsOpen(false)} className="mx-auto">
                        <Image
                            src="/nutrinana-logo.svg"
                            alt="Nutrinana Logo"
                            width={120}
                            height={48}
                            className="mt-6 h-12 w-auto"
                        />
                    </Link>
                </div>

                {/* Mobile navigation links */}
                <div className="mt-12 flex w-full flex-col space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`block w-full px-8 py-4 text-left text-2xl transition-all ${
                                pathname === link.href
                                    ? "font-bold text-[var(--color-green)]"
                                    : "hover:bg-muted text-gray-900 hover:text-black"
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Divider line */}
                <hr className="my-8 mt-auto ml-8 w-[80%] border-gray-300" />

                {/* Social media buttons in mobile menu */}
                <div className="flex w-full justify-start space-x-4 px-6 pb-6">
                    {/* Instagram */}
                    {/* Link to the Instagram profile */}
                    <Link
                        href="https://instagram.com/nutrinanaa"
                        target="_blank"
                        className="social-icon"
                    >
                        <SiInstagram size={24} />
                    </Link>
                    {/* TikTok */}
                    {/* Link to the TikTok profile */}
                    <Link href="https://tiktok.com/" target="_blank" className="social-icon">
                        <SiTiktok size={24} />
                    </Link>
                    {/* DELLI */}
                    {/* Link to the Delli marketplace */}
                    <Link
                        href="https://delli.market/collections/nutrinana"
                        target="_blank"
                        className="social-icon"
                    >
                        <Image src="/icons/delli-logo.svg" alt="Delli" width={50} height={25} />
                    </Link>
                    {/* The Black Farmer */}
                    {/* Link to The Black Farmer website */}
                    <Link
                        href="https://theblackfarmer.com/"
                        target="_blank"
                        className="social-icon"
                    >
                        <Image
                            src="/icons/black-farmer-logo.svg"
                            alt="The Black Farmer"
                            width={100}
                            height={50}
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
