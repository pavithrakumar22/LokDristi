import express from "express";
import Discussion from "../models/Discussion.js";

const router = express.Router(); // 🟢 This was missing!

// Get all discussions
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch discussions" });
  }
});

// Get one discussion by ID
// Get one discussion by ID
// Get a single discussion by ID
router.get("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: "Discussion not found" });

    res.status(200).json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch discussion" });
  }
});



// Create new discussion
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newDiscussion = new Discussion({
      title,
      content,
      upvotes: 0,
      downvotes: 0,
      comments: [],
    });

    const saved = await newDiscussion.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to create discussion" });
  }
});

// Add comment
// Add comment to a discussion
router.post("/:id/comment", async (req, res) => {
  const { text } = req.body;

  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: "Discussion not found" });

    discussion.comments.push({ text }); // you can add user here too if needed
    await discussion.save();

    res.status(200).json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});


// Vote (upvote/downvote)
router.put("/:id/vote", async (req, res) => {
  const { type } = req.body; // 'up' or 'down'
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: "Discussion not found" });

    if (type === "up") discussion.upvotes++;
    else if (type === "down") discussion.downvotes++;
    else return res.status(400).json({ error: "Invalid vote type" });

    await discussion.save();
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: "Failed to vote" });
  }
});

export default router;
