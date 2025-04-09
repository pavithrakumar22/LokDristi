import express from 'express';
import { signup, verifySignupOtp, login, verifyLoginOtp } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User signup with Aadhaar and phone
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aadhaarNo:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent for signup
 *       400:
 *         description: Signup failed or missing fields
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/auth/verify-signup:
 *   post:
 *     summary: Verify OTP for signup
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aadhaarNo:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup successful
 *       400:
 *         description: Invalid or expired OTP
 */
router.post('/verify-signup', verifySignupOtp);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login with Aadhaar
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aadhaarNo:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent for login
 *       400:
 *         description: Login failed or user not found
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/verify-login:
 *   post:
 *     summary: Verify OTP for login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aadhaarNo:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid or expired OTP
 */
router.post('/verify-login', verifyLoginOtp);

export default router;
