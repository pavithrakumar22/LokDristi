import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';

dotenv.config()
const app=express()
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

connectDB();

app.get("/",(req,res)=>{
    res.send("LokDristi is running.....")
});

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log("Listening on Port", PORT)
  })
  