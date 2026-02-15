import OrderConfirmationEmail from "../OrderConfirmationEmail";

export default function Preview() {
    return (
        <OrderConfirmationEmail
            name="Glen Murray"
            orderReference="NUTR-ABC12345"
            orderDate="12/06/2024, 14:30"
            items={[{ name: "Activated Granola - Mixed Fruits", quantity: 2, unitPrice: "£8.50" }]}
            subtotal="£17.00"
            shipping="£3.50"
            total="£20.50"
            address={`12 Finsbury Square
                London
                EC2A 1AS
                United Kingdom`}
        />
    );
}
