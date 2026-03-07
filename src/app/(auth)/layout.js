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
        <div className="bg-light-green/30 relative flex min-h-screen items-center justify-center px-4 py-12">
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src="/nutrinana-logo.svg"
                        alt="Nutrinana"
                        width={120}
                        height={48}
                        className="h-12 w-auto"
                    />
                </Link>

                {/* Auth Card */}
                {children}
            </div>
        </div>
    );
}
