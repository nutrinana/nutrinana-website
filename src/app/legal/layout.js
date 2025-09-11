"use client";

import { usePathname } from "next/navigation";

/**
 * This component serves as a layout for the legal pages of the Nutrinana website.
 * It includes a dynamic title and navigation links to the different legal pages.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The layout for the legal pages.
 */
export default function LegalLayout({ children }) {
    const pathname = usePathname();

    let heading = "Terms and Conditions"; // Default
    if (pathname.includes("privacy-policy")) {
        heading = "Privacy Policy";
    } else if (pathname.includes("cookie-policy")) {
        heading = "Cookie Policy";
    }

    return (
        <div className="mx-auto max-w-7xl p-10 py-12">
            <h1 className="mb-6 text-center text-3xl">{heading}</h1>
            <div className="text-md mb-10 flex justify-center gap-12 text-center text-gray-700 underline">
                <a href="/legal" className="hover:text-raisin transition-colors">
                    Website Terms of Use
                </a>
                <a href="/legal/privacy-policy" className="hover:text-raisin transition-colors">
                    Privacy Policy
                </a>
                <a href="/legal/cookie-policy" className="hover:text-raisin transition-colors">
                    Cookie Policy
                </a>
            </div>
            {children}
        </div>
    );
}
