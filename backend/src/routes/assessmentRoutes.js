const express = require('express');
const assessmentController = require('../controllers/assessmentController');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');
const { verifyAccessToken } = require('../utils/jwt');
const prisma = require('../config/db');

const router = express.Router();

/**
 * Resilient authentication: Attaches user if valid Bearer token provided;
 * If token expired during test, gracefully decodes sub to preserve student identity
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
      // Graceful fallback for expired token during long assessment session
      try {
        const decoded = jwt.decode(token);
        if (decoded && decoded.sub) {
          const user = await prisma.user.findUnique({
            where: { id: decoded.sub },
            select: { id: true, userId: true, role: true },
          });
          if (user) req.user = user;
        }
      } catch {
        // Continue as guest
      }
    }
  }
  next();
}

router.post('/progress', optionalAuth, assessmentController.saveProgress);
router.get('/progress', optionalAuth, assessmentController.getProgress);
router.post('/submit', optionalAuth, assessmentController.submitAssessment);
router.get('/latest', protect, assessmentController.getLatestResult);

module.exports = router;
