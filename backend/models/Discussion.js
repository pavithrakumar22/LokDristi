import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const discussionSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [commentSchema]
});

export default mongoose.model("Discussion", discussionSchema);
