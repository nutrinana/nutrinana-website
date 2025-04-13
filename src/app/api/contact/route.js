import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import QueryEmail from '@/emails/ContactEmail';
import { render } from "@react-email/render";
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, title, comments } = body;

    // Generate a unique ID for the request
    const requestId = uuidv4().split('-')[0]; // first segment of the uuid

    const html = await render(
      QueryEmail({
        name,
        title,
        comments,
        requestId,
        dateTime: new Date().toLocaleString(),
      })
    );
    // console.log('Rendered HTML:', html);

    const response = await resend.emails.send({
      from: 'Nutrinana Help <help@nutrinana.co.uk>', // Must be verified on Resend
      to: email, // requestor's email
      bcc: 'nana@nutrinana.co.uk', // CC the admin so we can reply
      reply_to: `${email}, nana@nutrinana.co.uk`, // Replies will go to both the requestor and the admin

      // from: 'Website Contact Form <onboarding@resend.dev>', // Must be verified on Resend
      // to: email, // requestor's email
      // bcc: 'tanaya27@live.co.uk', // CC the admin so we can reply
      // reply_to: email, // reply to the requestor (?)

      subject: `Customer Enquiry ${requestId}: ${title}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error.response?.data || error.message || error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
