import mongoose from 'mongoose';

const PolicyCommentSchema = new mongoose.Schema({
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('PolicyComment', PolicyCommentSchema);
