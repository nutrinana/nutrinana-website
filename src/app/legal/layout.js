export const metadata = {
    title: "Legal - Nutrinana",
};

export default function LegalLayout({ children }) {
    return (
        <div className="max-w-7xl mx-auto py-12">
            <h1 className="text-3xl font-bold text-center mb-6">Terms and Conditions</h1>
            <div className="flex justify-center gap-12 mb-10 text-sm underline text-gray-700">
                <a href="/legal">Website Terms of Use</a>
                <a href="/legal/privacy-policy">Privacy Policy</a>
                <a href="/legal/cookie-policy">Cookie Policy</a>
            </div>
            {children}
        </div>
    );
}