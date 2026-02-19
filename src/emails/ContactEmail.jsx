import { Html, Section, Container, Text, Heading, Hr, Link, Font } from "@react-email/components";

/**
 * QueryEmail Component
 *
 * This component generates an automated email response for contact form submissions.
 * It includes the user's name, request details, and additional information.
 *
 * @component
 *
 * @param {object} props - The properties for the email.
 * @param {string} props.name - The name of the user.
 * @param {string} props.title - The title of the user's enquiry.
 * @param {string} props.comments - The comments provided by the user.
 * @param {string} props.requestId - The unique ID for the enquiry.
 * @param {string} props.dateTime - The date and time of the enquiry.
 *
 * @returns {JSX.Element} - The rendered email component.
 */
export default function QueryEmail({ name, title, comments, requestId, dateTime }) {
    const safeName = name?.trim() ? name.trim() : "there";

    return (
        <Html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Font
                    fontFamily="Montserrat"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
                <Font
                    fontFamily="Montserrat"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2",
                        format: "woff2",
                    }}
                    fontWeight={700}
                    fontStyle="normal"
                />
                <style>
                    {`
                    body { font-family: Montserrat, Verdana, sans-serif; }
                    a { color: inherit; }
                `}
                </style>
            </head>

            <Section style={main}>
                <Container style={card}>
                    {/* Header */}
                    <Section style={header}>
                        <img
                            src="https://www.nutrinana.co.uk/nutrinana-logo.svg"
                            alt="Nutrinana"
                            style={logo}
                        />

                        <Heading style={title}>Hi {safeName}! 👋</Heading>
                        <Text style={subtitle}>
                            Thank you for your enquiry. This is an automated response from a
                            no-reply email address, but one of our team will aim to get back to you
                            within 1-3 working days.
                        </Text>
                        <Text style={subtitle}>
                            In the meantime, feel free to check out our{" "}
                            <Link href="https://nutrinana.co.uk/help" style={inlineLink}>
                                FAQs
                            </Link>
                            .
                        </Text>
                    </Section>

                    <Hr style={divider} />

                    {/* Your Request */}
                    <Section>
                        <Heading style={sectionTitle}>Your Request</Heading>
                        <Section style={requestBox}>
                            <Text style={requestTitle}>{title}</Text>
                            <Text style={requestComments}>
                                {comments.split("\n").map((line, idx, arr) => (
                                    <span key={idx}>
                                        {line}
                                        {idx < arr.length - 1 && <br />}
                                    </span>
                                ))}
                            </Text>
                        </Section>
                    </Section>

                    <Hr style={divider} />

                    {/* Request Details */}
                    <Section>
                        <Heading style={sectionTitle}>Request Details</Heading>
                        <Section style={detailsBox}>
                            <Section style={detailRow}>
                                <Text style={detailLabel}>Enquiry ID:</Text>
                                <Text style={detailValue}>{requestId}</Text>
                            </Section>
                            <Section style={detailRow}>
                                <Text style={detailLabel}>Submitted:</Text>
                                <Text style={detailValue}>{dateTime}</Text>
                            </Section>
                        </Section>
                    </Section>

                    <Hr style={divider} />

                    {/* Closing */}
                    <Section style={closingSection}>
                        <Text style={closingText}>We'll get back to you as soon as possible!</Text>
                        <Text style={signature}>The Nutrinana Team</Text>
                    </Section>

                    {/* Footer */}
                    <Hr style={divider} />
                    <Section style={footer}>
                        {/* Help Section */}
                        <Text style={footerHelp}>
                            Need immediate help?{" "}
                            <Link href="https://nutrinana.co.uk/help" style={footerLink}>
                                Visit our Help Center
                            </Link>
                        </Text>

                        {/* Social Links with Icons */}
                        <Section style={socialSection}>
                            <Link
                                href="https://instagram.com/nutrinanaa"
                                style={socialLinkWithIcon}
                                target="_blank"
                            >
                                <img
                                    src="https://cdn.simpleicons.org/instagram/507153"
                                    alt="Instagram"
                                    style={socialIcon}
                                />
                            </Link>
                            <Link
                                href="https://www.tiktok.com/@nutrinanaa"
                                style={socialLinkWithIcon}
                                target="_blank"
                            >
                                <img
                                    src="https://cdn.simpleicons.org/tiktok/507153"
                                    alt="TikTok"
                                    style={socialIcon}
                                />
                            </Link>
                        </Section>

                        <Hr style={footerDivider} />

                        {/* Legal Links */}
                        <Text style={legalText}>
                            <Link
                                href="https://nutrinana.co.uk/legal/privacy-policy"
                                style={legalLink}
                            >
                                Privacy Policy
                            </Link>
                            {" | "}
                            <Link href="https://nutrinana.co.uk/legal" style={legalLink}>
                                Terms & Conditions
                            </Link>
                        </Text>

                        {/* Copyright & Address */}
                        <Text style={footerBottom}>
                            &copy; {new Date().getFullYear()} Nutrinana. All rights reserved.
                            <br />
                            Nutrinana, Unit 143551, PO Box 7169, Poole, BH15 9EL
                        </Text>

                        {/* Unsubscribe Notice */}
                        <Text style={unsubscribe}>Please don't reply to this email.</Text>
                    </Section>
                </Container>
            </Section>
        </Html>
    );
}

// Styles for the email template
const main = {
    backgroundColor: "#F7FDF2",
    padding: "36px 12px",
    fontFamily: "Montserrat, Verdana, sans-serif",
};

const card = {
    margin: "0 auto",
    width: "100%",
    maxWidth: "620px",
    padding: "28px 22px",
};

const header = {
    textAlign: "center",
};

const logo = {
    width: "140px",
    height: "auto",
    margin: "0 auto 18px",
    display: "block",
};

const title = {
    fontSize: "22px",
    lineHeight: "1.2",
    margin: "0 0 8px",
    color: "#191923",
    fontWeight: "700",
};

const subtitle = {
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0 0 14px",
    color: "#2E2E36",
};

const inlineLink = {
    color: "#507153",
    textDecoration: "underline",
};

const sectionTitle = {
    fontSize: "16px",
    margin: "0 0 12px",
    color: "#191923",
    fontWeight: "700",
};

const requestBox = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E9EFE6",
    borderRadius: "12px",
    padding: "16px",
};

const requestTitle = {
    fontSize: "15px",
    fontWeight: "600",
    color: "#191923",
    margin: "0 0 8px",
};

const requestComments = {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#2E2E36",
    margin: "0",
};

const detailsBox = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E9EFE6",
    borderRadius: "12px",
    padding: "12px 16px",
};

const detailRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "8px",
};

const detailLabel = {
    margin: "0",
    fontSize: "14px",
    color: "#2E2E36",
};

const detailValue = {
    margin: "0",
    fontSize: "14px",
    color: "#191923",
    fontWeight: "600",
};

const closingSection = {
    textAlign: "center",
};

const closingText = {
    fontSize: "14px",
    color: "#2E2E36",
    margin: "0 0 8px",
};

const signature = {
    fontSize: "14px",
    color: "#507153",
    fontWeight: "600",
    margin: "0",
};

const divider = {
    margin: "18px 0",
    borderColor: "#E9EFE6",
};

const footer = {
    textAlign: "center",
    paddingTop: "8px",
};

const footerHelp = {
    margin: "0 0 16px",
    fontSize: "12px",
    color: "#5A5A67",
    lineHeight: "1.5",
};

const footerLink = {
    color: "#507153",
    textDecoration: "underline",
};

const socialSection = {
    margin: "12px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
};

const socialLinkWithIcon = {
    display: "inline-block",
    margin: "0 6px",
};

const socialIcon = {
    width: "24px",
    height: "24px",
    display: "block",
};

const footerDivider = {
    margin: "16px 0",
    borderColor: "#E9EFE6",
};

const legalText = {
    margin: "0 0 8px",
    fontSize: "12px",
    color: "#8A8A96",
    textAlign: "center",
};

const legalLink = {
    color: "#8A8A96",
    textDecoration: "underline",
};

const footerBottom = {
    margin: "0 0 8px",
    fontSize: "12px",
    color: "#8A8A96",
    lineHeight: "1.5",
};

const unsubscribe = {
    margin: "0",
    fontSize: "11px",
    color: "#8A8A96",
};
