import Policy from '../models/policy.js';
import PolicyComment from '../models/policyComment.js';

// Admin creates a new policy
export const createPolicy = async (req, res) => {
  try {
    const { title, description } = req.body;
    const policy = new Policy({ title, description });
    await policy.save();
    res.status(201).json(policy);
  } catch (err) {
    res.status(500).json({ error: 'Error creating policy' });
  }
};

// Get all policies
export const getAllPolicies = async (req, res) => {
  const policies = await Policy.find().sort({ datePosted: -1 });
  res.json(policies);
};

// Upvote or Downvote
export const votePolicy = async (req, res) => {
  const { voteType } = req.body; // "upvote" or "downvote"
  const update = voteType === "upvote" ? { $inc: { upvotes: 1 } } : { $inc: { downvotes: 1 } };
  await Policy.findByIdAndUpdate(req.params.id, update);
  res.json({ message: "Vote recorded" });
};

// Add a comment
export const addComment = async (req, res) => {
  const { comment } = req.body;
  const newComment = new PolicyComment({
    policyId: req.params.policyId,
    userId: req.user.id,
    comment,
  });
  await newComment.save();
  res.status(201).json(newComment);
};

// Get policy details with comments
export const getPolicyDetails = async (req, res) => {
  const policy = await Policy.findById(req.params.id);
  const comments = await PolicyComment.find({ policyId: req.params.id }).populate('userId', 'name');
  res.json({ policy, comments });
};
