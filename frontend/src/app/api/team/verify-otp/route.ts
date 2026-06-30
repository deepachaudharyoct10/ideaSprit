import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import OTP from "@/models/OTP";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json({ success: false, error: "Email and OTP required" }, { status: 400 });
    }

    await connectDB();
    const otpDoc = await OTP.findOne({ email: email.toLowerCase() });

    if (!otpDoc || otpDoc.code !== otp) {
      return NextResponse.json({ success: false, error: "Invalid or expired OTP. Please request a new one." }, { status: 400 });
    }

    await OTP.deleteOne({ _id: otpDoc._id });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
