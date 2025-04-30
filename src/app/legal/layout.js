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
    if (pathname.includes("privacy-policy")) heading = "Privacy Policy";
    else if (pathname.includes("cookie-policy")) heading = "Cookie Policy";

    return (
        <div className="max-w-7xl mx-auto p-10 py-12">
            <h1 className="text-3xl font-bold text-center mb-6">{heading}</h1>
            <div className="flex justify-center gap-12 mb-10 text-md underline text-gray-700">
                <a href="/legal">Website Terms of Use</a>
                <a href="/legal/privacy-policy">Privacy Policy</a>
                <a href="/legal/cookie-policy">Cookie Policy</a>
            </div>
            {children}
        </div>
    );
}