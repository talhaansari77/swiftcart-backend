import mongoose from "mongoose";
import { env } from "../config/env";
import { Product } from "../models/product.model";

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description:
      "Apple iPhone 15 Pro with A17 Pro chip, titanium design, and advanced camera system.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200",
    category: "Electronics",
    brand: "Apple",
    stock: 15,
    rating: 4.8,
    numReviews: 124,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Premium Android smartphone with powerful performance, bright display, and pro-grade camera.",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200",
    category: "Electronics",
    brand: "Samsung",
    stock: 12,
    rating: 4.7,
    numReviews: 98,
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Wireless noise-canceling headphones with premium sound quality and long battery life.",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1200",
    category: "Audio",
    brand: "Sony",
    stock: 25,
    rating: 4.9,
    numReviews: 210,
  },
  {
    name: "Apple Watch Series 9",
    description:
      "Smartwatch with fitness tracking, health features, always-on display, and fast performance.",
    price: 429,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1200",
    category: "Wearables",
    brand: "Apple",
    stock: 18,
    rating: 4.6,
    numReviews: 76,
  },
  {
    name: "Nike Air Max Sneakers",
    description:
      "Comfortable everyday sneakers with classic Air Max cushioning and modern streetwear style.",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200",
    category: "Fashion",
    brand: "Nike",
    stock: 30,
    rating: 4.5,
    numReviews: 145,
  },
  {
    name: "Adidas Hoodie",
    description:
      "Soft cotton-blend hoodie with a relaxed fit, perfect for casual wear and layering.",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200",
    category: "Fashion",
    brand: "Adidas",
    stock: 40,
    rating: 4.4,
    numReviews: 62,
  },
  {
    name: "MacBook Air M3",
    description:
      "Lightweight laptop with Apple M3 chip, long battery life, and a stunning Liquid Retina display.",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200",
    category: "Computers",
    brand: "Apple",
    stock: 10,
    rating: 4.9,
    numReviews: 188,
  },
  {
    name: "Logitech MX Master 3S",
    description:
      "Advanced wireless mouse with ergonomic design, quiet clicks, and precise tracking.",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1200",
    category: "Accessories",
    brand: "Logitech",
    stock: 35,
    rating: 4.7,
    numReviews: 133,
  },
];

const seedProducts = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);

    console.log("MongoDB connected for seeding");

    await Product.deleteMany();

    console.log("Old products deleted");

    await Product.insertMany(sampleProducts);

    console.log("Sample products inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("Product seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();