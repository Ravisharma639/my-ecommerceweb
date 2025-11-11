"use client"; // 🔥 Required for hooks to work in Next.js App Router

import { createContext, useState, useEffect, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

// ✅ AuthProvider wraps your app and manages login/logout state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for saved user when app loads
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
