import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Contact.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Contact deleted" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete contact" }, { status: 500 });
  }
}
