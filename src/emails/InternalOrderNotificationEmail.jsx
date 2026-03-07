import { Html, Section, Container, Text, Heading, Hr } from "@react-email/components";

/**
 * InternalOrderNotificationEmail Component
 *
 * Internal notification sent to the Nutrinana team when a new order is placed.
 *
 * @component
 *
 * @param {object} props - The properties for the email.
 * @param {string} props.orderReference - Internal order reference.
 * @param {string} props.orderDate - The order date.
 * @param {string} props.customerName - Customer name.
 * @param {string} props.customerEmail - Customer email.
 * @param {Array} props.items - Array of order items [{ name, quantity, sku }].
 * @param {string} props.total - Formatted total (e.g. £17.00).
 * @param {string} props.purchaseType - 'subscription_renewal', 'monthly', 'one_off', etc.
 * @param {string} [props.subscriptionId] - Stripe subscription ID (if applicable).
 *
 * @returns {JSX.Element} The internal order notification email component.
 */
export default function InternalOrderNotificationEmail({
    orderReference,
    orderDate,
    customerName,
    customerEmail,
    items = [],
    total,
    purchaseType,
    subscriptionId,
}) {
    const isSubscription = purchaseType === "subscription_renewal" || subscriptionId;
    const orderTypeLabel =
        purchaseType === "subscription_renewal" ? "Subscription Renewal" : "One-off Order";

    return (
        <Html>
            <head>
                <style>{`
          body { font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        `}</style>
            </head>

            <Section style={main}>
                <Container style={card}>
                    {/* Header */}
                    <Section style={header}>
                        <Heading style={title}>🎉 New Order Received</Heading>
                        <Text style={orderRef}>Order: {orderReference}</Text>
                    </Section>

                    <Hr style={divider} />

                    {/* Order Info */}
                    <Section>
                        <Heading style={sectionTitle}>Order Details</Heading>

                        <Section style={infoBox}>
                            <Section style={infoRow}>
                                <Text style={infoLabel}>Order Type</Text>
                                <Text style={infoValue}>
                                    {orderTypeLabel}
                                    {isSubscription && " 🔄"}
                                </Text>
                            </Section>

                            <Section style={infoRow}>
                                <Text style={infoLabel}>Customer</Text>
                                <Text style={infoValue}>{customerName}</Text>
                            </Section>

                            <Section style={infoRow}>
                                <Text style={infoLabel}>Email</Text>
                                <Text style={infoValue}>{customerEmail}</Text>
                            </Section>

                            {orderDate && (
                                <Section style={infoRow}>
                                    <Text style={infoLabel}>Order Date</Text>
                                    <Text style={infoValue}>{orderDate}</Text>
                                </Section>
                            )}

                            {subscriptionId && (
                                <Section style={infoRow}>
                                    <Text style={infoLabel}>Subscription ID</Text>
                                    <Text style={infoValueMono}>{subscriptionId}</Text>
                                </Section>
                            )}

                            <Section style={infoRow}>
                                <Text style={infoLabel}>Total</Text>
                                <Text style={infoValueTotal}>{total}</Text>
                            </Section>
                        </Section>
                    </Section>

                    <Hr style={divider} />

                    {/* Items */}
                    <Section>
                        <Heading style={sectionTitle}>Items ({items.length})</Heading>

                        {items.length ? (
                            <Section style={itemsBox}>
                                {items.map((item, idx) => (
                                    <Section
                                        key={`${item?.sku || item?.name || "item"}-${idx}`}
                                        style={itemRow}
                                    >
                                        <Text style={itemName}>
                                            {item.name || "Item"}{" "}
                                            <span style={itemQty}>× {item.quantity || 1}</span>
                                        </Text>
                                        {item.sku && <Text style={itemSku}>SKU: {item.sku}</Text>}
                                    </Section>
                                ))}
                            </Section>
                        ) : (
                            <Text style={muted}>No items</Text>
                        )}
                    </Section>

                    {/* Footer */}
                    <Hr style={divider} />
                    <Section style={footer}>
                        <Text style={footerText}>
                            This is an automated notification from your order system.
                        </Text>
                        <Text style={footerText}>
                            Order Reference: <strong>{orderReference}</strong>
                        </Text>
                    </Section>
                </Container>
            </Section>
        </Html>
    );
}

// Styles
const main = {
    backgroundColor: "#f5f5f7",
    padding: "24px 12px",
    fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const card = {
    margin: "0 auto",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "32px 24px",
    border: "1px solid #e5e5e7",
};

const header = {
    textAlign: "center",
    marginBottom: "8px",
};

const title = {
    fontSize: "24px",
    fontWeight: "700",
    margin: "0 0 12px",
    color: "#1d1d1f",
};

const orderRef = {
    fontSize: "16px",
    margin: "0",
    color: "#6e6e73",
    fontWeight: "600",
};

const sectionTitle = {
    fontSize: "18px",
    fontWeight: "700",
    margin: "0 0 16px",
    color: "#1d1d1f",
};

const infoBox = {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "16px",
    border: "1px solid #e5e5e7",
};

const infoRow = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "12px",
};

const infoLabel = {
    margin: "0",
    fontSize: "14px",
    color: "#6e6e73",
    fontWeight: "500",
};

const infoValue = {
    margin: "0",
    fontSize: "14px",
    color: "#1d1d1f",
    fontWeight: "600",
    textAlign: "right",
};

const infoValueMono = {
    margin: "0",
    fontSize: "13px",
    color: "#1d1d1f",
    fontWeight: "500",
    fontFamily: "monospace",
    textAlign: "right",
};

const infoValueTotal = {
    margin: "0",
    fontSize: "16px",
    color: "#1d1d1f",
    fontWeight: "700",
    textAlign: "right",
};

const itemsBox = {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "12px",
    border: "1px solid #e5e5e7",
};

const itemRow = {
    marginBottom: "12px",
    paddingBottom: "12px",
    borderBottom: "1px solid #e5e5e7",
};

const itemName = {
    margin: "0 0 4px",
    fontSize: "15px",
    color: "#1d1d1f",
    fontWeight: "600",
};

const itemQty = {
    color: "#6e6e73",
    fontWeight: "500",
};

const itemSku = {
    margin: "0",
    fontSize: "13px",
    color: "#6e6e73",
    fontFamily: "monospace",
};

const footer = {
    textAlign: "center",
    marginTop: "8px",
};

const footerText = {
    margin: "0 0 8px",
    fontSize: "12px",
    color: "#86868b",
};

const muted = {
    fontSize: "14px",
    color: "#86868b",
    margin: "0",
};

const divider = {
    margin: "24px 0",
    borderColor: "#e5e5e7",
};
