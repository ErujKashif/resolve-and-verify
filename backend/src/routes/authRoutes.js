const express = require('express');
const { sendOTP, verifyOTP, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Protected route (example)
router.get('/me', auth, getMe);

module.exports = router;