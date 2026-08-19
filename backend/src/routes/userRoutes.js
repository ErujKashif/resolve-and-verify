const express = require('express');
const { getCrews, createCrew, deleteCrew } = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

router.get('/crews', auth, roleCheck('admin'), getCrews);
router.post('/crew', auth, roleCheck('admin'), createCrew);
router.delete('/crew/:id', auth, roleCheck('admin'), deleteCrew);

module.exports = router;