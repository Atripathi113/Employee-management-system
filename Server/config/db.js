import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MongoDB URI missing from .env");

    await mongoose.connect(uri);
    console.log(" MongoDB connected successfully!");
  } catch (error) {
    console.error(" Error connecting to MongoDB:", error.message);
  }
};

export default connectDb;
