import { NextResponse } from "next/server";
import otpStore from "../otpStore";

export async function POST(req) {
  const { phone } = await req.json();
  if (!phone) return NextResponse.json({ error: "Phone required" }, { status: 400 });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 minutes

  console.log(`Sending OTP to ${phone}: ${otp}`);
  return NextResponse.json({ message: "OTP sent" });
}
