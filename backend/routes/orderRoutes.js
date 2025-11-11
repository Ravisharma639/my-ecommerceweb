import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Public (add JWT auth later if needed)
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, address, cartItems, totalAmount } = req.body;

    // 🧩 Validate all required fields
    if (!name || !address || !cartItems?.length || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🧠 Create a new order in MongoDB
    const order = await Order.create({
      name,
      address,
      cartItems,
      totalAmount,
      status: "pending",
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "✅ Order created successfully",
      orderId: order._id,
    });
  })
);

/**
 * @route   POST /api/orders/confirm
 * @desc    Confirm payment for an order (mock version)
 * @access  Public
 */
router.post(
  "/confirm",
  asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = "confirmed";
    await order.save();

    console.log(`✅ Payment confirmed for order ID: ${orderId}`);
    res.status(200).json({
      message: "Payment confirmed successfully",
      orderId: order._id,
      status: order.status,
    });
  })
);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order details by ID
 * @access  Public
 */
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
