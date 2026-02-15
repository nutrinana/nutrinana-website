import { Html, Section, Container, Text } from "@react-email/components";

/**
 * OrderConfirmationEmail Component
 *
 * This component generates the order confirmation email sent after
 * a successful checkout.
 *
 * @component
 *
 * @param {object} props
 * @param {string} props.name - Customer name
 * @param {string} props.orderReference - Internal order reference
 * @param {Array} props.items - Array of order items [{ name, quantity, unitPrice }]
 * @param {string} props.total - Formatted total (e.g. £17.00)
 * @param {string} props.subtotal - Formatted subtotal
 * @param {string} props.shipping - Formatted shipping cost
 * @param {string} props.address - Multi-line formatted address string
 *
 * @returns {JSX.Element}
 */
export default function OrderConfirmationEmail({
    name,
    orderReference,
    items = [],
    total,
    subtotal,
    shipping,
    address,
}) {
    return (
        <Html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>{`
          body {
            font-family: 'Trebuchet MS', sans-serif;
          }
        `}</style>
            </head>

            <Section style={main}>
                <Container style={container}>
                    {/* Logo Section */}
                    <div style={logoContainer}>
                        <img
                            src={`https://${process.env.STAGE === "production" ? "" : "staging."}nutrinana.co.uk/nutrinana-logo.svg`}
                            alt="Nutrinana Logo"
                            style={logoStyle}
                        />
                    </div>

                    {/* Greeting */}
                    <Text style={heading}>Hi {name},</Text>
                    <Text style={paragraph}>
                        Thank you for your order! We've received your payment and your order is now
                        being prepared.
                    </Text>

                    {/* Order Reference */}
                    <Text style={paragraph}>Order Reference:</Text>
                    <Text style={detail}>{orderReference}</Text>

                    <br />

                    {/* Items */}
                    <Text style={heading_2}>Your Order</Text>
                    {items.map((item, index) => (
                        <div key={index}>
                            <Text style={detail}>
                                {item.name} x {item.quantity}
                            </Text>
                            {item.unitPrice && <Text style={detailSmall}>{item.unitPrice}</Text>}
                        </div>
                    ))}

                    <br />

                    {/* Totals */}
                    <Text style={paragraph}>Subtotal:</Text>
                    <Text style={detail}>{subtotal}</Text>

                    <Text style={paragraph}>Shipping:</Text>
                    <Text style={detail}>{shipping}</Text>

                    <Text style={heading}>Total:</Text>
                    <Text style={detail}>{total}</Text>

                    <br />

                    {/* Shipping Address */}
                    <Text style={heading_2}>Delivery Address</Text>
                    <Text
                        style={detail}
                        dangerouslySetInnerHTML={{
                            __html: address?.replace(/\n/g, "<br/>"),
                        }}
                    />

                    <br />

                    {/* Closing */}
                    <Text style={paragraph}>
                        We'll send you another email once your order has been dispatched.
                    </Text>

                    <Text style={heading}>Speak soon,</Text>
                    <Text style={paragraph}>The Nutrinana Team</Text>
                </Container>
            </Section>
        </Html>
    );
}

// Styles for email template
const main = {
    backgroundColor: "#F7FDF2",
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "100%",
    maxWidth: "580px",
};

const heading = {
    fontSize: "1.5rem",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#191923",
    fontFamily: "'Verdana', sans-serif",
};

const heading_2 = {
    fontSize: "1.25rem",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#191923",
    marginTop: "16px",
    fontFamily: "'Verdana', sans-serif",
};

const paragraph = {
    fontSize: "1.0rem",
    lineHeight: "1.4",
    color: "#191923",
    fontFamily: "'Verdana', sans-serif",
};

const detail = {
    fontSize: "1.0rem",
    lineHeight: "1.4",
    color: "#191923",
    marginLeft: "20px",
    fontFamily: "'Verdana', sans-serif",
};

const detailSmall = {
    fontSize: "0.9rem",
    lineHeight: "1.4",
    color: "#555",
    marginLeft: "20px",
    fontFamily: "'Verdana', sans-serif",
};

const logoContainer = {
    textAlign: "center",
    marginTop: "20px",
};

const logoStyle = {
    width: "150px",
    height: "auto",
};
