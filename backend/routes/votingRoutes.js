import express from "express";

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
      res.json({ message: "Election ended!", txHash: tx.hash });
    } catch (err) {
      res.status(500).json({ error: err.reason || err.message });
    }
  });

  // ✅ Get all candidates
  router.get("/candidates", async (req, res) => {
    try {
      const candidates = await votingContract.getAllCandidates();
      res.json({ candidates });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Vote
  router.post("/vote", async (req, res) => {
    const { voterId, candidate } = req.body;
    try {
      const tx = await votingContract.vote(voterId, candidate);
      await tx.wait();
      res.json({ message: "Vote casted successfully!", txHash: tx.hash });
    } catch (err) {
      res.status(400).json({ error: err.reason || err.message });
    }
  });

  // ✅ Get votes for a candidate
  router.get("/votes/:candidate", async (req, res) => {
    try {
      const count = await votingContract.getVotes(req.params.candidate);
      res.json({ votes: parseInt(count) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Get election result
  router.get("/result", async (req, res) => {
    try {
      const [winner, votes] = await votingContract.getMaxVotes();
      res.json({ winner, votes: parseInt(votes) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
