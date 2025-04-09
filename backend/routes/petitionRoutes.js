import express from 'express';
import protect from '../middleware/protect.js';
import upload from '../middleware/multer.js';

import {
  submitPetition,
  getAllPetitions,
  supportPetition
} from '../controllers/petitionController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Petitions
 *   description: Citizen petitions and support system
 */

/**
 * @swagger
 * /api/petitions:
 *   get:
 *     summary: Get all petitions
 *     tags: [Petitions]
 *     responses:
 *       200:
 *         description: List of all petitions
 */
router.get('/', getAllPetitions);

/**
 * @swagger
 * /api/petitions/submit:
 *   post:
 *     summary: Submit a petition
 *     tags: [Petitions]
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
 *                 example: "Ban Plastic Bags"
 *               description:
 *                 type: string
 *                 example: "Plastic bags are causing serious pollution in our town."
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Petition submitted successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/submit', protect, upload.array('files'), submitPetition);

/**
 * @swagger
 * /api/petitions/support/{id}:
 *   post:
 *     summary: Support a petition
 *     tags: [Petitions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Petition ID
 *     responses:
 *       200:
 *         description: Petition supported successfully
 *       404:
 *         description: Petition not found
 *       401:
 *         description: Unauthorized
 */
router.post('/support/:id', protect, supportPetition);

/**
 * @swagger
 * /api/petitions/test:
 *   get:
 *     summary: Test route for petitions
 *     tags: [Petitions]
 *     responses:
 *       200:
 *         description: Petitions test route is working
 */
router.get('/test', (req, res) => {
  res.send("Petitions test route is working");
});

export default router;
