"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProceed = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !address.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          address,
          cartItems,
          totalAmount: cartTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to save order.");

      // ✅ Save checkout details for Payment Page
      localStorage.setItem(
        "checkoutDetails",
        JSON.stringify({ name, address, totalAmount: cartTotal })
      );

      router.push(`/payment?orderId=${data.orderId}`);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <p className="text-center mt-20 text-lg">
        Your cart is empty. Please add items to proceed.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Checkout Summary 🛍️
        </h2>

        {/* 🧾 Cart Items Preview */}
        <div className="max-h-60 overflow-y-auto border rounded-lg p-3 mb-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-md"
                />
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-bold text-gray-900">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* 💵 Total Amount */}
        <p className="text-lg font-semibold text-center mb-6">
          Total Amount:{" "}
          <span className="text-indigo-600">
            ₹{cartTotal.toLocaleString()}
          </span>
        </p>

        {/* 👤 Checkout Form */}
        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        <form onSubmit={handleProceed} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading
              ? "Saving your order..."
              : `Proceed to Payment (₹${cartTotal.toLocaleString()})`}
          </button>
        </form>
      </div>
    </div>
  );
}
