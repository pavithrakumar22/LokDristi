import Discussion from "../models/Discussion.js";

// Create a new discussion
export const createDiscussion = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const discussion = new Discussion({ title, content, category });
    await discussion.save();
    res.status(201).json(discussion);
  } catch (err) {
    res.status(500).json({ error: "Failed to create discussion" });
  }
};

// Fetch all discussions
export const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch discussions" });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;
    const discussion = await Discussion.findById(id);
    discussion.comments.push({ text, author });
    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// Upvote or downvote
export const voteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const discussion = await Discussion.findById(id);
    if (type === "upvote") discussion.upvotes += 1;
    else if (type === "downvote") discussion.downvotes += 1;

    await discussion.save();
    res.json(discussion);
  } catch (err) {
    res.status(500).json({ error: "Vote failed" });
  }
};
