import QueryEmail from "../ContactEmail";

// Preview with standard enquiry
export function StandardEnquiry() {
    return (
        <QueryEmail
            name="Sarah Johnson"
            title="Question about subscription delivery"
            comments="Hi there! I was wondering if it's possible to change my delivery frequency from monthly to every 2 months? Also, can I skip the next delivery as I still have plenty left?"
            requestId="REQ-2024-001234"
            dateTime="19/02/2026, 14:32"
        />
    );
}

// Preview with product question
export function ProductQuestion() {
    return (
        <QueryEmail
            name="Michael Chen"
            title="Allergen information"
            comments="Hello, I have a nut allergy and wanted to confirm whether your Activated Granola products contain any tree nuts or are processed in a facility that handles nuts. Could you also let me know about cross-contamination procedures?"
            requestId="REQ-2024-001235"
            dateTime="19/02/2026, 10:15"
        />
    );
}

// Preview with order issue
export function OrderIssue() {
    return (
        <QueryEmail
            name="Emma Wilson"
            title="Issue with recent order"
            comments="I received my order yesterday (NUTR-AB12CD34) but one of the bags was damaged in transit. The granola has spilled inside the box. Can you please send a replacement?"
            requestId="REQ-2024-001236"
            dateTime="19/02/2026, 09:45"
        />
    );
}

// Preview with multi-line detailed question
export function DetailedEnquiry() {
    return (
        <QueryEmail
            name="James Robertson-Smith"
            title="Bulk order enquiry for corporate event"
            comments={`Hi Nutrinana team,
                I'm organising a wellness event for our company (approximately 200 attendees) and I'm interested in ordering your granola as part of our goodie bags.

                Could you please provide information on:
                1. Bulk pricing for 200+ units
                2. Custom packaging options
                3. Lead time for delivery
                4. Any corporate discount programs

                We're looking at mid-March for the event.

                Thanks in advance!`}
            requestId="REQ-2024-001237"
            dateTime="19/02/2026, 11:20"
        />
    );
}

// Preview with short query
export function ShortQuery() {
    return (
        <QueryEmail
            name="Alex"
            title="Shipping to Ireland?"
            comments="Do you ship to Dublin, Ireland?"
            requestId="REQ-2024-001238"
            dateTime="19/02/2026, 16:50"
        />
    );
}

// Preview with partnership enquiry
export function PartnershipEnquiry() {
    return (
        <QueryEmail
            name="Sophie Martinez"
            title="Stockist / Retail Partnership"
            comments="Good afternoon! I'm the owner of a health food store in Brighton and I'm really impressed with your products. I'd love to discuss the possibility of stocking Nutrinana in our shop. Do you work with independent retailers? Looking forward to hearing from you."
            requestId="REQ-2024-001239"
            dateTime="19/02/2026, 13:05"
        />
    );
}

// Default export for the preview server
export default StandardEnquiry;
