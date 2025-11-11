import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// GET one product by ID
router.get("/:id", getProductById);

// POST create new product
router.post("/", createProduct);

// PUT update product
router.put("/:id", updateProduct);

// DELETE remove product
router.delete("/:id", deleteProduct);

export default router;
