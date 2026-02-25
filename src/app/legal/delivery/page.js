// Delivery & Returns page
export const metadata = {
    title: "Delivery & Returns - Nutrinana",
};

export default function DeliveryPage() {
    return (
        <>
            <section className="mb-8">
                <p className="mb-2 text-sm text-gray-500">
                    <strong>Last updated February 25th, 2026</strong>
                </p>

                <h2 className="mb-4 text-2xl font-semibold">Delivery</h2>

                <p className="mb-4">We aim to process all orders within 1-2 working days.</p>

                <p className="mb-4">
                    Orders are fulfilled by our logistics partner and delivered via a tracked
                    courier service. Standard UK delivery typically takes 2-4 working days from
                    dispatch.
                </p>

                <p className="mb-4">Delivery times are estimates and not guaranteed.</p>

                <p className="mb-4">
                    We currently deliver to addresses within the United Kingdom only and do not
                    offer international shipping at this time.
                </p>

                <p className="mb-4">
                    Once your order has been dispatched, you will receive a confirmation email with
                    tracking details.
                </p>

                <p className="mb-4">
                    Risk in the goods passes to you upon delivery to the address provided at
                    checkout.
                </p>

                <h3 className="mb-4 text-lg font-semibold">Subscription Orders</h3>

                <p className="mb-4">
                    For subscription customers, orders are automatically generated on your renewal
                    date and dispatched according to our normal fulfilment schedule. You will
                    receive tracking information once your order has shipped.
                </p>

                <p className="mb-4">
                    You can manage or cancel your subscription at any time via the customer portal
                    link provided in your confirmation email. To avoid your next renewal, changes
                    must be made before your scheduled renewal date.
                </p>

                <h3 className="mb-4 text-lg font-semibold">Product Availability</h3>

                <p className="mb-4">All products are subject to availability.</p>

                <p className="mb-4">
                    In the unlikely event that an item becomes unavailable after you have placed
                    your order, we will contact you as soon as possible to offer:
                </p>

                <ul className="mb-4 list-disc pl-10">
                    <li>A suitable alternative (if available), or</li>
                    <li>A full refund for the unavailable item.</li>
                </ul>

                <p className="mb-4">
                    If your order contains multiple items, the remaining available products may
                    still be dispatched unless otherwise agreed.
                </p>

                <p className="mb-4">
                    If a subscribed product becomes temporarily unavailable, we may contact you to
                    offer a suitable alternative or delay your shipment.
                </p>

                <h3 className="mb-4 text-lg font-semibold">Non-Delivery / Missed Deliveries</h3>

                <p className="mb-4">
                    If your order has not arrived within 5 working days of dispatch, please contact
                    us so we can investigate with the courier.
                </p>

                <p className="mb-4">
                    If the courier is unable to deliver your parcel, they will typically leave a
                    notification and attempt re-delivery or hold the parcel at a local depot for
                    collection.
                </p>

                <p className="mb-4">
                    We recommend tracking your parcel using the link provided in your dispatch email
                    if it has not arrived within the expected delivery window.
                </p>

                <p className="mb-4">
                    If a parcel is returned to us due to unsuccessful delivery attempts or failure
                    to collect from the courier, we reserve the right to charge an additional
                    delivery fee to resend the order.
                </p>
            </section>

            <hr className="my-6" />

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">Shipping Costs</h2>

                <p className="mb-4">
                    Shipping costs are calculated at checkout and clearly displayed before payment
                    is completed.
                </p>

                <p className="mb-4">
                    Where applicable, prices include VAT in accordance with UK tax regulations.
                </p>

                <p className="mb-4">
                    If shipping charges apply, these will be shown separately before you confirm
                    your order.
                </p>
            </section>

            <hr className="my-6" />

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">Returns</h2>

                <p className="mb-4">
                    Due to the nature of our products (food items), we are unable to accept returns
                    once goods have been delivered, unless the item is faulty, damaged, or
                    incorrect. This does not affect your statutory rights under the Consumer Rights
                    Act 2015.
                </p>
            </section>

            <hr className="my-6" />

            <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold">Damaged or Incorrect Orders</h2>

                <p className="mb-4">
                    If your order arrives damaged or incorrect, you must notify us within 48 hours
                    of delivery at{" "}
                    <a href="mailto:info@nutrinana.co.uk" className="text-blue-600 underline">
                        info@nutrinana.co.uk
                    </a>
                    , including your order reference and photographic evidence where possible.
                </p>

                <p className="mb-4">
                    We will review the issue and offer a replacement or refund where appropriate.
                </p>
            </section>

            <hr className="my-6" />

            <section>
                <h2 className="mb-4 text-2xl font-semibold">Refunds</h2>

                <p>
                    Where a refund is approved, it will be processed within 5-10 working days and
                    returned to your original payment method.
                </p>
            </section>
        </>
    );
}
