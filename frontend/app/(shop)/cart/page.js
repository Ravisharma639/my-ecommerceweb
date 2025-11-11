"use client";

import React from "react";
import { useCart } from "../../../context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  const router = useRouter();

  if (cartItems.length === 0) {
    return <p className="text-center mt-20 text-lg">Your cart is empty.</p>;
  }

  // Redirect to checkout page
  const handleBuyNow = () => {
    router.push("/checkout"); // navigate to checkout page
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border p-4 rounded shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => increaseQuantity(item._id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                +
              </button>

              <span className="px-2">{item.quantity}</span>

              <button
                onClick={() => decreaseQuantity(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                -
              </button>

              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary & Actions */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <button
          onClick={clearCart}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Clear Cart
        </button>

        <p className="font-bold text-lg">Total: ₹{cartTotal.toLocaleString()}</p>

        <button
          onClick={handleBuyNow}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition font-semibold"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
