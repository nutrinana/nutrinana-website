import Image from "next/image";
import Link from "next/link";

/**
 * The authentication layout for the Nutrinana website.
 * This layout is used for all authentication-related pages (sign-in, sign-up, etc.).
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The page layout for authentication pages.
 */
export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Logo at top */}
            <div className="p-6 md:p-8">
                <Link href="/">
                    <Image
                        src="/nutrinana-logo.svg"
                        alt="Nutrinana"
                        width={140}
                        height={56}
                        className="h-14 w-auto"
                    />
                </Link>
            </div>

            {/* Auth content */}
            <div className="flex flex-1 items-center justify-center px-4 py-8">{children}</div>
        </div>
    );
}
