import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { status } = await req.json();
    if (!["new", "in_progress", "done"].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
    }

    const contact = await Contact.findByIdAndUpdate(params.id, { status }, { new: true });
    if (!contact) {
      return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: contact });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update status" }, { status: 500 });
  }
}
