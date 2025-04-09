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
import { isAdmin } from "./middleware/auth.js";
import twilio from "twilio";
import chatRoutes from "./routes/chatRoutes.js";
import User from "./models/user.js";
import discussionRoutes from "./routes/discussionRoutes.js";
import Discussion from './models/Discussion.js';
import petitionRoutes from "./routes/petitionRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import swaggerSpec from './swagger.js';
import swaggerUi from 'swagger-ui-express';
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import votingRoutes from "./routes/votingRoutes.js";
import commentRoutes from './routes/commentRoutes.js';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// --- middleware setup ---
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
connectDB();

// Load ABI and Contract Address
const __dirname = path.resolve();
const contractJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../frontend/contracts/Voting.json")));
const contractAddressJson = JSON.parse(fs.readFileSync(path.join(__dirname, "../frontend/contracts/Voting-address.json")));
const contractAddress = contractAddressJson.address;

// Ethers setup
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const votingContract = new ethers.Contract(contractAddress, contractJson.abi, wallet);

app.use("/api", votingRoutes(votingContract));

// Swagger Docs Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: Endpoints for handling donations, OTP verification, and payments
 */

// --- Twilio setup ---
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStore = {};

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
app.use("/api/petitions", petitionRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/comments",commentRoutes);
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a Razorpay order
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order created successfully
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /order/validate:
 *   post:
 *     summary: Validate Razorpay payment
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment validated
 *       400:
 *         description: Invalid transaction
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /send-otp:
 *   post:
 *     summary: Send OTP for donation verification
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent
 *       400:
 *         description: Phone number missing
 *       500:
 *         description: OTP send failed
 */
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

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: Verify received OTP
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified
 *       400:
 *         description: OTP invalid or expired
 */
app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  const record = otpStore[phone];
  if (!record) return res.status(400).json({ error: 'OTP not requested' });
  if (Date.now() > record.expiresAt) return res.status(400).json({ error: 'OTP expired' });
  if (otp !== record.otp) return res.status(400).json({ error: 'Invalid OTP' });

  otpStore[phone].verified = true;
  res.status(200).json({ message: 'OTP verified' });
});

/**
 * @swagger
 * /donate:
 *   post:
 *     summary: Submit donation details
 *     tags: [Donations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               aadhaarNumber:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               paymentId:
 *                 type: string
 *               orderId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Donation successful
 *       403:
 *         description: OTP verification required
 *       500:
 *         description: Server error
 */
app.post('/donate', async (req, res) => {
  try {
    const {
      name, aadhaarNumber, phone, email,
      address, category, amount, paymentId, orderId
    } = req.body;

    if (!otpStore[phone] || !otpStore[phone].verified) {
      return res.status(403).json({ error: 'OTP verification required' });
    }

    const newDonation = new Donation({
      name, aadhaarNumber, phone, email,
      address, category, amount, paymentId, orderId
    });

    const savedDonation = await newDonation.save();
    delete otpStore[phone];

    res.status(201).json(savedDonation);
  } catch (error) {
    console.error("Error saving donation:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /donations/{aadhaarNumber}:
 *   get:
 *     summary: Get donations by Aadhaar number
 *     tags: [Donations]
 *     parameters:
 *       - in: path
 *         name: aadhaarNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Aadhaar number of the donor
 *     responses:
 *       200:
 *         description: List of donations
 *       404:
 *         description: No donations found
 *       500:
 *         description: Server error
 */
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

// --- Remaining routes (optional Swagger later) ---
app.get('/user/:aadhaarNumber', async (req, res) => {
  const aadhaarNo = req.params.aadhaarNumber;
  try {
    const user = await User.findOne({ aadhaarNo });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/aadhaar/:phone', async (req, res) => {
  const phone = req.params.phone;
  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ aadhaarNo: user.aadhaarNo });
  } catch (error) {
    console.error('Error fetching Aadhaar:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/sentiment/analyze', isAdmin, async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post("http://localhost:5002/analyze", { text });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Sentiment Analysis Failed:", error.message);
    res.status(500).json({ error: "Sentiment analysis failed" });
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

app.get("/api/news", async (req, res) => {
  try {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbz-4171X5dQNgvl5y0jsnruZVwGQtbwvZh_MrsSS4RkmR5bPfpetFF5TdWOuyc_z1mzFA/exec";

    const response = await fetch(scriptUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// --- start server ---
app.listen(PORT, () => {
  console.log("✅ LokDristi backend running on port", PORT);
});
