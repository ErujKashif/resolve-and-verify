const express = require('express');
const authRoutes = require('./authRoutes');
const complaintRoutes = require('./complaintRoutes');
const userRoutes = require('./userRoutes'); 

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/complaints', complaintRoutes);
router.use('/users', userRoutes);       

module.exports = router;