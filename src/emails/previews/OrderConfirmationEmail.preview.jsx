import OrderConfirmationEmail from "../OrderConfirmationEmail";

// Preview with all details
export function WithAllDetails() {
    return (
        <OrderConfirmationEmail
            name="Glen Murray"
            orderReference="NUTR-ABC12345"
            orderDate="12/06/2024, 14:30"
            items={[
                { name: "Activated Granola - Original", quantity: 2, unitPrice: "£8.99" },
                { name: "Activated Granola - Chocolate", quantity: 1, unitPrice: "£8.99" },
            ]}
            subtotal="£26.97"
            shipping="£3.00"
            total="£29.97"
            address="Glen Murray
12 Finsbury Square
London
EC2A 1AS
United Kingdom"
        />
    );
}

// Preview with single item
export function SingleItem() {
    return (
        <OrderConfirmationEmail
            name="Sarah Johnson"
            orderReference="NUTR-XY98ZW76"
            orderDate="15/06/2024, 09:15"
            items={[{ name: "Activated Granola - Original", quantity: 1, unitPrice: "£8.99" }]}
            subtotal="£8.99"
            shipping="£3.00"
            total="£11.99"
            address="Sarah Johnson
                45 Park Avenue
                London
                SW1A 1AA
                GB"
        />
    );
}

// Default export for the preview server
export default WithAllDetails;
