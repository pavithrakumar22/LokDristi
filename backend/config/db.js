import mongoose from "mongoose";

const connectDB = async () => {
  try {
<<<<<<< HEAD
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
=======
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("MongoDB connected successfully");
    });
>>>>>>> 4c053950688e61447f903d09afc2bec6aea4b7a8
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
