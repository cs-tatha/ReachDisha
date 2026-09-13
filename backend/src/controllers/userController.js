const userService = require('../services/userService');
const { sendSuccess } = require('../utils/response');

class UserController {
  async updateProfile(req, res, next) {
    try {
      const updatedUser = await userService.updateProfile(req.user.id, req.body);
      return sendSuccess(res, 200, 'Profile updated successfully.', updatedUser);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
