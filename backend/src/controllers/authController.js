const User = require('../models/User');
const generateOTP = require('../utils/otpGenerator');
const sendOTPEmail = require('../services/emailService');
const jwtHelper = require('../utils/jwtHelper');

// @desc    Send OTP to email
// @route   POST /api/auth/send-otp
// @access  Public
exports.sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Validate email format (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      // New user – create with default 'citizen' role
      user = new User({ email, role: 'citizen' });
    }

    // Generate OTP and expiry
    const otp = generateOTP();
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 5;
    const otpExpiry = new Date(Date.now() + expiryMinutes * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: 'OTP sent successfully. Please check your email.',
      email,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP and issue JWT
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please request OTP first.' });
    }

    // Check OTP expiry
    if (!user.otp || !user.otpExpiry || new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP expired or invalid. Please request a new one.' });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    // Clear OTP fields (one-time use)
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Generate JWT
    const token = jwtHelper.generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile (protected)
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-otp -otpExpiry');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};