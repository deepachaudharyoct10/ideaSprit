import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const filter: Record<string, unknown> = { isActive: true };
    if (category && category !== "All") filter.category = category;
    if (featured === "true") filter.featured = true;

    const projects = await Project.find(filter).sort({ featured: -1, order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const project = new Project(body);
    await project.save();
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create project";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
