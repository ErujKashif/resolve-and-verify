const Complaint = require('../models/Complaint');
const User = require('../models/User');

// ========== CITIZEN ==========

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private (citizen)
exports.createComplaint = async (req, res, next) => {
  try {
    const { address, location, beforePhoto } = req.body;
    const citizenId = req.user.userId;

    // Validate required fields
    if (!address || !location || !location.coordinates || !beforePhoto) {
      return res.status(400).json({ message: 'Missing required fields: address, location (with coordinates), beforePhoto' });
    }

    const complaint = new Complaint({
      citizen: citizenId,
      address,
      location: {
        type: 'Point',
        coordinates: location.coordinates, // [lng, lat]
      },
      beforePhoto,
    });

    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully', complaint });
  } catch (error) {
    next(error);
  }
};

// @desc    Get complaints for logged-in citizen
// @route   GET /api/complaints/my
// @access  Private (citizen)
exports.getMyComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({ citizen: req.user.userId })
      .sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

// ========== CREW ==========

// @desc    Get assigned complaints for crew
// @route   GET /api/complaints/assigned
// @access  Private (crew)
exports.getAssignedComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({
      assignedTo: req.user.userId,
      status: 'Assigned', // or 'Open'? We'll use 'Assigned'
    }).sort({ createdAt: 1 }); // oldest first for route planning
    res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark complaint as resolved (crew)
// @route   PUT /api/complaints/:id/resolve
// @access  Private (crew)
exports.resolveComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { afterPhoto } = req.body;

    if (!afterPhoto) {
      return res.status(400).json({ message: 'After photo is required' });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Ensure crew is assigned to this complaint
    if (complaint.assignedTo.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not assigned to this complaint' });
    }

    // Only allow if status is 'Assigned' or 'Open' (if we skip assign step)
    if (complaint.status !== 'Assigned' && complaint.status !== 'Open') {
      return res.status(400).json({ message: 'Complaint cannot be resolved in current status' });
    }

    complaint.status = 'Resolved';
    complaint.afterPhoto = afterPhoto;
    complaint.resolvedAt = new Date();
    complaint.verifiedByCitizen = null; // reset verification
    await complaint.save();

    // TODO: Trigger push notification to citizen

    res.status(200).json({ message: 'Complaint marked as resolved', complaint });
  } catch (error) {
    next(error);
  }
};

// ========== ADMIN ==========

// @desc    Get all complaints (admin)
// @route   GET /api/complaints/all
// @access  Private (admin)
exports.getAllComplaints = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const complaints = await Complaint.find(filter)
      .populate('citizen', 'email')
      .populate('assignedTo', 'email')
      .sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

// @desc    Assign complaint to a crew member
// @route   PUT /api/complaints/:id/assign
// @access  Private (admin)
exports.assignComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { crewId } = req.body;

    if (!crewId) {
      return res.status(400).json({ message: 'crewId is required' });
    }

    // Verify crew exists and has role 'crew'
    const crew = await User.findOne({ _id: crewId, role: 'crew' });
    if (!crew) {
      return res.status(404).json({ message: 'Crew member not found' });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.assignedTo = crewId;
    complaint.status = 'Assigned';
    await complaint.save();

    res.status(200).json({ message: 'Complaint assigned successfully', complaint });
  } catch (error) {
    next(error);
  }
};

// ========== CITIZEN VERIFICATION ==========

// @desc    Citizen verifies resolution (Yes/No)
// @route   PUT /api/complaints/:id/verify
// @access  Private (citizen)
exports.verifyComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { resolved } = req.body; // true = yes, false = no

    if (resolved === undefined || typeof resolved !== 'boolean') {
      return res.status(400).json({ message: 'resolved must be true or false' });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Ensure citizen owns this complaint
    if (complaint.citizen.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not your complaint' });
    }

    // Only if status is 'Resolved' and not yet verified
    if (complaint.status !== 'Resolved') {
      return res.status(400).json({ message: 'Complaint is not in resolved state' });
    }
    if (complaint.verifiedByCitizen !== null) {
      return res.status(400).json({ message: 'Already verified' });
    }

    complaint.verifiedByCitizen = resolved;

    if (resolved === true) {
      // Close complaint
      complaint.status = 'Closed';
    } else {
      // Reopen & escalate
      complaint.status = 'Reopened';
      complaint.escalatedAt = new Date();
      // Optionally, auto-escalate to 'Escalated' or keep as Reopened
      // We'll change to 'Escalated' to show on officer dashboard
      complaint.status = 'Escalated';
    }
    await complaint.save();

    res.status(200).json({ message: 'Verification recorded', complaint });
  } catch (error) {
    next(error);
  }
};

// ========== SENIOR OFFICER ==========

// @desc    Get escalated complaints
// @route   GET /api/complaints/escalated
// @access  Private (officer)
exports.getEscalatedComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({ status: 'Escalated' })
      .populate('citizen', 'email')
      .populate('assignedTo', 'email')
      .sort({ escalatedAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

// @desc    Record penalty against contractor
// @route   POST /api/complaints/:id/penalty
// @access  Private (officer)
exports.recordPenalty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Valid penalty amount is required' });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Must be escalated
    if (complaint.status !== 'Escalated') {
      return res.status(400).json({ message: 'Complaint is not escalated' });
    }

    complaint.penaltyAmount = amount;
    complaint.penaltyRecordedBy = req.user.userId;
    // Optionally mark as finalized (e.g., status = 'Closed' after penalty)
    complaint.status = 'Closed'; // or keep Escalated with penalty
    await complaint.save();

    res.status(200).json({ message: 'Penalty recorded successfully', complaint });
  } catch (error) {
    next(error);
  }
};

// ========== UTILITY ==========

// @desc    Get single complaint (for any role, with authorization)
// @route   GET /api/complaints/:id
// @access  Private (all authenticated)
exports.getComplaintById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const complaint = await Complaint.findById(id)
      .populate('citizen', 'email')
      .populate('assignedTo', 'email');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Authorization: citizen can see own; crew/admin/officer can see if assigned or all
    const userId = req.user.userId;
    const role = req.user.role;

    if (role === 'citizen' && complaint.citizen.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    // Crew can see only if assigned
    if (role === 'crew' && complaint.assignedTo?.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    // Admin and officer can see all

    res.status(200).json(complaint);
  } catch (error) {
    next(error);
  }
};