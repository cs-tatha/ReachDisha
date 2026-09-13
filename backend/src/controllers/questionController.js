const questionService = require('../services/questionService');
const { sendSuccess } = require('../utils/response');

class QuestionController {
  async getQuestions(req, res, next) {
    try {
      const { section, category } = req.query;
      const questions = await questionService.getQuestions({
        sectionId: section,
        category,
      });

      return sendSuccess(res, 200, 'Questions fetched successfully.', questions);
    } catch (error) {
      next(error);
    }
  }

  async addQuestion(req, res, next) {
    try {
      const question = await questionService.addQuestion(req.body);
      return sendSuccess(res, 201, 'Question added successfully.', question);
    } catch (error) {
      next(error);
    }
  }

  async deleteQuestion(req, res, next) {
    try {
      const { id } = req.params;
      await questionService.deleteQuestion(id);
      return sendSuccess(res, 200, 'Question deleted successfully.');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QuestionController();
