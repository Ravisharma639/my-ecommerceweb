"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: "",
    address: "",
    cartItems: [],
    totalAmount: 0,
  });

  // Load checkout details from localStorage
  useEffect(() => {
    const data = localStorage.getItem("checkoutDetails");
    if (data) {
      setCheckoutDetails(JSON.parse(data));
    } else {
      // No data found, redirect back to cart or checkout
      router.push("/checkout");
    }
  }, [router]);

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (typeof window.Razorpay !== "undefined") return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Create order on backend
    const orderData = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: checkoutDetails.totalAmount * 100 }),
    }).then((res) => res.json());

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "My E-Commerce",
      description: "Purchase",
      order_id: orderData.id,
      handler: async function (response) {
        try {
          // Save order to database
          await fetch("/api/save-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...checkoutDetails,
              paymentId: response.razorpay_payment_id,
            }),
          });

          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          localStorage.removeItem("checkoutDetails");
          router.push("/order-success");
        } catch (err) {
          alert("Payment succeeded but failed to save order: " + err.message);
        }
      },
      prefill: { name: checkoutDetails.name },
      theme: { color: "#4f46e5" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>

        <p><strong>Full Name:</strong> {checkoutDetails.name}</p>
        <p><strong>Address:</strong> {checkoutDetails.address}</p>
        <p><strong>Total Amount:</strong> ₹{checkoutDetails.totalAmount?.toLocaleString()}</p>

        <div className="mt-4 flex flex-col gap-2">
          {checkoutDetails.cartItems.map((item) => (
            <p key={item._id}>
              {item.name} x {item.quantity} - ₹{item.price * item.quantity}
            </p>
          ))}
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          Pay ₹{checkoutDetails.totalAmount?.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
