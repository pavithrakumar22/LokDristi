// models/Comment.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  discussionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion',
    required: true
  },
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
