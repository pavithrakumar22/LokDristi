// models/Comment.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  discussionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discussion",
    required: true
  },
  user: {
    type: String, // or { type: mongoose.Schema.Types.ObjectId, ref: 'User' } if login system
    required: true
  },
  text: {
    type: String,
    required: true
  },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Comment", commentSchema);
