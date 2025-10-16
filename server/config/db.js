import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected`);
  } catch (err) {
    console.log("Error : " + err.message);
    process.exit(1);
  }
}
