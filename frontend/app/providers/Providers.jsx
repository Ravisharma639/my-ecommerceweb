"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "../../context/CartContext";

/**
 * A small client-only wrapper that composes all client providers.
 * Place any other client-only providers (theme, zustand, etc.) here.
 */
export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
}
