import mongoose from "mongoose"

const votedSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
    unique: true, // Optional: prevents duplicate entries for the same voter
  },
  valid: {
    type: Boolean,
    required: true,
    default: true, // Default to true if not explicitly provided
  },
})

export default mongoose.model("Voted", votedSchema)
