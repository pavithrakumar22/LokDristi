import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import twilio from 'twilio';

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

const sendOtp = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await twilioClient.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
  return otp;
};

export { generateToken, sendOtp };
