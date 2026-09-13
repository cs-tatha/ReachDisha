const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      return sendSuccess(res, 201, 'Account successfully created.', result);
    } catch (error) {
      next(error);
    }
  }

  async studentLogin(req, res, next) {
    try {
      const result = await authService.studentLogin(req.body);
      return sendSuccess(res, 200, 'Student login successful.', result);
    } catch (error) {
      next(error);
    }
  }

  async adminLogin(req, res, next) {
    try {
      const result = await authService.adminLogin(req.body);
      return sendSuccess(res, 200, 'Administrator login successful.', result);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const token = req.body.refreshToken || req.headers['x-refresh-token'];
      const result = await authService.refreshToken(token);
      return sendSuccess(res, 200, 'Token refreshed successfully.', result);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const userId = req.user?.id;
      await authService.logout(userId);
      return sendSuccess(res, 200, 'Logged out successfully.');
    } catch (error) {
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const user = await authService.getMe(req.user.id);
      return sendSuccess(res, 200, 'User profile fetched successfully.', user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
