import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";

import QueryEmail from "@/emails/ContactEmail";
import { formatDate } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Resend API route handler.
 *
 * Handles the POST request for the contact form.
 *
 * @route POST /api/contact
 *
 * @param {Request} req - The request object.
 *
 * @returns {NextResponse} The response object.
 */
export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, title, comments } = body;

        // Generate a unique ID for the request
        const requestId = uuidv4().split("-")[0]; // first segment of the uuid

        const html = await render(
            QueryEmail({
                name,
                title,
                comments,
                requestId,
                dateTime: `${formatDate(new Date().toISOString(), "dd/mm/yyyy")}, ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`,
            })
        );

        const response = await resend.emails.send({
            from: "Nutrinana Help <noreply@nutrinana.co.uk>", // Must be verified on Resend
            to: email, // requestor's email
            bcc: "nana@nutrinana.co.uk", // CC the admin so we can reply
            replyTo: email, // reply to the requestor

            subject: `Customer Enquiry ${requestId}: ${title}`,
            html,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email send error:", error.response?.data || error.message || error);

        return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }
}
