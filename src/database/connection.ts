import "dotenv";
import mongoose from "mongoose";

export const connection = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not defined!");
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Mongo is connected!");
  } catch (error) {
    console.error("❌ Error connecting Mongo:", error);
    process.exit(1);
  }
};
