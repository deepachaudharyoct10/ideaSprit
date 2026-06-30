import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import OTP from "@/models/OTP";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    // Remove any existing OTP for this email before creating a new one
    await OTP.deleteMany({ email: email.toLowerCase() });

    // Generate a 6-digit numeric OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.create({ email: email.toLowerCase(), code });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"IdeaSprit" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: `${code} — Your IdeaSprit Verification Code`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0a0a0f;border-radius:16px;border:1px solid #1a1a35;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
            <div style="width:36px;height:36px;background:linear-gradient(135deg,#7c3aed,#06b6d4);border-radius:8px;display:flex;align-items:center;justify-content:center;">
              <span style="color:#fff;font-size:18px;font-weight:bold;">⚡</span>
            </div>
            <span style="font-size:20px;font-weight:800;color:#fff;">Idea<span style="color:#a78bfa;">Sprit</span></span>
          </div>

          <h2 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 8px;">Email Verification</h2>
          <p style="color:#94a3b8;font-size:14px;margin:0 0 28px;line-height:1.6;">
            Use the OTP below to verify your email and submit your project details. Valid for <strong style="color:#a78bfa;">10 minutes</strong>.
          </p>

          <div style="background:#1a1a35;border:1px solid #3730a3;border-radius:12px;padding:28px;text-align:center;margin:0 0 28px;">
            <p style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 12px;">Your OTP</p>
            <span style="font-size:42px;font-weight:800;letter-spacing:14px;color:#ffffff;font-family:monospace;">${code}</span>
          </div>

          <p style="color:#475569;font-size:12px;margin:0;line-height:1.5;">
            If you did not request this, please ignore this email. Do not share this code with anyone.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send OTP";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
