import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema(
  {
    suggestionId: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated ID
    title: { type: String, required: true },  // Title of the suggestion
    description: { type: String, required: true }, // Description
    links: { type: [String] }, // Array of links
    uid: { type: String, required: true }, // Aadhar UID
    anonymous: { type: Boolean, default: false }, // Is the suggestion anonymous?
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

const Suggestion = mongoose.model("Suggestion", SuggestionSchema);
export default Suggestion;
