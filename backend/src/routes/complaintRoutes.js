const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const complaintController = require('../controllers/complaintController');

// ========== PUBLIC (authenticated) ==========
// All complaint routes require authentication

// Citizen routes
router.post('/', auth, roleCheck('citizen'), complaintController.createComplaint);
router.get('/my', auth, roleCheck('citizen'), complaintController.getMyComplaints);

// Crew routes
router.get('/assigned', auth, roleCheck('crew'), complaintController.getAssignedComplaints);
router.put('/:id/resolve', auth, roleCheck('crew'), complaintController.resolveComplaint);

// Admin routes
router.get('/all', auth, roleCheck('admin'), complaintController.getAllComplaints);
router.put('/:id/assign', auth, roleCheck('admin'), complaintController.assignComplaint);

// Citizen verification (after resolution)
router.put('/:id/verify', auth, roleCheck('citizen'), complaintController.verifyComplaint);

// Officer routes
router.get('/escalated', auth, roleCheck('officer'), complaintController.getEscalatedComplaints);
router.post('/:id/penalty', auth, roleCheck('officer'), complaintController.recordPenalty);

// Common (any authenticated, but with authorization check inside)
router.get('/:id', auth, complaintController.getComplaintById);

module.exports = router;