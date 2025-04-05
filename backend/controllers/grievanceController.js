import Grievance from '../models/grievance.js';
import { v4 as uuidv4 } from 'uuid';

// Submit Grievance
const submitGrievance = async (req, res) => {
  try {
    const { grievanceType, title, description, desiredOutcome, witness } = req.body;

    const grievance = new Grievance({
      grievanceId: `G-${uuidv4()}`,
      user: req.user._id,
      grievanceType,
      title,
      description,
      desiredOutcome,
      witness,
      fileUrl: req.file?.location || null // ✅ fetch S3 file URL directly
    });

    await grievance.save();
    res.status(201).json({ message: 'Grievance submitted successfully', grievance });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting grievance', error });
  }
};

// Get all grievances
const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find().populate('user', 'name email phone aadhaarNo');
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grievances', error });
  }
};

// Get trending grievances
const getTrendingGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find()
      .sort({ upvotesCount: -1 })
      .populate('user', 'name email phone aadhaarNo');
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trending grievances', error });
  }
};

// Get latest grievances
const getLatestGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email phone aadhaarNo');
    res.json(grievances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest grievances', error });
  }
};

// Upvote grievance
const upvoteGrievance = async (req, res) => {
  try {
    const { id } = req.params;
    const grievance = await Grievance.findById(id);

    if (!grievance) return res.status(404).json({ message: 'Grievance not found' });

    if (grievance.upvotedUsers.includes(req.user._id)) {
      return res.status(400).json({ message: 'You already upvoted this grievance' });
    }

    grievance.upvotesCount += 1;
    grievance.upvotedUsers.push(req.user._id);
    await grievance.save();

    res.json({ message: 'Upvoted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error upvoting grievance', error });
  }
};

export {
  submitGrievance,
  getAllGrievances,
  getTrendingGrievances,
  getLatestGrievances,
  upvoteGrievance
};
