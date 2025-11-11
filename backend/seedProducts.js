// backend/seedProducts.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const connectDB = require("./config/connectDB");
const { products } = require("@/postcss.config");

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Remove old products
    const created = await Product.insertMany(products);
    console.log(`✅ ${created.length} products seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
