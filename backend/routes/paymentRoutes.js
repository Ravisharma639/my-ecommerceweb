import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const router = express.Router();

// ✅ Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @route   POST /api/payment/order
 * @desc    Create a Razorpay order
 * @access  Public
 */
router.post("/order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("❌ Razorpay Order Error:", err);
    res.status(500).json({ error: "Unable to create Razorpay order" });
  }
});

/**
 * @route   POST /api/payment/verify
 * @desc    Verify payment signature
 * @access  Public
 */
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      console.log("✅ Payment verified successfully!");
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid signature, verification failed" });
    }
  } catch (err) {
    console.error("❌ Payment verification failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
