const User = require('../models/User');

// @desc    Get all crew members
// @route   GET /api/users/crews
// @access  Private (admin only)
exports.getCrews = async (req, res, next) => {
  try {
    const crews = await User.find({ role: 'crew' })
      .select('_id email name zone')
      .sort({ email: 1 });
    res.status(200).json(crews);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new crew member
// @route   POST /api/users/crew
// @access  Private (admin only)
exports.createCrew = async (req, res, next) => {
  try {
    const { email, name, zone } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const user = new User({
      email,
      role: 'crew',
      name: name || 'Crew Member',
      zone: zone || '',
    });

    await user.save();
    res.status(201).json({ message: 'Crew member created successfully', user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a crew member
// @route   DELETE /api/users/crew/:id
// @access  Private (admin only)
exports.deleteCrew = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user.userId) {
      return res.status(403).json({ message: 'Cannot delete your own account' });
    }

    await user.deleteOne();
    res.status(200).json({ message: 'Crew member deleted successfully' });
  } catch (error) {
    next(error);
  }
};