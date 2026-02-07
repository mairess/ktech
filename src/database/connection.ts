import "dotenv/config";
import mongoose from "mongoose";

export const connection = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error(
      "❌ MONGO_URI is not defined, impossible to create connection.",
    );
  }

  try {
    await mongoose.connect(uri);
    const dbName = mongoose.connection.name;
    console.info(`✅ Connected to MongoDB: ${dbName} is up and ready to go.`);
  } catch (error) {
    console.info(`❌ Failed to connected to MongoDB: ${error}`);
    process.exit(1);
  }
};
