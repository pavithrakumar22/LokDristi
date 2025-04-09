// import mongoose from 'mongoose';

// const govProjectSchema = new mongoose.Schema({
//   projectId: { type: String, unique: true },
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   department: { type: String, required: true },
//   contractors: [{ type: String }],
//   stages: [{ type: String }],
//   currentStage: { type: String },
//   totalFunds: { type: Number, required: true },
//   status: { type: String, enum: ['planned', 'ongoing', 'completed'], default: 'planned' },
//   startDate: { type: Date },
//   completionDateExpected: { type: Date },
//   supportingDocs: [{ type: String }],
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('GovProject', govProjectSchema);


import mongoose from "mongoose";

// Nested sub-schemas
const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  type: { type: String, required: true }, // Planning, Financial, Legal, Environmental
});

const UpdateSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  text: { type: String, required: true },
});

const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  severity: { type: String, enum: ["low", "medium", "high"], required: true },
  status: { type: String, enum: ["open", "resolved", "closed"], required: true },
});

// Main project schema
const ProjectSchema = new mongoose.Schema(
  {
    projectId: {type:String,required:true},
    title: { type: String, required: true },
    description: { type: String },
    department: { type: String, required: true },
    contractors: [{ type: String }],
    location: { type: String },

    stages: [{ type: String }], // e.g., ["Planning", "Land Acquisition", ...]
    currentStage: { type: Number, default: 0 }, // index of the current stage

    totalFunds: { type: String },     // e.g., "₹1,250 Cr"
    allocatedFunds: { type: String }, // e.g., "₹450 Cr"
    expenditureSoFar: { type: String }, // e.g., "₹320 Cr"

    status: {
      type: String,
      enum: ["active", "completed", "delayed", "cancelled"],
      default: "active",
    },

    startDate: { type: Date },
    completionDate: { type: Date },

    documents: [DocumentSchema],
    updates: [UpdateSchema],
    issues: [IssueSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
