import axios from "axios";
import express from "express";

const router = express.Router();

// 🔗 Replace with your actual ngrok URL
const COLAB_API_URL = "https://cd5f-34-32-188-91.ngrok-free.app/chat";

router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.post(COLAB_API_URL, { query });
    res.json({ reply: response.data.response });
  } catch (error) {
    console.error("Gemini API error:", error.message);
    res.status(500).json({ error: "Failed to fetch response from Gemini" });
  }
});

export default router;
