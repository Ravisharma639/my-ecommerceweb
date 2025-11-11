// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.send("✅ Auth routes are working properly!");
});

module.exports = router;
