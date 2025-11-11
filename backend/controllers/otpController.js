import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const serviceSid = process.env.TWILIO_SERVICE_SID;

if (!serviceSid) {
  console.error("❌ TWILIO_SERVICE_SID is missing. Check your .env file!");
}

export const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    res.status(200).json({ success: true, status: verification.status });
  } catch (error) {
    console.error("❌ Error sending OTP:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ success: false, message: "Phone number and OTP are required" });
    }

    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: otp });

    if (verificationCheck.status === "approved") {
      res.status(200).json({ success: true, message: "OTP verified successfully!" });
    } else {
      res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }
  } catch (error) {
    console.error("❌ Error verifying OTP:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
