import express from "express";
import Suggestion from "../models/Suggestion.js";  // ✅ Correct

const router = express.Router();

// ✅ GET all suggestions
router.get("/", async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching suggestions" });
  }
});

// ✅ POST new suggestion
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
