import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, sparse: true }, // Optional, sparse for uniqueness
  location: {
    state: { type: String },
    city: { type: String },
  },
  password: { type: String, required: true },
  aadhaar: { type: String, sparse: true }, // Optional, sparse for uniqueness
  preferredLanguage: { type: String, default: 'English' },
  agreedToTerms: { type: Boolean, required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('User', userSchema);