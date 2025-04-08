import mongoose from 'mongoose';

const PolicySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  datePosted: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

export default mongoose.model('Policy', PolicySchema);
