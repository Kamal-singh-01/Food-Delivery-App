import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fetch from "node-fetch";
import Food from "./models/Food.js";
import connectDB from "./config/db.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Your food data with local image paths
const foodData = [
  {
    name: "Greek salad",
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    localImage: "food_1.png",
  },
  {
    name: "Veg salad",
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    localImage: "food_2.png",
  },
  {
    name: "Clover Salad",
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    localImage: "food_3.png",
  },
  {
    name: "Chicken Salad",
    price: 24,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Salad",
    localImage: "food_4.png",
  },
  {
    name: "Lasagna Rolls",
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    localImage: "food_5.png",
  },
  {
    name: "Peri Peri Rolls",
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    localImage: "food_6.png",
  },
  {
    name: "Chicken Rolls",
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    localImage: "food_7.png",
  },
  {
    name: "Veg Rolls",
    price: 15,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Rolls",
    localImage: "food_8.png",
  },
  {
    name: "Ripple Ice Cream",
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    localImage: "food_9.png",
  },
  {
    name: "Fruit Ice Cream",
    price: 22,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    localImage: "food_10.png",
  },
  {
    name: "Jar Ice Cream",
    price: 10,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    localImage: "food_11.png",
  },
  {
    name: "Vanilla Ice Cream",
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Deserts",
    localImage: "food_12.png",
  },
  {
    name: "Chicken Sandwich",
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    localImage: "food_13.png",
  },
  {
    name: "Vegan Sandwich",
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    localImage: "food_14.png",
  },
  {
    name: "Grilled Sandwich",
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    localImage: "food_15.png",
  },
  {
    name: "Bread Sandwich",
    price: 24,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Sandwich",
    localImage: "food_16.png",
  },
  {
    name: "Cup Cake",
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    localImage: "food_17.png",
  },
  {
    name: "Vegan Cake",
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    localImage: "food_18.png",
  },
  {
    name: "Butterscotch Cake",
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    localImage: "food_19.png",
  },
  {
    name: "Sliced Cake",
    price: 15,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Cake",
    localImage: "food_20.png",
  },
  {
    name: "Garlic Mushroom",
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    localImage: "food_21.png",
  },
  {
    name: "Fried Cauliflower",
    price: 22,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    localImage: "food_22.png",
  },
  {
    name: "Mix Veg Pulao",
    price: 10,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    localImage: "food_23.png",
  },
  {
    name: "Rice Zucchini",
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pure Veg",
    localImage: "food_24.png",
  },
  {
    name: "Cheese Pasta",
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    localImage: "food_25.png",
  },
  {
    name: "Tomato Pasta",
    price: 18,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    localImage: "food_26.png",
  },
  {
    name: "Creamy Pasta",
    price: 16,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    localImage: "food_27.png",
  },
  {
    name: "Chicken Pasta",
    price: 24,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Pasta",
    localImage: "food_28.png",
  },
  {
    name: "Butter Noodles",
    price: 14,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    localImage: "food_29.png",
  },
  {
    name: "Veg Noodles",
    price: 12,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    localImage: "food_30.png",
  },
  {
    name: "Somen Noodles",
    price: 20,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    localImage: "food_31.png",
  },
  {
    name: "Cooked Noodles",
    price: 15,
    description:
      "Food provides essential nutrients for overall health and well-being",
    category: "Noodles",
    localImage: "food_32.png",
  },
];

const seedFoods = async () => {
  try {
    await connectDB();
    await Food.deleteMany({});
    console.log("🗑️  Old food data cleared");

    for (const item of foodData) {
      // Upload image to Cloudinary from your frontend assets folder
      const imagePath = `../client/src/assets/${item.localImage}`;
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "food-delivery",
      });

      await Food.create({
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        image: result.secure_url,
      });

      console.log(`✅ Uploaded: ${item.name}`);
    }

    console.log("🎉 All food data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder error:", error.message);
    process.exit(1);
  }
};

seedFoods();
