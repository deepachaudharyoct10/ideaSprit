import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, phone, company, description } = await req.json();

    if (!name || !email || !description) {
      return NextResponse.json(
        { success: false, error: "Name, email, and project description are required." },
        { status: 400 }
      );
    }

    const contact = new Contact({ name, email, phone, company, description });
    await contact.save();

    sendContactEmail({ name, email, phone, company, description }).catch((err) => {
      console.error("Email send failed (non-fatal):", err);
    });

    return NextResponse.json(
      { success: true, message: "Your message has been received! We'll get back to you within 24 hours." },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit contact form";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 });
  }
}
