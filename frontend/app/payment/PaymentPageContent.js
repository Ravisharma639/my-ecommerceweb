"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { cartTotal } = useCart();

  const [checkoutDetails, setCheckoutDetails] = useState({
    name: "",
    address: "",
    totalAmount: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const details = localStorage.getItem("checkoutDetails");
    if (details) {
      setCheckoutDetails(JSON.parse(details));
    } else {
      router.push("/checkout");
    }
  }, [router]);

  const handlePayment = async () => {
    setError("");
    setProcessing(true);

    try {
      // simulate payment delay
      await new Promise((r) => setTimeout(r, 2000));

      // confirm order in backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/orders/confirm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment failed.");

      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutDetails");

      router.push(`/success?orderId=${orderId}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong during payment.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-gray-100"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
          Payment Details 💳
        </h1>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Full Name:</span>
            <span>{checkoutDetails.name || "—"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Address:</span>
            <span className="text-right w-1/2 break-words">
              {checkoutDetails.address || "—"}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-green-600 font-semibold text-lg">
              ₹{checkoutDetails.totalAmount?.toLocaleString() || cartTotal}
            </span>
          </div>
        </div>

        {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}

        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            disabled={processing}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 shadow-md ${
              processing
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handlePayment}
          >
            {processing ? "Processing Payment..." : "Pay Now 💸"}
          </motion.button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          Secure payments powered by Razorpay / Stripe 🔒
        </p>
      </motion.div>
    </div>
  );
}
