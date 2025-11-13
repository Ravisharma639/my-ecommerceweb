"use client";

import { Suspense } from "react";
import SuccessPageContent from "./SuccessPageContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20 text-lg">Loading...</p>}>
      <SuccessPageContent />
    </Suspense>
  );
}
