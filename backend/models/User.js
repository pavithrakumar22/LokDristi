import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  aadhaarNo: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  pincode: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date },
});

export default mongoose.model('User', userSchema);