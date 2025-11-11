// frontend/app/layout.js
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "./providers/Providers";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "My E-Commerce",
  description: "Modern E-commerce app built with Next.js and Razorpay integration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Include Razorpay script globally */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className="bg-gray-50 text-gray-900">
        {/* ✅ Auth & State Context Providers */}
        <AuthProvider>
          <Providers>
            {/* ✅ Global Navbar */}
            <Navbar />

            {/* ✅ Main Content */}
            <main className="pt-16 min-h-screen">{children}</main>

            {/* ✅ Global Footer */}
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
