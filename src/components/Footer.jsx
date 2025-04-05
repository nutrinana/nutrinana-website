import Link from "next/link";
import { Button } from "@/components/ui/button"; // Importing ShadCN Button
import Image from "next/image";
import instagramLogo from "/public/icons/instagram-logo.svg";
import tiktokLogo from "/public/icons/tiktok-logo.svg";
import delliLogo from "/public/icons/delli-logo.svg";
import blackFarmerLogo from "/public/icons/black-farmer-logo.svg";

/**
 * Footer component for the Nutrinana website.
 * Includes navigation links, social media icons, legal links, and address.
 * 
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
    return (
        <footer className="bg-gray-200 text-gray-800 mt-10 py-9 border-t border-black">
            <div className="max-w-full mx-auto px-6 md:px-20">

                <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 mb-4">

                    {/* Quick Links */}
                    {/* Section for quick access to help and information */}
                    <div className="w-full">
                        <h4 className="text-4xl font-bold mb-3">Quick Links</h4>
                        <h5 className="text-lg font-semibold mb-2">HELP & INFORMATION</h5>
                        <ul className="space-y-3 text-lg">
                            <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
                            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Site Map */}
                    {/* Section for navigation to main pages of the site */}
                    <div className="w-full">
                        <ul className="space-y-3 text-lg mt-0 md:mt-2">
                            <li><Link href="/" className="hover:underline">Home</Link></li>
                            <li><Link href="/about" className="hover:underline">About Us</Link></li>
                            <li><Link href="/shop" className="hover:underline">Activated Granola</Link></li>
                            <li><Link href="/reviews" className="hover:underline">Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    {/* Section for social media links */}
                    <div className="order-last flex justify-center md:order-last md:justify-end mt-6 md:mt-28 space-x-4">
                        <div className="flex items-center gap-x-4">
                            {/* Instagram */}
                            {/* Link to the Instagram profile */}
                            <Link href="https://instagram.com/nutrinanaa" target="_blank" className="social-button">
                                <Image src={instagramLogo} alt="Instagram" width={24} height={24} />
                            </Link>
                            {/* TikTok */}
                            {/* Link to the TikTok profile */}
                            <Link href="https://tiktok.com/" target="_blank" className="social-button">
                                <Image src={tiktokLogo} alt="TikTok" width={24} height={24} />
                            </Link>
                            {/* DELLI */}
                            {/* Link to the Delli marketplace */}
                            <Link href="https://delli.market/collections/nutrinana" target="_blank" className="social-button">
                                <Image src={delliLogo} alt="Delli" width={50} height={25} />
                            </Link>
                            {/* The Black Farmer */}
                            {/* Link to The Black Farmer website */}
                            <Link href="https://theblackfarmer.com/" target="_blank" className="social-button">
                                <Image src={blackFarmerLogo} alt="The Black Farmer" width={100} height={50} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                {/* Visual separator between sections */}
                <hr className="my-6 md:my-8 border-gray-400" />

                {/* Privacy & Terms */}
                {/* Links to legal information and policies */}
                <div className="flex flex-col md:flex-row justify-between text-sm px-4">
                    <span>&copy; {new Date().getFullYear()}, Nutrinana. All rights reserved.</span>
                    <div className="flex space-x-4">
                        <Link href="/privacy" className="underline">Privacy & Cookie Policy</Link>
                        <Link href="/terms" className="underline">Terms & Conditions</Link>
                    </div>
                </div>

                {/* Company Address */}
                {/* Displaying the company's physical address */}
                <div className="text-center md:text-center text-sm mt-4 flex flex-col justify-center">
                    <p>Nutrinana, </p>
                    <p>Unit 143551, PO Box 7169, Poole, BH15 9EL </p>
                </div>
            </div>
        </footer>
    );
}