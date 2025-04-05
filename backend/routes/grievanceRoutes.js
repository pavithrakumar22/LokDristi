import express from 'express';
import protect from '../middleware/protect.js';
import upload from '../middleware/multer.js'; // ✅ S3-configured multer

import {
  submitGrievance,
  getAllGrievances,
  getTrendingGrievances,
  getLatestGrievances,
  upvoteGrievance
} from '../controllers/grievanceController.js';

const router = express.Router();

// ✅ Use the S3 multer middleware from your config
router.post('/submit', protect, upload.single('file'), submitGrievance);
router.get('/', getAllGrievances);
router.get('/trending', getTrendingGrievances);
router.get('/latest', getLatestGrievances);
router.post('/upvote/:id', protect, upvoteGrievance);

export default router;
