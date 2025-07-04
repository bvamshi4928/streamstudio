import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connection successful to mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb", error);
    process.exit(1);
  }
};
