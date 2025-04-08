// --- imports ---
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import suggestionRoutes from './routes/suggestionRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import Donation from './models/Transaction.js';
import axios from "axios";
import { isAdmin } from "./middleware/auth.js"; // ⬅️ Middleware to restrict to admin
import twilio from "twilio";
import chatRoutes from "./routes/chatRoutes.js"
import User from "./models/user.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// --- setup ---
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
connectDB();

<<<<<<< HEAD
connectDB().then(() => console.log("✅ MongoDB Connected Successfully!"));

=======
// --- twilio setup ---
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStore = {}; // In-memory OTP store (consider Redis for prod)
>>>>>>> 919f684e1c3a5330803ac7f3c9f7f13adb182021

// --- routes ---
app.get("/", (req, res) => {
  res.send("LokDristi is running.....");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use("/api/chat", chatRoutes);

<<<<<<< HEAD
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
=======
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
      receipt: `receipt#${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send("Error creating order");

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// --- validate payment ---
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

// --- send OTP ---
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await client.messages.create({
      body: `Your OTP for LokDristi donation is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    otpStore[phone] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      verified: false
    };

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Twilio OTP error:', error?.message || error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// --- verify OTP ---
app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  const record = otpStore[phone];
  if (!record) return res.status(400).json({ error: 'OTP not requested' });
  if (Date.now() > record.expiresAt) return res.status(400).json({ error: 'OTP expired' });
  if (otp !== record.otp) return res.status(400).json({ error: 'Invalid OTP' });

  otpStore[phone].verified = true;
  res.status(200).json({ message: 'OTP verified' });
});

// --- donation with OTP check ---
app.post('/donate', async (req, res) => {
  try {
    const {
      name,
      aadhaarNumber,
      phone,
      email,
      address,
      category,
      amount,
      paymentId,
      orderId
    } = req.body;

    if (!otpStore[phone] || !otpStore[phone].verified) {
      return res.status(403).json({ error: 'OTP verification required' });
    }

    const newDonation = new Donation({
      name,
      aadhaarNumber,
      phone,
      email,
      address,
      category,
      amount,
      paymentId,
      orderId
    });

    const savedDonation = await newDonation.save();
    delete otpStore[phone]; // Clean after donation

    res.status(201).json(savedDonation);
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- get donations by Aadhaar ---
app.get('/donations/:aadhaarNumber', async (req, res) => {
  try {
    const { aadhaarNumber } = req.params;
    const donations = await Donation.find({ aadhaarNumber });

    if (donations.length === 0) {
      return res.status(404).json({ message: 'No donations found for this Aadhaar number.' });
    }

    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- get user info by Aadhaar ---
app.get('/user/:aadhaarNumber', async (req, res) => {
  const aadhaarNo = req.params.aadhaarNumber;

  try {
    const user = await User.findOne({ aadhaarNo });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- get Aadhaar from phone ---
app.get('/aadhaar/:phone', async (req, res) => {
  const phone = req.params.phone;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ aadhaarNo: user.aadhaarNo });
  } catch (error) {
    console.error('Error fetching Aadhaar:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 🧠 Admin-only Sentiment Analysis
app.post('/api/sentiment/analyze', isAdmin, async (req, res) => {
    try {
        const { text } = req.body;
        const response = await axios.post("http://localhost:5002/analyze", { text }); // Flask service URL
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Sentiment Analysis Failed:", error.message);
        res.status(500).json({ error: "Sentiment analysis failed" });
    }
});

// --- get user info by Aadhaar ---

app.get('/aadhaar/:phone', async (req, res) => {
  const phone = req.params.phone;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ aadhaarNo: user.aadhaarNo });
  } catch (error) {
    console.error('Error fetching Aadhaar:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/get-location", async (req, res) => {
  const { pincode } = req.body;

  if (!pincode || typeof pincode !== "string" || !/^\d{6}$/.test(pincode)) {
    return res.status(400).json({ error: "Invalid pincode format" });
  }

  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = response.data?.[0];

    if (data.Status !== "Success") {
      return res.status(404).json({ error: "Pincode not found" });
    }

    const postOffice = data.PostOffice?.[0];

    res.json({
      place: postOffice.Name,
      district: postOffice.District,
      state: postOffice.State,
      country: postOffice.Country,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
    console.log("LokDristi backend running on port", PORT);
});
>>>>>>> 919f684e1c3a5330803ac7f3c9f7f13adb182021
