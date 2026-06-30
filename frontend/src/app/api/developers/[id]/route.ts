import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Developer from "@/models/Developer";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const developer = await Developer.findById(params.id);
    if (!developer) {
      return NextResponse.json({ success: false, error: "Developer not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: developer });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch developer" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const developer = await Developer.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!developer) {
      return NextResponse.json({ success: false, error: "Developer not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: developer });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update developer";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const developer = await Developer.findByIdAndUpdate(params.id, { isActive: false }, { new: true });
    if (!developer) {
      return NextResponse.json({ success: false, error: "Developer not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Developer removed" });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to delete developer" }, { status: 500 });
  }
}
