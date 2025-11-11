"use client";

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-center text-lg mb-10">
        We'd love to hear from you! Fill out the form below or reach us via email.
      </p>

      <form className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <div>
          <label className="block text-left font-semibold mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-left font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-left font-semibold mb-2">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
