import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const contentPath = join(process.cwd(), 'public', 'content.json');
    const file = await readFile(contentPath, 'utf-8');
    const data = JSON.parse(file);
    const contactEmail = data?.contact?.email;

    if (!contactEmail) {
      return NextResponse.json({ error: 'Contact email is not configured in admin' }, { status: 500 });
    }

    const smtpPass = process.env.SMTP_PASS;

    if (!smtpPass) {
      return NextResponse.json({ error: 'Email password is not configured' }, { status: 500 });
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || contactEmail;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: contactEmail,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
