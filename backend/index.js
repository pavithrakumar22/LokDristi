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
import { isAdmin } from "./middleware/auth.js"; // Admin middleware
import twilio from "twilio";
import chatRoutes from "./routes/chatRoutes.js";
import User from "./models/user.js";
import discussionRoutes from "./routes/discussionRoutes.js";
import Discussion from './models/Discussion.js';
<<<<<<< HEAD
import commentRoutes from './routes/commentRoutes.js';
=======
import petitionRoutes from "./routes/petitionRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

>>>>>>> 4c053950688e61447f903d09afc2bec6aea4b7a8
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// --- middleware setup ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
connectDB();

// --- Twilio setup ---
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStore = {}; // In-memory OTP store (use Redis for production)

// --- base route ---
app.get("/", (req, res) => {
  res.send("LokDristi is running.....");
});

// --- API routes ---
app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/discussions", discussionRoutes);
<<<<<<< HEAD
app.use('/api/comments', commentRoutes);
=======
app.use("/api/petitions", petitionRoutes);
app.use("/api/projects", projectRoutes);

>>>>>>> 4c053950688e61447f903d09afc2bec6aea4b7a8
// --- Create Razorpay Order ---
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

// --- Validate Razorpay Payment ---
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

// --- Send OTP via Twilio ---
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

// --- Verify OTP ---
app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  const record = otpStore[phone];
  if (!record) return res.status(400).json({ error: 'OTP not requested' });
  if (Date.now() > record.expiresAt) return res.status(400).json({ error: 'OTP expired' });
  if (otp !== record.otp) return res.status(400).json({ error: 'Invalid OTP' });

  otpStore[phone].verified = true;
  res.status(200).json({ message: 'OTP verified' });
});

// --- Donation Endpoint ---
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
    delete otpStore[phone]; // Clear after success

    res.status(201).json(savedDonation);
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- Get donations by Aadhaar ---
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

// --- Get user by Aadhaar ---
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

// --- Get Aadhaar from phone ---
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

// --- Admin Sentiment Analysis ---
app.post('/api/sentiment/analyze', isAdmin, async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post("http://localhost:5002/analyze", { text }); // Flask URL
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Sentiment Analysis Failed:", error.message);
    res.status(500).json({ error: "Sentiment analysis failed" });
  }
});

// --- Get location from PIN code ---
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

// --- Seed sample discussion ---
app.get("/api/seed-discussion", async (req, res) => {
  try {
    const existing = await Discussion.findById("123abc");
    if (existing) {
      return res.status(400).json({ message: "Discussion already exists" });
    }

    const sampleDiscussion = new Discussion({
      _id: "123abc",
      title: "How can we improve sanitation in rural areas?",
      content: "Let's come together and discuss sustainable solutions for public health and hygiene.",
      upvotes: 0,
      downvotes: 0,
      comments: []
    });

    const saved = await sampleDiscussion.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Seeding error:", err.message);
    res.status(500).json({ error: "Failed to seed discussion" });
  }
});

// --- start server ---
app.listen(PORT, () => {
  console.log("✅ LokDristi backend running on port", PORT);
});
