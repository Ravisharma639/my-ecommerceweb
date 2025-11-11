import { NextResponse } from "next/server";
import otpStore from "../otpStore";

export async function POST(req) {
  try {
    const { phone, otp } = await req.json();
    if (!phone || !otp)
      return NextResponse.json({ error: "Phone and OTP required" }, { status: 400 });

    const record = otpStore[phone];
    if (!record) return NextResponse.json({ error: "No OTP sent" }, { status: 400 });
    if (record.expires < Date.now()) return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    if (record.otp !== otp) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

    // OTP verified, remove it
    delete otpStore[phone];

    // ✅ Optionally: return a success token for frontend login
    // You can generate a JWT here if needed
    return NextResponse.json({ message: "OTP verified successfully", phone });
  } catch (error) {
    console.error("❌ OTP verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
