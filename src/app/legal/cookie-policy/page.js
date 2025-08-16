// Cookie Policy Page
import CookieBotTable from "@/components/CookieBotTable";
import CookieConsentStatus from "@/components/CookieConsentStatus";

export const metadata = {
    title: "Cookie Policy - Nutrinana",
};

export default function CookiePolicyPage() {
    return (
        <>
            <section className="mb-8">
                <p>Last updated June 28th, 2025</p>
                <br />

                <p>This website uses cookies. We use cookies to make our site work, to remember your preferences, to show embedded content (for example, Instagram posts and customer reviews), and only with your permission to understand how our website is used. We do not set any non-essential cookies unless you give explicit consent.</p>
                <br />

                <p>If you want a full overview of how we handle personal data, please see our Privacy Policy. You can contact us at privacy@nutrinana.co.uk with any questions.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">What are cookies?</h2>
                <p>Cookies are small text files that a website stores on your device. They help websites function, improve security and performance, remember your settings, and (with your permission) measure usage and personalise content.</p>
                <br />
                <p>Cookies can be:</p>
                <ul className="list-disc pl-10">
                    <li><strong>First-party</strong> (set by this site) or <strong>third-party</strong> (set by services we use, such as Instagram or our reviews provider).</li>
                    <li><strong>Session</strong> (deleted when you close your browser) or <strong>persistent</strong> (kept until they expire or you delete them).</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">How we use Cookies</h2>
                <p>
                    We only use <strong>essential</strong> cookies by default. With your consent, we may also use <strong>preferences</strong>, <strong>statistics</strong>, and <strong>marketing</strong> cookies.
                </p>
                <h3 className="text-lg font-bold mt-6 mb-2">1. Necessary cookies (always on)</h3>
                <p>
                    These are required for the site to work securely and correctly (e.g., to remember your cookie choices and load the consent banner). If you block these, parts of the site won&rsquo;t function.
                </p>
                <p>
                    <strong>Examples:</strong> Cookiebot&rsquo;s consent cookie(s), security and performance cookies from our host.
                </p>
                <h3 className="text-lg font-bold mt-6 mb-2">2. Preference cookies (optional)</h3>
                <p>
                    These remember choices you make (such as language or region) to provide a more personalised experience.
                </p>
                <h3 className="text-lg font-bold mt-6 mb-2">3. Statistics cookies (optional)</h3>
                <p>
                    These help us understand how visitors use the site (e.g., page views, time on page) so we can improve it. We only set these if you explicitly allow <strong>Statistics</strong> in the banner. If we are not running analytics, this category will remain unused.
                </p>
                <h3 className="text-lg font-bold mt-6 mb-2">4. Marketing cookies (optional)</h3>
                <p>
                    These enable features and content provided by third parties and may be used to build a profile of your interests (for example, to show embedded Instagram posts). We only set these if you explicitly allow <strong>Marketing</strong> in the banner.
                </p>
                <p><strong>Examples:</strong></p>
                <ul className="list-disc pl-10">
                    <li><strong>Instagram embeds</strong> (Meta) to display our latest posts.</li>
                    <li><strong>Reviews widget</strong> (e.g., Yotpo) to collect and display product reviews.</li>
                </ul>
                <blockquote className="border-l-4 border-gray-300 pl-4 mt-4 text-gray-700">
                    Some third-party cookies are only set when their content actually appears on the page (for example, when you scroll to an embedded Instagram post). If you don&rsquo;t consent to the relevant category, those embeds will be blocked.
                </blockquote>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Managing your consent (Change or withdraw at anytime)</h2>
                <p>You can change your cookie choices whenever you like:</p>
                <ul className="list-disc pl-10">
                    <li>
                        <strong>Click the Cookiebot badge</strong> (small icon) in the <strong>bottom-left corner</strong> of any page to <strong>reopen the banner</strong>.
                        <ul className="list-disc pl-10">
                            <li>Adjust your selections for <strong>Necessary, Preferences, Statistics, Marketing</strong></li>
                            <li><strong>Change your consent</strong> or <strong>Withdraw your consent</strong> entirely</li>
                        </ul>
                    </li>
                    <li>
                        You can also manage cookies through your <strong>browser settings</strong> (e.g., block or delete cookies).
                    </li>
                    <li>
                        You can also obtain your Consent ID and consent date in the section below, or directly from the banner, so you can include them if you email us with any questions or requests related to your cookie choices.
                    </li>
                </ul>
                <br />

                <CookieConsentStatus />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Cookie Declaration</h2>

                <p>
                    A detailed, automatically-updated list of cookies used on this site (by category, provider, purpose, and duration) appears below. If you don&rsquo;t see the table, please make sure you haven&rsquo;t blocked the banner and that you&rsquo;ve allowed the page to load fully.
                </p>
                <br />

                <CookieBotTable />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Updates to this Cookie Policy</h2>

                <p>
                    We may update this policy from time to time to reflect changes to our cookies or legal requirements. When we do, we&rsquo;ll change the &ldquo;Last updated&rdquo; date above. Please check back periodically.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Contact</h2>

                <p>Questions about this Cookie Policy or your choices? </p>
                
                <p> Email privacy@nutrinana.co.uk and, if possible, include your Consent ID and consent date from the banner.</p>
            </section>
            
        </>
    );
}