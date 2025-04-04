import express from "express";
import Suggestion from "../models/Suggestion.js";

const router = express.Router();

// 🔹 POST a new suggestion
router.post("/", async (req, res) => {
  try {
    const { title, description, links, uid, anonymous } = req.body;
    const newSuggestion = new Suggestion({ title, description, links, uid, anonymous });
    await newSuggestion.save();
    res.status(201).json({ message: "Suggestion submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 🔹 GET all suggestions
router.get("/", async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
