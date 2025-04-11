import express from "express";
import { setElectionActive, getElectionActive } from "../controllers/electionState.js";

export default function votingRoutes(votingContract) {
  const router = express.Router();

  // ✅ Start Election
  router.post("/start-election", async (req, res) => {
    const { candidates } = req.body;

    if (!Array.isArray(candidates) || candidates.length === 0) {
      return res.status(400).json({ error: "Candidates array is required." });
    }

    try {
      const tx = await votingContract.startElection(candidates);
      await tx.wait();
      setElectionActive(true); // ✅ Use shared state
      res.json({ message: "Election started!", txHash: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.reason || err.message });
    }
  });

  // ✅ End Election
  router.post("/end-election", async (req, res) => {
    try {
      const tx = await votingContract.endElection();
      await tx.wait();
      setElectionActive(false); // ✅ Use shared state
      res.json({ message: "Election ended!", txHash: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.reason || err.message });
    }
  });

  // ✅ Get all candidates
  router.get("/candidates", async (req, res) => {
    if (!getElectionActive()) {
      return res.status(400).json({ error: "Election is not active. Cannot vote." });
    }
    try {
      const candidates = await votingContract.getAllCandidates();
      res.json({ candidates });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Vote (only if election is active)
  router.post("/vote", async (req, res) => {
    const { voterId, candidate } = req.body;

    if (!getElectionActive()) {
      return res.status(400).json({ error: "Election is not active. Cannot vote." });
    }

    try {
      const tx = await votingContract.vote(voterId, candidate);
      await tx.wait();
      res.json({ message: "Vote casted successfully!", txHash: tx.hash });
    } catch (err) {
      res.status(400).json({ error: err.reason || err.message });
    }
  });

  // ✅ Get current election status
  router.get("/election-status", (req, res) => {
    res.json({ electionActive: getElectionActive() });
  });

  // ✅ Get votes for a candidate
  router.get("/votes/:candidate", async (req, res) => {
    if (!getElectionActive()) {
      return res.status(400).json({ error: "Election is not active. Cannot vote." });
    }
    try {
      const count = await votingContract.getVotes(req.params.candidate);
      res.json({ votes: parseInt(count) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Get election result
  router.get("/result", async (req, res) => {
    if (!getElectionActive()) {
      return res.status(400).json({ error: "Election is not active. Cannot vote." });
    }
    try {
      const [winner, votes] = await votingContract.getMaxVotes();
      res.json({ winner, votes: parseInt(votes) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Store a vote
router.post("/store-vote", async (req, res) => {
  const { voterId } = req.body

  if (!voterId) {
    return res.status(400).json({ success: false, message: "voterId is required" })
  }

  try {
    const existing = await Voted.findOne({ voterId })

    if (existing) {
      return res.status(409).json({ success: false, message: "Voter already voted" })
    }

    const vote = new Voted({ voterId, valid: true })
    await vote.save()

    res.status(201).json({ success: true, message: "Vote stored successfully", vote })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
})

// Reset all votes
router.delete("/reset-votes", async (req, res) => {
  try {
    await Voted.deleteMany({})
    res.status(200).json({ success: true, message: "All votes have been reset" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error })
  }
})


  return router;
}
