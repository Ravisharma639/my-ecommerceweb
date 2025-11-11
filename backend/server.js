import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/connectDB.js";

// ✅ Import all routes
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ E-Commerce Backend is running...");
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Express Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// ✅ Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Server listen
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📁 Current file: ${__filename}`);
  console.log(`📂 Current directory: ${__dirname}\n`);
});
