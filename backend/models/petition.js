import mongoose from 'mongoose';

const petitionSchema = new mongoose.Schema({
  petitionId: { type: String, unique: true },
  petitioner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  supportingDocs: [{ type: String }], // array of S3 URLs
  usersSupported: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  noOfSigns: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'closed'], default: 'active' },
  shareLink: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Petition', petitionSchema);
