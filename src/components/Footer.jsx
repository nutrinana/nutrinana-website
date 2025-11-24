"use client";

import Link from "next/link";
import Image from "next/image";
import { SiInstagram, SiTiktok } from "react-icons/si";

import delliLogo from "/public/icons/delli-logo.svg";
import blackFarmerLogo from "/public/icons/black-farmer-logo.svg";

/**
 * Footer component for the Nutrinana website.
 *
 * Includes navigation links, social media icons, legal links, and address.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
    return (
        <footer className="border-raisin border-t bg-gray-200 py-9 text-gray-800">
            <div className="mx-auto max-w-full px-6 md:px-20">
                <div className="mb-4 flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
                    {/* Quick Links */}
                    <div className="w-full">
                        <h5 className="mb-3 text-4xl font-bold">Quick Links</h5>
                        <h6 className="mb-2 text-lg font-semibold">HELP & INFORMATION</h6>
                        <ul className="space-y-3 text-lg">
                            <li>
                                <Link href="/help" className="hover:underline">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="hover:underline">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Site Map */}
                    <div className="w-full">
                        <ul className="mt-0 space-y-3 text-lg md:mt-2">
                            <li>
                                <Link href="/" className="hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/activated-granola" className="hover:underline">
                                    Activated Granola
                                </Link>
                            </li>
                            <li>
                                <Link href="/reviews" className="hover:underline">
                                    Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="order-last mt-6 flex justify-center space-x-4 md:order-last md:mt-45 md:justify-end lg:mt-28">
                        <div className="flex items-center gap-x-1 sm:gap-x-4">
                            {/* Instagram */}
                            <Link
                                href="https://instagram.com/nutrinanaa"
                                target="_blank"
                                className="social-icon"
                            >
                                <SiInstagram size={24} className="text-raisin" />
                            </Link>
                            {/* TikTok */}
                            <Link
                                href="https://www.tiktok.com/@nutrinanaa"
                                target="_blank"
                                className="social-icon"
                            >
                                <SiTiktok size={24} className="text-raisin" />
                            </Link>
                            {/* DELLI */}
                            <Link
                                href="https://delli.market/collections/nutrinana"
                                target="_blank"
                                className="social-icon"
                            >
                                <Image src={delliLogo} alt="Delli" width={50} height={25} />
                            </Link>
                            {/* The Black Farmer */}
                            <Link
                                href="https://theblackfarmer.com/products/nutrinanaa-special-granola-500g_141594?_pos=1&_psq=nutrina&_ss=e&_v=1.0"
                                target="_blank"
                                className="social-icon"
                            >
                                <Image
                                    src={blackFarmerLogo}
                                    alt="The Black Farmer"
                                    width={100}
                                    height={50}
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="my-6 border-gray-400 md:my-8" />

                {/* Privacy & Terms */}
                <div className="flex flex-col justify-between px-4 text-sm md:flex-row">
                    <span>&copy; {new Date().getFullYear()}, Nutrinana. All rights reserved.</span>
                    <div className="flex space-x-4">
                        <Link href="/legal/privacy-policy" className="underline">
                            Privacy Policy
                        </Link>
                        <Link href="/legal/cookie-policy" className="underline">
                            Cookie Policy
                        </Link>
                        <Link href="/legal" className="underline">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>

                {/* Company Address */}
                <div className="mt-4 flex flex-col justify-center text-center text-sm md:text-center">
                    <p>Nutrinana, </p>
                    <p>Unit 143551, PO Box 7169, Poole, BH15 9EL </p>
                </div>
            </div>
        </footer>
    );
}
