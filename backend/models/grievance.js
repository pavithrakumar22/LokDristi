import mongoose from 'mongoose';

const grievanceSchema = new mongoose.Schema({
  grievanceId: { type: String, unique: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  grievanceType: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  desiredOutcome: { type: String },
  witness: { type: String },
  fileUrl: { type: String },
  upvotesCount: { type: Number, default: 0 },
  upvotedUsers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Grievance', grievanceSchema);
