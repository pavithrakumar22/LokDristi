import express from 'express';
import { signup, verifySignupOtp, login, verifyLoginOtp } from '../controllers/authController.js';

const router = express.Router();
router.post('/signup', signup);
router.post('/verify-signup', verifySignupOtp);
router.post('/login', login);
router.post('/verify-login', verifyLoginOtp);

export default router;

// backend/middleware/validation.js
const validateSignup = (req, res, next) => {
  const { aadhaarNo, phone, pincode } = req.body;
  if (!aadhaarNo || !phone || !pincode) return res.status(400).json({ message: 'All fields are required' });
  next();
};
export { validateSignup };
