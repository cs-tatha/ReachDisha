const adminService = require('../services/adminService');
const { sendSuccess } = require('../utils/response');

class AdminController {
  async getStudents(req, res, next) {
    try {
      const { page, limit, search } = req.query;
      const { students, pagination } = await adminService.getPaginatedStudents({
        page,
        limit,
        search,
      });

      return sendSuccess(res, 200, 'Students retrieved successfully.', students, pagination);
    } catch (error) {
      next(error);
    }
  }

  async getStudentAssessmentReport(req, res, next) {
    try {
      const { userId } = req.params;
      const data = await adminService.getStudentAssessmentReport(userId);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: `Student not found with ID ${userId}`,
        });
      }

      return sendSuccess(res, 200, 'Student assessment report retrieved successfully.', data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
