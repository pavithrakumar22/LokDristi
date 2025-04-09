// routes/commentRoutes.js
import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// Get comments for a post
router.get("/:discussionId", async (req, res) => {
    try {
      const { discussionId } = req.params;
      const comments = await Comment.find({ discussionId });
      res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Server Error" });
    }
  });
  

// Add a comment
router.post('/:discussionId', async (req, res) => {
  const { discussionId } = req.params;
  const { user, text } = req.body;

  try {
    const comment = new Comment({ discussionId, user, text });
    const saved = await comment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Error posting comment' });
  }
});

// Upvote
router.patch('/upvote/:commentId', async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Error upvoting' });
  }
});

// Downvote
router.patch('/downvote/:commentId', async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { $inc: { downvotes: 1 } },
      { new: true }
    );
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Error downvoting' });
  }
});

export default router;
