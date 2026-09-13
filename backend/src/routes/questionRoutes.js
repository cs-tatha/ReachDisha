const express = require('express');
const questionController = require('../controllers/questionController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Publicly readable for assessments
router.get('/', questionController.getQuestions);

// Admin-protected for question bank management
router.post('/', protect, authorizeRoles('admin'), questionController.addQuestion);
router.delete('/:id', protect, authorizeRoles('admin'), questionController.deleteQuestion);

module.exports = router;
