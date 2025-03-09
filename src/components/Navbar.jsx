"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
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

    return (
        <nav className="bg-white shadow-md sticky top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/">
                        <img src="/NUTRINA_LOGO.png" alt="Nutrinana Logo" className="h-12" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`${
                                pathname === link.href
                                    ? "bg-green-200 text-green-900 px-3 py-2 rounded-lg"
                                    : "text-gray-900 hover:text-green-600"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button (Using ShadCN Button) */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col space-y-4 p-4">
                        {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-900 hover:text-green-600"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}