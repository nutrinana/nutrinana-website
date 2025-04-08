import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, title, comments } = body;

    const response = await resend.emails.send({
      from: 'Website Contact Form <onboarding@resend.dev>', // Must be verified on Resend
      to: 'tanaya27@live.co.uk', // Replace with actual admin email
      cc: [email], // CC the user who submitted the form
      subject: `Customer Query: ${title}`,
      reply_to: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Message:</strong><br/>${comments.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
