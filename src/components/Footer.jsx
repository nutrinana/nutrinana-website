import Link from "next/link";
import { Button } from "@/components/ui/button"; // Importing ShadCN Button
import Image from "next/image";
import instagramLogo from "/public/icons/instagram-logo.svg";
import tiktokLogo from "/public/icons/tiktok-logo.svg";
import delliLogo from "/public/icons/delli-logo.svg";
import blackFarmerLogo from "/public/icons/black-farmer-logo.svg";

export default function Footer() {
    return (
        <footer className="bg-gray-200 text-gray-800 mt-10 py-9">
            <div className="max-w-full mx-auto px-6 md:px-20">

                <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6 mb-4">

                    {/* Quick Links */}
                    <div className="w-full">
                        <h4 className="text-4xl font-bold mb-3">Quick Links</h4>
                        <h5 className="text-lg font-semibold mb-2">HELP & INFORMATION</h5>
                        <ul className="space-y-3 text-lg">
                            <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
                            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Site Map */}
                    <div className="w-full">
                        <ul className="space-y-3 text-lg mt-0 md:mt-2">
                            <li><Link href="/" className="hover:underline">Home</Link></li>
                            <li><Link href="/about" className="hover:underline">About Us</Link></li>
                            <li><Link href="/shop" className="hover:underline">Activated Granola</Link></li>
                            <li><Link href="/reviews" className="hover:underline">Reviews</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="order-last flex justify-center md:order-last md:justify-end mt-6 md:mt-28 space-x-4">
                        <div className="flex items-center gap-x-4">
                            {/* Instagram */}
                            <Button variant="ghost" size="icon" className="w-12 h-12 flex justify-center items-center" asChild>
                                <Link href="https://instagram.com/nutrinanaa" target="_blank">
                                    <Image src={instagramLogo} alt="Instagram" width={24} height={24} />
                                </Link>
                            </Button>

                            {/* Tiktok */}
                            <Button variant="ghost" size="icon" className="w-12 h-12 flex justify-center items-center" asChild>
                                <Link href="https://tiktok.com/" target="_blank">
                                    <Image src={tiktokLogo} alt="TikTok" width={24} height={24} />
                                </Link>
                            </Button>

                            {/* DELLI */}
                            <Button variant="ghost" className="w-20 h-12 flex justify-center items-center" asChild>
                                <Link href="https://delli.market">
                                    <Image src={delliLogo} alt="Delli" width={70} height={35} />
                                </Link>
                            </Button>

                            {/* Black Farmer */}
                            <Button variant="ghost" className="w-30 h-12 flex justify-center items-center" asChild>
                                <Link href="https://theblackfarmer.com/">
                                    <Image src={blackFarmerLogo} alt="The Black Farmer" width={180} height={90} />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="my-6 md:my-8 border-gray-400" />

                {/* Privacy & Terms */}
                <div className="flex flex-col md:flex-row justify-between text-sm px-4">
                    <span>&copy; {new Date().getFullYear()}, Nutrinana</span>
                    <div className="flex space-x-4">
                        <Link href="/privacy" className="underline">Privacy & Cookie Policy</Link>
                        <Link href="/terms" className="underline">Terms & Conditions</Link>
                    </div>
                </div>

                {/* Address */}
                <div className="text-center md:text-center text-sm mt-4 flex flex-col justify-center">
                    <p>Nutrinana, </p>
                    <p>Unit 143551, PO Box 7169, Poole, BH15 9EL </p>
                </div>
            </div>
        </footer>
    );
}