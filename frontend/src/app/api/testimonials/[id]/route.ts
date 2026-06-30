import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: testimonial });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update testimonial";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const testimonial = await Testimonial.findByIdAndUpdate(params.id, { isActive: false }, { new: true });
    if (!testimonial) {
      return NextResponse.json({ success: false, error: "Testimonial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Testimonial removed" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete testimonial" }, { status: 500 });
  }
}
