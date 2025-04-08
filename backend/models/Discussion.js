// models/Discussion.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const discussionSchema = new mongoose.Schema({
  title: String,
  content: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [commentSchema]
});

const Discussion = mongoose.model("Discussion", discussionSchema);
export default Discussion;
