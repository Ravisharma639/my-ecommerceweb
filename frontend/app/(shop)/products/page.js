"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosInstance"; // updated import
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("/api/products"); // only the endpoint, baseURL is handled by axiosInstance
        setProducts(res.data || []);
      } catch (err) {
        console.error("❌ Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-10 text-gray-600">Loading products...</div>;

  return (
    <main className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 border-b pb-4">
        Our Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
