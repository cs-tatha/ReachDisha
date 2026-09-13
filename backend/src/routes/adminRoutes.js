const express = require('express');
const adminController = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/students', adminController.getStudents);
router.get('/students/:userId/assessment-report', adminController.getStudentAssessmentReport);

module.exports = router;
