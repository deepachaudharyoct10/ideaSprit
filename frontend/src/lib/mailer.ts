import nodemailer from "nodemailer";

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  description: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const { name, email, phone, company, description } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const adminHtml = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #ffffff; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7c3aed, #06b6d4); padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800;">⚡ IdeaSprit</h1>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">New Contact Request</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; width: 140px;">Name</td>
            <td style="padding: 10px 0; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Email</td>
            <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #a78bfa;">${email}</a></td>
          </tr>
          ${phone ? `<tr><td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Phone</td><td style="padding: 10px 0;">${phone}</td></tr>` : ""}
          ${company ? `<tr><td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Company</td><td style="padding: 10px 0;">${company}</td></tr>` : ""}
        </table>
        <div style="margin-top: 24px; padding: 20px; background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 12px;">
          <p style="margin: 0 0 8px; color: #94a3b8; font-size: 13px;">Project Description</p>
          <p style="margin: 0; line-height: 1.6;">${description}</p>
        </div>
      </div>
    </div>
  `;

  const clientHtml = `
    <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #ffffff; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7c3aed, #06b6d4); padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800;">⚡ IdeaSprit</h1>
      </div>
      <div style="padding: 32px; text-align: center;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(34, 197, 94, 0.15); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
          <span style="font-size: 32px;">✓</span>
        </div>
        <h2 style="margin: 0 0 12px; font-size: 22px;">Thanks, ${name}!</h2>
        <p style="color: #94a3b8; line-height: 1.7; margin: 0 0 24px;">
          We've received your message and will review your project shortly.
          Our team will get back to you within <strong style="color: #a78bfa;">24 hours</strong>.
        </p>
        <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #7c3aed, #6d28d9); color: white; border-radius: 12px; text-decoration: none; font-weight: 600;">
          Visit Our Website
        </a>
      </div>
    </div>
  `;

  await Promise.all([
    transporter.sendMail({
      from: `"IdeaSprit Contact" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Request from ${name}${company ? ` (${company})` : ""}`,
      html: adminHtml,
    }),
    transporter.sendMail({
      from: `"IdeaSprit Team" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "We've received your message – IdeaSprit",
      html: clientHtml,
    }),
  ]);
}
