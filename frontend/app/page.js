"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Categories (icon path: /public/png/)
  const categories = [
    { name: "Mobiles", image: "/png/mobiles.png" },
    { name: "Fashion", image: "/png/fashion.png" },
    { name: "Home", image: "/png/home.png" },
    { name: "Electronics", image: "/png/electronics.png" },
    { name: "Grocery", image: "/png/grocery.png" },
    { name: "Beauty", image: "/png/beauty.png" },
  ];

  // ✅ Top Deals (icon path: /public/png/)
  const topDeals = [
    { name: "Smart Watch", price: "₹2,999", image: "/png/watch.png" },
    { name: "Bluetooth Speaker", price: "₹1,299", image: "/png/speaker.png" },
    { name: "Camera", price: "₹14,499", image: "/png/camera.png" },
    { name: "Laptop", price: "₹49,999", image: "/png/laptop.png" },
    { name: "Headphones", price: "₹2,199", image: "/png/headphones.png" },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 🔝 Category Bar */}
      <section className="bg-white border-b border-gray-200 py-4 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between flex-wrap gap-5 px-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                width={50}
                height={50}
                className="object-contain"
                onError={(e) => (e.target.src = "/png/fallback.png")} // 🧩 fallback image
              />
              <p className="text-xs sm:text-sm mt-1 font-medium text-gray-700">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🦸 Hero Section */}
      <HeroSection />

      {/* 🛍 Featured Products */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center border-b pb-3">
          Featured Products
        </h2>

        {loading && <p className="text-center text-gray-500">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 💥 Top Deals Section
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Top Deals of the Week
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {topDeals.map((deal, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition duration-200"
            >
              <Image
                src={deal.image}
                alt={deal.name}
                width={180}
                height={180}
                className="mx-auto rounded-lg object-contain"
                onError={(e) => (e.target.src = "/png/fallback.png")}
              />
              <h3 className="text-md font-semibold mt-3 text-center text-gray-700">
                {deal.name}
              </h3>
              <p className="text-blue-600 text-center font-bold">{deal.price}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* 🎯 Call-to-Action */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center rounded-2xl mx-6 md:mx-24 my-12 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Your Next Favorite Product Awaits!
        </h2>
        <p className="text-lg mb-6">
          Shop trending items and get exclusive discounts every week.
        </p>
        <a
          href="/products"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Explore Products
        </a>
      </section>
    </main>
  );
}
