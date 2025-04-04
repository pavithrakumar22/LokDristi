import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { generateToken, sendOtp } from '../services/authService.js';

const signup = async (req, res) => {
  try {
    const { aadhaarNo, phone, pincode } = req.body;
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const otp = await sendOtp(phone);
    const hashedOtp = await bcrypt.hash(otp, 10);
    const user = new User({ aadhaarNo, phone, pincode, otp: hashedOtp, otpExpires: new Date(Date.now() + 10 * 60000) });
    await user.save();
    res.status(200).json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error in signup', error });
  }
};

const login = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });
    if (!user || !user.otpExpires || user.otpExpires < new Date()) return res.status(400).json({ message: 'Invalid or expired OTP' });
    const validOtp = await bcrypt.compare(otp, user.otp);
    if (!validOtp) return res.status(400).json({ message: 'Invalid OTP' });
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    const token = generateToken(user);
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error in login', error });
  }
};

export { login, signup };

