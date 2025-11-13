"use client";

import { Suspense } from "react";
import PaymentPageContent from "./PaymentPageContent";

export default function PaymentPage() {
  // ✅ Fix for Vercel / Next.js 15
  return (
    <Suspense fallback={<p className="text-center mt-20 text-lg">Loading Payment Details...</p>}>
      <PaymentPageContent />
    </Suspense>
  );
}
