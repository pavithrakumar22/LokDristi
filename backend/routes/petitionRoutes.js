import express from 'express';
import protect from '../middleware/protect.js';
import upload from '../middleware/multer.js';

import {
  submitPetition,
  getAllPetitions,
  supportPetition
} from '../controllers/petitionController.js';

const router = express.Router();

router.post('/submit',protect, upload.array('files'), submitPetition);
router.get('/', getAllPetitions);
router.post('/support/:id', protect, supportPetition);
router.get('/test', (req, res) => {
    res.send("Petitions test route is working");
  });
  

export default router;