import User from '../models/user.js';
import { sendOtp, generateToken } from '../services/authService.js';
import bcrypt from 'bcrypt';

const formatPhone = (phone) => {
  return phone.startsWith('+91') ? phone : `+91${phone}`;
};

const signup = async (req, res) => {
  try {
    const { name, aadhaarNo, phone, email, pincode } = req.body;
    const formattedPhone = formatPhone(phone);

    const existingUser = await User.findOne({ phone: formattedPhone });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: 'User already exists and is verified' });
    }

    const otp = await sendOtp(formattedPhone);
    const hashedOtp = await bcrypt.hash(otp, 10);

    if (existingUser) {
      existingUser.name = name;
      existingUser.aadhaarNo = aadhaarNo;
      existingUser.email = email;
      existingUser.pincode = pincode;
      existingUser.otp = hashedOtp;
      existingUser.otpExpires = new Date(Date.now() + 10 * 60000);
      await existingUser.save();
    } else {
      const user = new User({
        name,
        aadhaarNo,
        phone: formattedPhone,
        email,
        pincode,
        otp: hashedOtp,
        otpExpires: new Date(Date.now() + 10 * 60000)
      });
      await user.save();
    }

    res.status(200).json({ message: 'OTP sent for verification' });
  } catch (error) {
    res.status(500).json({ message: 'Error in signup', error });
  }
};

const verifySignupOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const formattedPhone = formatPhone(phone);

    const user = await User.findOne({ phone: formattedPhone });
    if (!user || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const validOtp = await bcrypt.compare(otp, user.otp);
    if (!validOtp) return res.status(400).json({ message: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'Signup verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying signup OTP', error });
  }
};

const login = async (req, res) => {
  try {
    const { phone } = req.body;
    const formattedPhone = formatPhone(phone);

    const user = await User.findOne({ phone: formattedPhone });
    if (!user || !user.isVerified) {
      return res.status(400).json({ message: 'User not found or not verified' });
    }

    const otp = await sendOtp(formattedPhone);
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpires = new Date(Date.now() + 10 * 60000);
    await user.save();

    res.status(200).json({ message: 'OTP sent to phone' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending login OTP', error });
  }
};

const verifyLoginOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const formattedPhone = formatPhone(phone);

    const user = await User.findOne({ phone: formattedPhone });
    if (!user || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const validOtp = await bcrypt.compare(otp, user.otp);
    if (!validOtp) return res.status(400).json({ message: 'Invalid OTP' });

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = generateToken(user);
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying login OTP', error });
  }
};

export { signup, verifySignupOtp, login, verifyLoginOtp };
