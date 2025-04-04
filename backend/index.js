import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';
import Transaction from "./models/Transaction.js";
import Coins from "./models/Coins.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectDB().then(() => console.log("✅ MongoDB Connected Successfully!"));


app.get("/", (req, res) => {
    res.send("LokDristi is running.....");
});

// app.use('/api/auth', authRoutes);

app.post('/sample-convert', async (req, res) => {
    try {
        console.log("🔹 Received request:", req.body);

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        const { username, amount, currency } = req.body;
        if (!username || !amount || !currency) {
            console.log("❌ Missing required fields");
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log("🛠️ Creating order...");
        const options = {
            amount,
            currency,
            receipt: `receipt#${new Date().getTime()}`
        };

        const order = await razorpay.orders.create(options);
        if (!order) {
            console.log("❌ Error creating order");
            return res.status(500).send("Error creating order");
        }

        console.log("✅ Order created:", order);

        let transaction = await Transaction.findOne({ username });
        console.log("🔍 Transaction found:", transaction);

        if (!transaction) {
            console.log("🆕 No previous transaction found, creating new...");
            transaction = new Transaction({
                username,
                orders: []
            });
        }

        transaction.orders.push(order);
        await transaction.save();
        console.log("✅ Transaction saved successfully");

        const coinValue = amount / 10;
        let userCoins = await Coins.findOne({ username });
        console.log("🔍 User Coins found:", userCoins);

        if (!userCoins) {
            console.log("🆕 No user coins found, creating new...");
            userCoins = new Coins({
                username,
                coins: 0
            });
        }

        userCoins.coins += coinValue;
        await userCoins.save();
        console.log("✅ Coins updated successfully");

        res.json({ order, coins: userCoins.coins });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).send("Error");
    }
});
