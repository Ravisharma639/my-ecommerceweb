const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// ✅ Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ✅ Step 1: Send OTP
const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // ✅ Optional: store OTP temporarily in DB or cache
    // For simplicity, store it in memory (not for production)
    global.otpStore = global.otpStore || {};
    global.otpStore[phone] = otp;

    console.log(`📲 OTP ${otp} sent to ${phone}`);

    // ✅ Example using Fast2SMS API (Indian numbers)
    // Replace "YOUR_FAST2SMS_API_KEY" with your actual key
    // Uncomment below to actually send SMS:

    /*
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "v3",
        sender_id: "TXTIND",
        message: `Your OTP is ${otp}`,
        language: "english",
        flash: 0,
        numbers: phone,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
        },
      }
    );
    */

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Error sending OTP:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Step 2: Verify OTP & Login/Register
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required" });
    }

    // Check OTP match
    if (!global.otpStore || global.otpStore[phone] != otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ name: "New User", phone });
    }

    // Remove OTP after verification
    delete global.otpStore[phone];

    // Respond with JWT
    res.status(200).json({
      _id: user.id,
      name: user.name,
      phone: user.phone,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { sendOtp, verifyOtp };
