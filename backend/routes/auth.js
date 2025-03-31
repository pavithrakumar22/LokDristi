import express from 'express';
import User from '../models/User.js';
// import { validateSignup, validateLogin, validateOtpLogin } from '../middleware/validation.js';
import {validateSignup,validateLogin}  from '../middleware/validation.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Signup Route (from previous code)
router.post('/signup', validateSignup, async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    location,
    password,
    aadhaar,
    preferredLanguage,
    agreedToTerms,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    if (aadhaar) {
      const aadhaarExists = await User.findOne({ aadhaar });
      if (aadhaarExists) {
        return res.status(400).json({ message: 'Aadhaar number already registered' });
      }
    }

    const user = new User({
      fullName,
      email,
      phoneNumber: phoneNumber || undefined,
      location: location || {},
      password,
      aadhaar: aadhaar || undefined,
      preferredLanguage: preferredLanguage || 'English',
      agreedToTerms,
    });

    await user.save();
    res.status(201).json({ message: 'Signup successful! Please log in.' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route (Email/Password)
router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Success (in production, return a JWT token here)
    res.status(200).json({ message: 'Login successful!', user: { fullName: user.fullName, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// // Optional: Request OTP for Phone Login
// router.post('/login/otp', validateOtpLogin, async (req, res) => {
//   const { phoneNumber } = req.body;

//   try {
//     const user = await User.findOne({ phoneNumber });
//     if (!user) {
//       return res.status(400).json({ message: 'Phone number not registered' });
//     }

//     // Simulate OTP generation (replace with real SMS API like Twilio)
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//     console.log(`Generated OTP for ${phoneNumber}: ${otp}`); // For testing

//     // In production, save OTP to user model with expiration and send via SMS
//     res.status(200).json({ message: 'OTP sent to your phone' });
//   } catch (error) {
//     console.error('OTP login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

export default router;