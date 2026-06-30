import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Developer from "@/models/Developer";

export async function GET() {
  try {
    await connectDB();
    const developers = await Developer.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: developers });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch developers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const developer = new Developer(body);
    await developer.save();
    return NextResponse.json({ success: true, data: developer }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create developer";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
