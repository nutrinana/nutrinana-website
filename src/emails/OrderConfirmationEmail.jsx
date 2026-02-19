import { Html, Section, Container, Text, Heading, Hr, Link } from "@react-email/components";

/**
 * OrderConfirmationEmail Component
 *
 * This component generates the order confirmation email sent after
 * a successful checkout.
 *
 * @component
 *
 * @param {object} props - The properties for the email.
 * @param {string} props.name - Customer name.
 * @param {string} props.orderReference - Internal order reference.
 * @param {string} props.orderDate - The order date.
 * @param {Array} props.items - Array of order items [{ name, quantity, unitPrice }].
 * @param {string} props.total - Formatted total (e.g. £17.00).
 * @param {string} props.subtotal - Formatted subtotal.
 * @param {string} props.shipping - Formatted shipping cost.
 * @param {string} props.address - Multi-line formatted address string.
 *
 * @returns {JSX.Element} The order confirmation email component.
 */
export default function OrderConfirmationEmail({
    name,
    orderReference,
    orderDate,
    items = [],
    total,
    subtotal,
    shipping,
    address,
}) {
    const safeName = name?.trim() ? name.trim() : "there";

    return (
        <Html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>{`
          body { font-family: Verdana, sans-serif; }
          a { color: inherit; }
        `}</style>
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

                        <Heading style={title}>Hi {safeName}! 🎉</Heading>
                        <Text style={subtitle}>
                            Thanks for your order! This is your confirmation email. We'll be in
                            touch soon to let you know when your order has been shipped. Below is
                            your order information.
                        </Text>

                        {orderReference ? (
                            <Text style={orderReferenceText}>
                                Order Reference:{" "}
                                <span style={orderReferenceNumber}>{orderReference}</span>
                            </Text>
                        ) : null}

                        {orderDate ? <Text style={muted}>Order date: {orderDate}</Text> : null}
                    </Section>

                    <Hr style={divider} />

                    {/* Summary */}
                    <Section>
                        <Heading style={sectionTitle}>Order summary</Heading>

                        {items.length ? (
                            <Section style={itemsBox}>
                                {items.map((it, idx) => (
                                    <Section
                                        key={`${it?.name || "item"}-${idx}`}
                                        style={{ marginBottom: "10px" }}
                                    >
                                        <Text style={itemLeft}>
                                            <span style={itemName}>
                                                {it.name || "Item"} x {Number(it.quantity || 1)}
                                            </span>
                                            {it.unitPrice && (
                                                <span style={itemPrice}> - {it.unitPrice}</span>
                                            )}
                                        </Text>
                                    </Section>
                                ))}
                            </Section>
                        ) : (
                            <Text style={muted}>Your items will appear here.</Text>
                        )}
                    </Section>

                    {/* Totals */}
                    {(subtotal || shipping || total) && (
                        <>
                            <Hr style={divider} />
                            <Section>
                                <Heading style={sectionTitle}>Totals</Heading>

                                <Section style={totalsBox}>
                                    {subtotal ? (
                                        <Section style={totalsRow}>
                                            <Text style={totalsKey}>Subtotal</Text>
                                            <Text style={totalsVal}>{subtotal}</Text>
                                        </Section>
                                    ) : null}

                                    {shipping ? (
                                        <Section style={totalsRow}>
                                            <Text style={totalsKey}>Shipping</Text>
                                            <Text style={totalsVal}>{shipping}</Text>
                                        </Section>
                                    ) : null}

                                    {total ? (
                                        <>
                                            <Hr style={totalsDivider} />
                                            <Section style={totalsRow}>
                                                <Text style={totalsKeyStrong}>Total</Text>
                                                <Text style={totalsValStrong}>{total}</Text>
                                            </Section>
                                        </>
                                    ) : null}
                                </Section>
                            </Section>
                        </>
                    )}

                    {/* Address */}
                    {address ? (
                        <>
                            <Hr style={divider} />
                            <Section>
                                <Heading style={sectionTitle}>Delivery address</Heading>
                                <Text style={addressText}>
                                    {address.split("\n").map((line, idx, arr) => (
                                        <span key={idx}>
                                            {line}
                                            {idx < arr.length - 1 && <br />}
                                        </span>
                                    ))}
                                </Text>
                            </Section>
                        </>
                    ) : null}

                    {/* Aftercare CTA */}
                    <Hr style={divider} />
                    <Section style={ctaWrap}>
                        <Link href="https://aftercare.getpimento.com/nutrinana" style={button}>
                            Manage Your Order
                        </Link>
                        <Text style={ctaHelp}>
                            Use this to update your address or manage your order.
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Hr style={divider} />
                    <Section style={footer}>
                        {/* Help Section */}
                        <Text style={footerHelp}>
                            Questions?{" "}
                            <Link href="https://nutrinana.co.uk/help" style={footerLink}>
                                Visit our Help Center
                            </Link>{" "}
                            or email{" "}
                            <Link href="mailto:info@nutrinana.co.uk" style={footerLink}>
                                info@nutrinana.co.uk
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

                        {/* Legal Links - Side by Side */}
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

                        {/* Copyright & Address - Side by Side */}
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

const orderReferenceText = {
    margin: "12px 0 0",
    fontSize: "14px",
    color: "#191923",
};

const orderReferenceNumber = {
    fontWeight: "700",
    color: "#2D4F34",
};

const sectionTitle = {
    fontSize: "16px",
    margin: "0 0 12px",
    color: "#191923",
    fontWeight: "700",
};

const itemsBox = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E9EFE6",
    borderRadius: "12px",
    padding: "12px 12px",
};

const itemLeft = {
    margin: "0",
    fontSize: "14px",
    lineHeight: "1.35",
    color: "#191923",
};

const itemName = {
    fontWeight: "600",
};

const itemPrice = {
    color: "#5A5A67",
    fontWeight: "400",
};

const totalsBox = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E9EFE6",
    borderRadius: "12px",
    padding: "12px 12px",
};

const totalsRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "8px",
};

const totalsKey = {
    margin: "0",
    fontSize: "14px",
    color: "#2E2E36",
};

const totalsVal = {
    margin: "0",
    fontSize: "14px",
    color: "#191923",
    fontWeight: "600",
};

const totalsKeyStrong = {
    margin: "0",
    fontSize: "15px",
    color: "#191923",
    fontWeight: "800",
};

const totalsValStrong = {
    margin: "0",
    fontSize: "15px",
    color: "#191923",
    fontWeight: "800",
};

const totalsDivider = {
    margin: "10px 0",
    borderColor: "#E9EFE6",
};

const addressText = {
    margin: "0",
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#2E2E36",
};

const ctaWrap = {
    textAlign: "center",
    paddingTop: "6px",
};

const button = {
    display: "inline-block",
    backgroundColor: "#507153",
    color: "#ffffff",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "700",
};

const ctaHelp = {
    margin: "10px 0 0",
    fontSize: "12px",
    lineHeight: "1.4",
    color: "#5A5A67",
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

const footerText = {
    margin: "0 0 6px",
    fontSize: "12px",
    color: "#5A5A67",
};

const footerTiny = {
    margin: "0",
    fontSize: "11px",
    color: "#8A8A96",
};

const muted = {
    fontSize: "13px",
    color: "#5A5A67",
    margin: "0",
};

const divider = {
    margin: "18px 0",
    borderColor: "#E9EFE6",
};
