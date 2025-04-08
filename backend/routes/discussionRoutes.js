import express from "express";
import {
  createDiscussion,
  getDiscussions,
  addComment,
  voteDiscussion,
} from "../controllers/discussionController.js";

const router = express.Router();

router.post("/", createDiscussion); // POST /api/discussions
router.get("/", getDiscussions);    // GET  /api/discussions
router.post("/:id/comment", addComment); // POST /api/discussions/:id/comment
router.post("/:id/vote", voteDiscussion); // POST /api/discussions/:id/vote

export default router;
