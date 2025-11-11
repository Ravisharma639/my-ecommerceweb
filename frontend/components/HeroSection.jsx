"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gray-900 text-white py-20 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to My E-Commerce
          </h1>
          <p className="text-gray-300 mb-6">
            Discover the best deals on the latest products. Shop smart, shop
            better.
          </p>
          <Link
            href="/products"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            🛒 Shop Now
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/png/store.png"
            alt="E-Commerce Hero"
            width={200}
            height={200}
            className="rounded-lg shadow-lg"
          />

        </div>
      </div>
    </section>
  );
}
