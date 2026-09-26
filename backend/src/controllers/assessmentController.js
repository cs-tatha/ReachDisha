const recommendationEngine = require('../services/recommendationEngine');
const { sendSuccess, sendError } = require('../utils/response');
const prisma = require('../config/db');

class AssessmentController {
  /**
   * Evaluates user responses, computes top 3 skill domains, matches careers, and saves to database
   */
  async submitAssessment(req, res, next) {
    try {
      const { answers, userId } = req.body;

      if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
        return sendError(res, 400, 'Invalid assessment submission. Answers map is required.');
      }

      // Calculate recommendations via pure business logic engine
      const results = recommendationEngine.calculateRecommendation(answers);

      // Determine target candidate userId:
      // Priority 1: If authenticated user is a student, use req.user.userId
      // Priority 2: If body provides a userId, look up that user
      // Priority 3: Fallback to req.user.userId if present
      let targetUserId = null;
      if (req.user?.role === 'student' && req.user?.userId) {
        targetUserId = req.user.userId;
      } else if (userId) {
        const cleanId = String(userId).trim();
        const candidate = await prisma.user.findFirst({
          where: {
            OR: [
              { userId: cleanId },
              { phone: cleanId },
            ],
          },
          select: { userId: true, role: true },
        });
        if (candidate) {
          targetUserId = candidate.userId;
        }
      } else if (req.user?.userId) {
        targetUserId = req.user.userId;
      }

      // Save result to MySQL if target student found
      let savedRecord = null;
      if (targetUserId) {
        savedRecord = await prisma.assessmentResult.create({
          data: {
            userId: targetUserId,
            answers,
            traitScores: results.normalizedTraits,
            topSkillDomains: results.topSkillDomains,
            recommendedCareers: results.recommendedCareers,
            strengths: results.topStrengths,
            skillGaps: results.skillGaps,
          },
        });

        // Also update assessmentProgress to Completed
        try {
          await prisma.user.update({
            where: { userId: targetUserId },
            data: {
              assessmentProgress: {
                answers,
                isStarted: true,
                isCompleted: true,
                answeredCount: 45,
                totalQuestions: 45,
                percentage: 100,
                status: 'Completed',
                updatedAt: new Date().toISOString(),
              },
            },
          });
        } catch (updateErr) {
          console.warn('[AssessmentController] Could not update user assessmentProgress:', updateErr.message);
        }
      }

      return sendSuccess(res, 200, 'Assessment evaluated successfully.', {
        ...results,
        submissionId: savedRecord?.id || null,
        saved: Boolean(savedRecord),
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Saves or synchronizes candidate's in-progress assessment responses to MySQL
   */
  async saveProgress(req, res, next) {
    try {
      const { answers, currentIndex, skippedIds, markedIds, isStarted, isCompleted, totalQuestions, userId } = req.body;

      let targetUserId = null;
      if (req.user?.role === 'student' && req.user?.userId) {
        targetUserId = req.user.userId;
      } else if (userId) {
        const cleanId = String(userId).trim();
        const candidate = await prisma.user.findFirst({
          where: {
            OR: [
              { userId: cleanId },
              { phone: cleanId },
            ],
          },
          select: { userId: true },
        });
        if (candidate) targetUserId = candidate.userId;
      } else if (req.user?.userId) {
        targetUserId = req.user.userId;
      }

      if (!targetUserId) {
        return sendError(res, 400, 'Cannot save progress: student account not found or unauthenticated.');
      }

      const answersMap = (answers && typeof answers === 'object') ? answers : {};
      const answeredCount = Object.keys(answersMap).length;
      const total = totalQuestions || 45;
      const percentage = isCompleted ? 100 : Math.min(100, Math.round((answeredCount / total) * 100));
      const status = isCompleted ? 'Completed' : (answeredCount > 0 ? 'In Progress' : 'Not Started');

      const progressData = {
        answers: answersMap,
        currentIndex: currentIndex || 0,
        skippedIds: Array.isArray(skippedIds) ? skippedIds : [],
        markedIds: Array.isArray(markedIds) ? markedIds : [],
        isStarted: Boolean(isStarted || answeredCount > 0),
        isCompleted: Boolean(isCompleted),
        answeredCount,
        totalQuestions: total,
        percentage,
        status,
        updatedAt: new Date().toISOString(),
      };

      await prisma.user.update({
        where: { userId: targetUserId },
        data: {
          assessmentProgress: progressData,
        },
      });

      return sendSuccess(res, 200, 'Progress synchronized with database.', progressData);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Resets candidate's assessment: deletes all AssessmentResult records and clears assessmentProgress in MySQL
   */
  async resetAssessment(req, res, next) {
    try {
      const { userId } = req.body;

      let targetUserId = null;
      if (req.user?.role === 'student' && req.user?.userId) {
        targetUserId = req.user.userId;
      } else if (userId) {
        const cleanId = String(userId).trim();
        const candidate = await prisma.user.findFirst({
          where: {
            OR: [
              { userId: cleanId },
              { phone: cleanId },
            ],
          },
          select: { userId: true },
        });
        if (candidate) targetUserId = candidate.userId;
      } else if (req.user?.userId) {
        targetUserId = req.user.userId;
      }

      if (!targetUserId) {
        return sendError(res, 400, 'Cannot reset assessment: candidate identification is required.');
      }

      // Delete all previous assessment results from MySQL database
      await prisma.assessmentResult.deleteMany({
        where: { userId: targetUserId },
      });

      // Increment retakeCount and initialize fresh assessment progress
      const existingUser = await prisma.user.findUnique({
        where: { userId: targetUserId },
        select: { id: true, retakeCount: true },
      });

      let updatedRetakeCount = 1;
      if (existingUser) {
        updatedRetakeCount = (existingUser.retakeCount || 0) + 1;
        await prisma.user.update({
          where: { userId: targetUserId },
          data: {
            retakeCount: updatedRetakeCount,
            assessmentProgress: {
              isStarted: true,
              isCompleted: false,
              currentIndex: 0,
              answers: {},
              answeredCount: 0,
              totalQuestions: 66,
              retakeCount: updatedRetakeCount,
              updatedAt: new Date().toISOString(),
            },
          },
        });
      }

      return sendSuccess(res, 200, 'Assessment data successfully reset.', {
        userId: targetUserId,
        retakeCount: updatedRetakeCount,
        reset: true,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves saved in-progress responses for the candidate
   */
  async getProgress(req, res, next) {
    try {
      const targetUserId = req.user?.userId || req.query.userId;
      if (!targetUserId) {
        return sendError(res, 400, 'User ID is required to fetch assessment progress.');
      }

      const cleanId = String(targetUserId).trim();
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { userId: cleanId },
            { phone: cleanId },
          ],
        },
        select: { assessmentProgress: true },
      });

      return sendSuccess(res, 200, 'Progress retrieved.', user?.assessmentProgress || null);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves the latest assessment evaluation for the authenticated candidate
   */
  async getLatestResult(req, res, next) {
    try {
      if (!req.user?.userId) {
        return sendError(res, 401, 'Authentication required to view assessment history.');
      }

      const latest = await prisma.assessmentResult.findFirst({
        where: { userId: req.user.userId },
        orderBy: { createdAt: 'desc' },
      });

      if (!latest) {
        return sendSuccess(res, 200, 'No previous assessment found.', null);
      }

      return sendSuccess(res, 200, 'Latest assessment result fetched.', {
        topSkillDomains: latest.topSkillDomains,
        recommendedCareers: latest.recommendedCareers,
        topStrengths: latest.strengths,
        skillGaps: latest.skillGaps,
        evaluatedAt: latest.createdAt,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AssessmentController();
