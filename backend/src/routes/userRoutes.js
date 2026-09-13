const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.put('/profile', protect, userController.updateProfile);
router.patch('/profile', protect, userController.updateProfile);

module.exports = router;
