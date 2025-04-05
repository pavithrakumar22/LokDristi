import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import suggestionRoutes from './routes/suggestionRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js'


dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectDB();

app.get("/", (req, res) => {
    res.send("LokDristi is running.....");
});

app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes);


app.post('/order', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        const { amount, currency } = req.body;
        const options = {
            amount,
            currency,
            receipt: `receipt#${new Date().getTime()}`
        };

        const order = await razorpay.orders.create(options);
        if (!order) {
            return res.status(500).send("Error creating order");
        }

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.post("/order/validate", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        if (digest !== razorpay_signature) {
            return res.status(400).json({ msg: "Transaction is not legit!" });
        }

        res.json({
            msg: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

app.listen(PORT, () => {
    console.log("Listening on Port", PORT);
});
