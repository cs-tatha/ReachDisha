const express = require('express');
const assessmentController = require('../controllers/assessmentController');
const { protect } = require('../middleware/auth');
const { verifyAccessToken } = require('../utils/jwt');
const prisma = require('../config/db');

const router = express.Router();

/**
 * Optional authentication: Attaches user if valid Bearer token provided, but doesn't block guest evaluation
 */
async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyAccessToken(token);
      const user = await prisma.user.findUnique({
        where: { id: decoded.sub },
        select: { id: true, userId: true, role: true },
      });
      if (user) req.user = user;
    } catch {
      // Continue as guest if token invalid
    }
  }
  next();
}

router.post('/submit', optionalAuth, assessmentController.submitAssessment);
router.get('/latest', protect, assessmentController.getLatestResult);

module.exports = router;
