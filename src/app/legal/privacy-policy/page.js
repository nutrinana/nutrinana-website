export const metadata = {
    title: "Privacy Policy - Nutrinana",
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p className="mb-4">
                At Nutrinana, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
            <p className="mb-4">
                We do not collect or store any personal data through this staging version of our website. No information is shared with third parties, and no cookies or tracking mechanisms are in place during this development phase.
            </p>
            <p className="mb-4">
                When the site is fully launched, any data collection will be clearly outlined in an updated Privacy Policy that complies with all relevant data protection laws, including GDPR and CCPA.
            </p>
            <p className="mb-8">
                By using this site, you acknowledge this privacy policy and agree to its terms. If you do not agree, please do not use the site.
            </p>
            <h3 className="text-xl font-semibold mb-2">Data Deletion Request</h3>
            <p>
                Nutrinana does not collect personal data through this application. If you believe any information has been collected and would like it removed, please contact us at{" "}
                <a href="mailto:info@nutrinana.co.uk" className="underline text-blue-600">info@nutrinana.co.uk</a> and we will process your request promptly.
            </p>
        </>
    );
}