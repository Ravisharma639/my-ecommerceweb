"use client";

import React from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 }); // adds 1 item
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600 mt-1">{product.description}</p>
      <p className="mt-2 font-semibold">₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
