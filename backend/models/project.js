import mongoose from 'mongoose';

const govProjectSchema = new mongoose.Schema({
  projectId: { type: String, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  contractors: [{ type: String }],
  stages: [{ type: String }],
  currentStage: { type: String },
  totalFunds: { type: Number, required: true },
  status: { type: String, enum: ['planned', 'ongoing', 'completed'], default: 'planned' },
  startDate: { type: Date },
  completionDateExpected: { type: Date },
  supportingDocs: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('GovProject', govProjectSchema);