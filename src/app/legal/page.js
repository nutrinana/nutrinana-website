// Legal page for the website terms of use
export const metadata = {
    title: "Website Terms of Use - Nutrinana",
};

export default function LegalPage() {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Website Terms of Use</h1>
            <p className="mb-4">
                By accessing or using the Nutrinana website, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please do not use our website.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Use of the Website</h2>
            <p className="mb-4">
                You agree to use this website only for lawful purposes. You must not use our site in any way that breaches any applicable local, national, or international law or regulation.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Intellectual Property Rights</h2>
            <p className="mb-4">
                All content on this website, including text, graphics, logos, images, and software, is the property of Nutrinana and is protected by copyright laws. You may not reproduce, duplicate, copy, sell, or exploit any portion of the site without express written permission.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Changes to the Terms</h2>
            <p className="mb-4">
                Nutrinana reserves the right to modify these terms at any time. Changes will take effect immediately upon posting to the website. It is your responsibility to review these terms regularly to stay informed of updates.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>
                If you have any questions about these terms, please contact us at{" "}
                <a href="mailto:info@nutrinana.co.uk" className="underline text-blue-600">info@nutrinana.co.uk</a>.
            </p>
        </>
    );
}