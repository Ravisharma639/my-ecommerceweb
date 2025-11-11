export async function POST(req) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return new Response(JSON.stringify({ message: "Phone and OTP required" }), { status: 400 });
    }

    // Demo OTP verification (use real logic later)
    if (otp === "123456") {
      return new Response(JSON.stringify({ success: true, token: "mock-jwt-token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Invalid OTP" }), { status: 400 });
  } catch (error) {
    console.error("❌ Error in verify-otp route:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
