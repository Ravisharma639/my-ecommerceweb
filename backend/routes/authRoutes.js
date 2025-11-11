// backend/routes/otpRoutes.js
import express from "express";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";

const router = express.Router();

// Routes for OTP
router.post("/send", sendOTP);
router.post("/verify", verifyOTP);

export default router;
