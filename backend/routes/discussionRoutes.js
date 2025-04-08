import express from "express";
import Discussion from "../models/Discussion.js";

const router = express.Router();

// ✅ Seeding route to create one sample discussion
router.get("/seed-discussion", async (req, res) => {
  try {
    const discussion = new Discussion({
      title: "How can we improve sanitation in rural areas?",
      content: "Let's come together and discuss sustainable solutions for public health and hygiene.",
      upvotes: 0,
      downvotes: 0,
      comments: []
    });

    const saved = await discussion.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Seeding error:", error.message);
    res.status(500).json({ error: "Failed to seed discussion" });
  }
});

export default router;
