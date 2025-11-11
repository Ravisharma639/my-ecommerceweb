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

  const handleProceed = (e) => {
    e.preventDefault();

    if (!name || !address) {
      setError("Please fill in all fields.");
      return;
    }

    // Save checkout info to localStorage
    localStorage.setItem(
      "checkoutDetails",
      JSON.stringify({ name, address, cartItems, totalAmount: cartTotal })
    );

    // Redirect to payment page
    router.push("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <p className="text-center mt-20 text-lg">
        Your cart is empty. Please add items to proceed.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Your Details</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

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
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Proceed to Payment
          </button>
        </form>

        <p className="mt-4 text-gray-500 text-center">
          Total Amount: <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
}
