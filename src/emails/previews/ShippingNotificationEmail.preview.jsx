import ShippingNotificationEmail from "../ShippingNotificationEmail";

// Preview with all details
export function WithAllDetails() {
    return (
        <ShippingNotificationEmail
            name="Sarah Johnson"
            orderReference="NUTR-AB12CD34"
            orderDate="15/02/2026, 14:32"
            carrier="Royal Mail"
            address="Sarah Johnson
                123 High Street
                Apartment 4B
                Manchester
                M1 2AB
                GB"
            items={[
                { name: "Activated Granola - Original", quantity: 2, unitPrice: "£8.99" },
                { name: "Activated Granola - Chocolate", quantity: 1, unitPrice: "£8.99" },
            ]}
            total="£26.97"
            subtotal="£23.97"
            shipping="£3.00"
            aftercareLink="https://aftercare.getpimento.com/nutrinana"
        />
    );
}

// Preview with minimal details
export function MinimalDetails() {
    return (
        <ShippingNotificationEmail
            name="Customer"
            orderReference="NUTR-XY98ZW76"
            orderDate="16/02/2026, 09:15"
            carrier={null}
            address="Customer Name
                45 Park Avenue
                London
                SW1A 1AA
                GB"
            items={[{ name: "Activated Granola - Original", quantity: 1, unitPrice: "£8.99" }]}
            total="£11.99"
            subtotal="£8.99"
            shipping="£3.00"
            aftercareLink="https://aftercare.getpimento.com/nutrinana"
        />
    );
}

// Default export for the preview server
export default WithAllDetails;
