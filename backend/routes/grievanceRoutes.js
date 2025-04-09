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

/**
 * @swagger
 * tags:
 *   name: Grievances
 *   description: Citizen grievance system
 */

/**
 * @swagger
 * /api/grievances:
 *   get:
 *     summary: Get all grievances
 *     tags: [Grievances]
 *     responses:
 *       200:
 *         description: List of all grievances
 */
router.get('/', getAllGrievances);

/**
 * @swagger
 * /api/grievances/trending:
 *   get:
 *     summary: Get trending grievances
 *     tags: [Grievances]
 *     responses:
 *       200:
 *         description: List of trending grievances
 */
router.get('/trending', getTrendingGrievances);

/**
 * @swagger
 * /api/grievances/latest:
 *   get:
 *     summary: Get latest grievances
 *     tags: [Grievances]
 *     responses:
 *       200:
 *         description: List of latest grievances
 */
router.get('/latest', getLatestGrievances);

/**
 * @swagger
 * /api/grievances/submit:
 *   post:
 *     summary: Submit a grievance
 *     tags: [Grievances]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Broken Streetlight"
 *               description:
 *                 type: string
 *                 example: "The streetlight near my home is not working."
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Grievance submitted successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/submit', protect, upload.single('file'), submitGrievance);

/**
 * @swagger
 * /api/grievances/upvote/{id}:
 *   post:
 *     summary: Upvote a grievance
 *     tags: [Grievances]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Grievance ID
 *     responses:
 *       200:
 *         description: Grievance upvoted successfully
 *       404:
 *         description: Grievance not found
 *       401:
 *         description: Unauthorized
 */
router.post('/upvote/:id', protect, upvoteGrievance);

export default router;
