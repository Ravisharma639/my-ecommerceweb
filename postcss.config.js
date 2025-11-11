module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
// New products data
const products = [
  {
  name: "Wireless Keyboard",
  description: "Compact Bluetooth keyboard with long battery life",
  price: 1299,
  image: "/wireless-keyboartrd.jpg", // Assumes image is in frontend/public/wireless-keyboard.jpg
  category: "Electronics",
  stock: 20,
},
{
  name: "Smart Watch",
  description: "Tracks fitness and notifications",
  price: 2999,
  image: "/smartwatch.jpg", // Assumes image is in frontend/public/smartwatch.jpg
  category: "Wearables",
  stock: 15,
},
  {
    name: "Noise Cancelling Headphones",
    description: "Immersive sound with deep bass",
    price: 4999,
    image: "/headphones.jpg",
    category: "Audio",
    stock: 10,
  },
  {
    name: "Portable Power Bank",
    description: "10000mAh fast-charging power bank for all devices",
    price: 1999,
    image: "/powerbank.jpg",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Gaming Mouse",
    description: "Ergonomic RGB gaming mouse with 6 programmable buttons",
    price: 1599,
    image: "/gamingmouse.jpg",
    category: "Accessories",
    stock: 18,
  },
  {
    name: "Fitness Tracker Band",
    description: "Monitors heart rate, steps, and sleep with app sync",
    price: 2499,
    image: "/fitnesstracker.jpg",
    category: "Wearables",
    stock: 30,
  },
  {
    name: "Laptop",
    description: "Apple MacBook Air Laptop: Apple M1 chip, 13.3-inch/33.74 cm",
    price: 96990,
    image: "/laptop.jpg",
    category: "Accessories",
    stock: 22,
  },
  {
    name: "Bluetooth Earbuds",
    description: "Compact wireless earbuds with noise isolation and mic",
    price: 2799,
    image: "/earbuds.jpg",
    category: "Audio",
    stock: 28,
  },
];
exports.products = products;
