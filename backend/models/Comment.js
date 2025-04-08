import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    discussionId: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion", required: true },
    author: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
