import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import database connection
import cors from "cors";

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json()); // Allow JSON data
app.use(cors()); // Handle CORS

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
