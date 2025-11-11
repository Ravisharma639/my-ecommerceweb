"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/png/e-logo.png" alt="Logo" className="h-10 w-auto mr-2" />
          <span className="text-2xl font-extrabold text-blue-400 hover:text-blue-300 transition">
            My E-Commerce
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {["/", "/products", "/contact"].map((href, idx) => (
            <Link key={idx} href={href} className="hover:text-blue-400 transition">
              {href === "/" ? "Home" : href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
            </Link>
          ))}

          {/* Cart */}
          <Link href="/cart" className="relative bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {session ? (
            <div className="flex items-center space-x-3">
              <img src={session.user.image} alt={session.user.name} className="h-8 w-8 rounded-full border-2 border-green-400" />
              <span className="font-semibold">{session.user.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition font-semibold text-center"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white focus:outline-none">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-gray-800 text-white px-6 py-4 space-y-3">
          {["/", "/products", "/contact"].map((href, idx) => (
            <Link
              key={idx}
              href={href}
              className="block hover:text-blue-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {href === "/" ? "Home" : href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
            </Link>
          ))}

          {/* Mobile Cart */}
          <Link
            href="/cart"
            className="relative block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-center"
            onClick={() => setIsOpen(false)}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Auth */}
          {session ? (
            <div className="flex flex-col items-center space-y-3">
              <img src={session.user.image} alt={session.user.name} className="h-10 w-10 rounded-full border-2 border-green-400" />
              <span className="font-semibold">{session.user.name}</span>
              <button onClick={() => signOut({ callbackUrl: "/login" })} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition font-semibold w-full">
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition font-semibold w-full text-center block"
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
