import mongoose from "mongoose";

const DB_URL = process.env.DATABASE_URL; // Replace with your actual MongoDB URI
// const DB_URL = "mongodb://localhost:27017/mydatabase";
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // process.exit(1); // Exit process with failure
  }
};

export default connectDB;
