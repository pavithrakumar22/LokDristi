import express from "express";
import Discussion from "../models/Discussion.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Discussions
 *   description: Civic Discussions API
 */

/**
 * @swagger
 * /api/discussions:
 *   get:
 *     summary: Get all discussions
 *     tags: [Discussions]
 *     responses:
 *       200:
 *         description: List of all discussions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch discussions" });
  }
});

/**
 * @swagger
 * /api/discussions/{id}:
 *   get:
 *     summary: Get a single discussion by ID
 *     tags: [Discussions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discussion ID
 *     responses:
 *       200:
 *         description: A discussion object
 *       404:
 *         description: Discussion not found
 */
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

/**
 * @swagger
 * /api/discussions:
 *   post:
 *     summary: Create a new discussion
 *     tags: [Discussions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Improving Public Transport"
 *               content:
 *                 type: string
 *                 example: "Let's brainstorm ideas to enhance urban transport..."
 *     responses:
 *       201:
 *         description: Discussion created successfully
 */
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

/**
 * @swagger
 * /api/discussions/{id}/comment:
 *   post:
 *     summary: Add a comment to a discussion
 *     tags: [Discussions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discussion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "This is a great idea!"
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       404:
 *         description: Discussion not found
 */
router.post("/:id/comment", async (req, res) => {
  const { text } = req.body;

  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: "Discussion not found" });

    discussion.comments.push({ text });
    await discussion.save();

    res.status(200).json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

/**
 * @swagger
 * /api/discussions/{id}/vote:
 *   put:
 *     summary: Vote (upvote/downvote) on a discussion
 *     tags: [Discussions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discussion ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [up, down]
 *                 example: up
 *     responses:
 *       200:
 *         description: Vote registered
 *       400:
 *         description: Invalid vote type
 *       404:
 *         description: Discussion not found
 */
router.put("/:id/vote", async (req, res) => {
  const { type } = req.body;
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
