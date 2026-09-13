const prisma = require('../config/db');
const authService = require('./authService');

class UserService {
  /**
   * Updates an authenticated user's profile details
   */
  async updateProfile(userId, data) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const err = new Error('User record not found.');
      err.statusCode = 404;
      throw err;
    }

    // Recalculate age if date of birth is updated
    let calculatedAge = data.age;
    if (data.dob) {
      const birth = new Date(data.dob);
      if (!isNaN(birth.getTime())) {
        const today = new Date();
        let years = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          years--;
        }
        if (years >= 0) {
          calculatedAge = String(years);
        }
      }
    }

    const cleanFullName = data.fullName !== undefined
      ? String(data.fullName).trim()
      : [data.firstName, data.middleName, data.lastName].filter(Boolean).join(' ').trim() || undefined;

    const phone = data.mobile || data.phone || undefined;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(cleanFullName ? { fullName: cleanFullName } : {}),
        ...(data.firstName !== undefined ? { firstName: data.firstName } : {}),
        ...(data.middleName !== undefined ? { middleName: data.middleName } : {}),
        ...(data.lastName !== undefined ? { lastName: data.lastName } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(data.dob !== undefined ? { dob: data.dob } : {}),
        ...(calculatedAge !== undefined ? { age: String(calculatedAge) } : {}),
        ...(data.fatherName !== undefined ? { fatherName: data.fatherName } : {}),
        ...(data.motherName !== undefined ? { motherName: data.motherName } : {}),
        ...(data.state !== undefined ? { state: data.state } : {}),
        ...(data.city !== undefined ? { city: data.city } : {}),
        ...(data.pincode !== undefined ? { pincode: data.pincode } : {}),
        ...(data.address !== undefined ? { address: data.address } : {}),
        ...(data.education !== undefined ? { education: data.education } : {}),
        ...(data.avatar !== undefined ? { avatar: data.avatar } : {}),
      },
    });

    return authService._formatUserResponse(updatedUser);
  }
}

module.exports = new UserService();
