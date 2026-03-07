import { Html, Section, Container, Text, Heading, Hr, Link, Font } from "@react-email/components";

/**
 * OrderConfirmationEmail Component
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.orderReference
 * @param {string} props.orderDate
 * @param {Array}  props.items
 * @param {string} props.total
 * @param {string} props.subtotal
 * @param {string} props.shipping
 * @param {string} props.address
 * @param {string} [props.subscriptionId]
 * @param {string} [props.purchaseType]
 * @param {string} [props.renewalDate]     - ISO date string of next renewal
 * @param {string} [props.renewalFrequency] - e.g. "monthly", "every 2 months"
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
    subscriptionId,
    purchaseType,
    renewalDate,
    renewalFrequency,
}) {
    const safeName = name?.trim() ? name.trim() : "there";

    const isSubscription = !!subscriptionId;
    const isRenewal = purchaseType === "subscription_renewal";

    const formattedRenewalDate = renewalDate
        ? new Date(renewalDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : null;

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

                        <Heading style={title}>
                            {isRenewal
                                ? `Your subscription has renewed, ${safeName}! 🔄`
                                : `Hi ${safeName}! 🎉`}
                        </Heading>

                        <Text style={subtitle}>
                            {isRenewal
                                ? `Thanks for staying with us! Your ${renewalFrequency ? renewalFrequency + " " : ""}subscription has renewed and we're getting your next order ready. We'll email you as soon as it's on its way. Here's a quick reminder of what's included below.`
                                : isSubscription
                                  ? "Your subscription is confirmed! Your first order is being prepared and we'll be in touch when it's shipped."
                                  : "Thanks for your order! This is your confirmation email. We'll be in touch soon to let you know when your order has been shipped. Below is your order information."}
                        </Text>

                        {orderReference ? (
                            <Text style={orderReferenceText}>
                                Order Reference:{" "}
                                <span style={orderReferenceNumber}>{orderReference}</span>
                            </Text>
                        ) : null}

                        {orderDate ? <Text style={muted}>Order date: {orderDate}</Text> : null}
                    </Section>

                    {/* Subscription info box */}
                    {isSubscription && (
                        <>
                            <Hr style={divider} />
                            <Section>
                                <Heading style={sectionTitle}>Your subscription</Heading>
                                <Section style={subscriptionBox}>
                                    {renewalFrequency && (
                                        <Section style={subscriptionRow}>
                                            <Text style={subscriptionKey}>Frequency</Text>
                                            <Text style={subscriptionVal}>
                                                Renews {renewalFrequency}
                                            </Text>
                                        </Section>
                                    )}
                                    {formattedRenewalDate && (
                                        <Section style={subscriptionRow}>
                                            <Text style={subscriptionKey}>
                                                {isRenewal ? "Next renewal" : "First renewal"}
                                            </Text>
                                            <Text style={subscriptionVal}>
                                                {formattedRenewalDate}
                                            </Text>
                                        </Section>
                                    )}
                                    <Section style={subscriptionRow}>
                                        <Text style={subscriptionKey}>What happens next</Text>
                                        <Text style={subscriptionVal}>
                                            {renewalFrequency
                                                ? `A new order will be created ${renewalFrequency} and scheduled for dispatch. We'll send tracking details once it leaves the warehouse.`
                                                : "A new order will be created on your renewal date and scheduled for dispatch. We'll send tracking details once it leaves the warehouse."}
                                        </Text>
                                    </Section>
                                </Section>
                            </Section>
                        </>
                    )}

                    <Hr style={divider} />

                    {/* Order summary */}
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

                    {/* Manage Order CTA */}
                    <Hr style={divider} />
                    <Section style={ctaWrap}>
                        <Link href="https://aftercare.getpimento.com/nutrinana" style={button}>
                            Manage Your Order
                        </Link>
                        <Text style={ctaHelp}>
                            Use this to update your address or manage your order.
                        </Text>
                    </Section>

                    {/* Manage Subscription CTA */}
                    {subscriptionId && (
                        <>
                            <Hr style={divider} />
                            <Section style={ctaWrap}>
                                <Link
                                    href="https://billing.stripe.com/p/login/8x23cvbfRcZd2O01TCgIo00"
                                    style={buttonSecondary}
                                >
                                    Manage Subscription
                                </Link>
                                <Text style={ctaHelp}>
                                    Update payment method, pause, or cancel your subscription.
                                </Text>
                            </Section>
                        </>
                    )}

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

const subscriptionBox = {
    backgroundColor: "#EFF7EC",
    border: "1px solid #C8DFC2",
    borderRadius: "12px",
    padding: "12px 14px",
};

const subscriptionRow = {
    marginBottom: "10px",
};

const subscriptionKey = {
    margin: "0 0 2px",
    fontSize: "11px",
    fontWeight: "700",
    color: "#507153",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
};

const subscriptionVal = {
    margin: "0",
    fontSize: "14px",
    color: "#191923",
    lineHeight: "1.4",
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

const buttonSecondary = {
    display: "inline-block",
    backgroundColor: "#e5bd68",
    color: "#FFFFFF",
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

const muted = {
    fontSize: "13px",
    color: "#5A5A67",
    margin: "0",
};

const divider = {
    margin: "18px 0",
    borderColor: "#E9EFE6",
};
