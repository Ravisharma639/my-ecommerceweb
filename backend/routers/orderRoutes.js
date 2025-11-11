import express from "express";
import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// ✅ POST /api/orders - Create new order
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, address, cartItems, totalAmount } = req.body;

    if (!name || !address || !cartItems || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = await Order.create({
      name,
      address,
      cartItems,
      totalAmount,
      status: "pending",
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
    });
  })
);

// ✅ NEW: GET /api/orders/:id - Fetch order by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  })
);

export default router;
