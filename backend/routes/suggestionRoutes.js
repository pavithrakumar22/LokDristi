import express from "express";
import Suggestion from "../models/Suggestion.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Suggestions
 *   description: Endpoints related to user suggestions
 */

/**
 * @swagger
 * /api/suggestions:
 *   get:
 *     summary: Get all suggestions
 *     tags: [Suggestions]
 *     responses:
 *       200:
 *         description: List of suggestions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Suggestion'
 *       500:
 *         description: Error fetching suggestions
 */
router.get("/", async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suggestions" });
  }
});

/**
 * @swagger
 * /api/suggestions:
 *   post:
 *     summary: Submit a new suggestion
 *     tags: [Suggestions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Suggestion'
 *     responses:
 *       201:
 *         description: Suggestion saved successfully
 *       500:
 *         description: Failed to save suggestion
 */
router.post("/", async (req, res) => {
  try {
    const newSuggestion = new Suggestion(req.body);
    await newSuggestion.save();
    res.status(201).json({ message: "Suggestion saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save suggestion" });
  }
});

export default router;
