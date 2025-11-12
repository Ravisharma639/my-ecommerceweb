"use client"; // ✅ Required for Next.js App Router components

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

/**
 * 🛒 CartProvider - Wraps the app and manages cart state
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  /**
   * ✅ Load cart from localStorage on first render
   */
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("🧩 Error loading cart from localStorage:", error);
    }
  }, []);

  /**
   * ✅ Save cart to localStorage whenever it changes
   */
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
    } catch (error) {
      console.error("💾 Error saving cart:", error);
    }
  }, [cartItems]);

  /**
   * 🛍️ Add item to cart
   */
  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((p) => p._id === item._id);
      if (existingItem) {
        return prev.map((p) =>
          p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  /**
   * 🔼 Increase quantity
   */
  const increaseQuantity = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  /**
   * 🔽 Decrease quantity (removes item if qty = 0)
   */
  const decreaseQuantity = useCallback((id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  /**
   * ❌ Remove item from cart
   */
  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  }, []);

  /**
   * 🧹 Clear cart
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  }, []);

  /**
   * 🧾 Derived values
   */
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * ✅ Custom hook for accessing cart context
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};
