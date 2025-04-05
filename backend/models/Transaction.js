import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name: String,
  aadhaarNumber: String,
  phone: String,
  email: String,
  category: String,
  amount: Number,
  paymentId: String,
  orderId: String,
  address: {
    place: String,
    district: String,
    state: String,
    country: String,
    pincode: String,
  }
}, {
  timestamps: true
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
