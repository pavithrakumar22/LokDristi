import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import suggestionRoutes from './routes/suggestionRoutes.js';
import Donation from './models/Transaction.js';
import petitionRoutes from './routes/petitionRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js'
import User from "./models/User.js";

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectDB();

app.get("/", (req, res) => {
    res.send("LokDristi is running.....");
});

app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/petitions', petitionRoutes);
app.use('/api/projects', projectRoutes);

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
          res.status(201).json(savedDonation);
    } catch (error) {
        console.error("Error saving donation:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

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

app.get('/user/:aadhaarNumber', async (req, res) => {
    const aadhaarNo = req.params.aadhaarNumber; // <-- FIXED LINE
  
    try {
      const user = await User.findOne({ aadhaarNo }); // aadhaarNo here refers to DB field
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
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
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json({ aadhaarNo: user.aadhaarNo });
    } catch (error) {
      console.error('Error fetching Aadhaar:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
    console.log("Listening on Port", PORT);
});
