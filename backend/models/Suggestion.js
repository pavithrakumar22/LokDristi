import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    links: { type: [String], default: [] },
    uid: { type: String, required: true }, // Aadhar UID
    anonymous: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Suggestion = mongoose.model("Suggestion", SuggestionSchema);
export default Suggestion;
