const recommendationEngine = require('../services/recommendationEngine');
const { sendSuccess, sendError } = require('../utils/response');
const prisma = require('../config/db');

class AssessmentController {
  /**
   * Evaluates user responses, computes top 3 skill domains, matches careers, and saves to database
   */
  async submitAssessment(req, res, next) {
    try {
      const { answers } = req.body;

      if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
        return sendError(res, 400, 'Invalid assessment submission. Answers map is required.');
      }

      // Calculate recommendations via pure business logic engine
      const results = recommendationEngine.calculateRecommendation(answers);

      // If user is authenticated, save result to MySQL
      let savedRecord = null;
      if (req.user?.userId) {
        savedRecord = await prisma.assessmentResult.create({
          data: {
            userId: req.user.userId,
            answers,
            traitScores: results.normalizedTraits,
            topSkillDomains: results.topSkillDomains,
            recommendedCareers: results.recommendedCareers,
            strengths: results.topStrengths,
            skillGaps: results.skillGaps,
          },
        });
      }

      return sendSuccess(res, 200, 'Assessment evaluated successfully.', {
        ...results,
        submissionId: savedRecord?.id || null,
      });
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
