
import express from 'express';
import upload from '../middleware/multer.js';
import { uploadFace } from '../controllers/faceController.js';
import { verifyFace } from '../controllers/faceVerificationController.js';

const router = express.Router();

router.post('/upload-face', upload.single('image'), uploadFace);
router.post('/verify-face',verifyFace);

export default router;
