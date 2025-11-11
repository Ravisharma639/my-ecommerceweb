// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.send("✅ Product routes are working properly!");
});

module.exports = router;
