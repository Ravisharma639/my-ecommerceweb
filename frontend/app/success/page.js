"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-gray-100"
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <span className="text-6xl">🎉</span>
        </motion.div>

        <h1 className="text-3xl font-extrabold text-green-600 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-700 text-lg mb-2">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Order ID: <span className="font-mono text-gray-700">{orderId}</span>
        </p>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
        >
          Continue Shopping 🛍️
        </motion.a>

        <p className="text-xs text-gray-400 mt-6">
          A confirmation email will be sent to your registered address.
        </p>
      </motion.div>
    </div>
  );
}
