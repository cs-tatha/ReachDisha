const bcrypt = require('bcryptjs');
const prisma = require('../config/db');
const { generateTokens, verifyRefreshToken } = require('../utils/jwt');

class AuthService {
  /**
   * Registers a new user/student account with hashed password
   */
  async register(data) {
    const cleanPhone = String(data.mobile || data.phone || '').trim();
    const cleanPass = String(data.password || '').trim();
    const cleanFullName = String(
      data.fullName ||
      [data.firstName, data.middleName, data.lastName].filter(Boolean).join(' ')
    ).trim();

    // Students register with their 10-digit Indian Mobile Number
    if (!cleanPhone) {
      const err = new Error('Mobile number is required for student registration.');
      err.statusCode = 400;
      throw err;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      const err = new Error('Please enter a valid 10-digit Indian mobile number.');
      err.statusCode = 400;
      throw err;
    }

    if (!cleanPass || cleanPass.length < 6) {
      const err = new Error('Password must be at least 6 characters long.');
      err.statusCode = 400;
      throw err;
    }

    // Check for existing user by phone number
    const existingUser = await prisma.user.findUnique({
      where: { phone: cleanPhone },
    });

    if (existingUser) {
      const err = new Error('An account with this mobile number is already registered. Please login.');
      err.statusCode = 409;
      throw err;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(cleanPass, saltRounds);

    // Unique user identifier
    const uniqueUserId = `u-student-${Date.now()}`;

    // Create user in MySQL
    const newUser = await prisma.user.create({
      data: {
        userId: uniqueUserId,
        fullName: cleanFullName || 'Student Candidate',
        firstName: data.firstName || '',
        middleName: data.middleName || '',
        lastName: data.lastName || '',
        phone: cleanPhone,
        password: hashedPassword,
        role: 'student',
        dob: data.dob || '',
        age: data.age ? String(data.age) : '',
        fatherName: [data.fatherFirstName, data.fatherMiddleName, data.fatherLastName].filter(Boolean).join(' ') || data.fatherName || '',
        motherName: [data.motherFirstName, data.motherMiddleName, data.motherLastName].filter(Boolean).join(' ') || data.motherName || '',
        state: data.state || '',
        city: data.city || '',
        pincode: data.pincode || '',
        address: data.address || '',
        education: data.education || 'Student',
      },
    });

    // Generate JWT access & refresh tokens
    const tokens = generateTokens(newUser);

    // Store refresh token in database
    await prisma.user.update({
      where: { id: newUser.id },
      data: { refreshToken: tokens.refreshToken },
    });

    // Format safe user session (strip sensitive password hash)
    const safeUser = this._formatUserResponse(newUser);

    return {
      user: safeUser,
      tokens,
    };
  }

  /**
   * Authenticates a student using mobile number or user ID
   */
  async studentLogin({ identifier, mobile, phone, password }) {
    const cleanId = String(identifier || mobile || phone || '').trim();
    const cleanPass = String(password || '').trim();

    if (!cleanId || !cleanPass) {
      const err = new Error('Please provide both mobile number and password.');
      err.statusCode = 400;
      throw err;
    }

    // Find student in MySQL by phone or userId
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [
              { phone: cleanId },
              { userId: cleanId },
            ],
          },
          { role: 'student' },
        ],
      },
    });

    if (!user) {
      const err = new Error('No student account found with this mobile number. Please register first.');
      err.statusCode = 404;
      throw err;
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(cleanPass, user.password);
    if (!isMatch) {
      const err = new Error('Incorrect password. Please try again.');
      err.statusCode = 401;
      throw err;
    }

    // Issue new tokens
    const tokens = generateTokens(user);

    // Update active refresh token in MySQL
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: this._formatUserResponse(user),
      tokens,
    };
  }

  /**
   * Authenticates an administrator using mobile number or admin ID
   */
  async adminLogin({ identifier, phone, mobile, password }) {
    const cleanId = String(identifier || phone || mobile || '').trim();
    const cleanPass = String(password || '').trim();

    if (!cleanId || !cleanPass) {
      const err = new Error('Please provide administrator mobile number and password.');
      err.statusCode = 400;
      throw err;
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: cleanId },
          { userId: cleanId },
        ],
      },
    });

    if (!user) {
      const err = new Error('Invalid administrator credentials.');
      err.statusCode = 404;
      throw err;
    }

    if (user.role !== 'admin') {
      const err = new Error('This account does not possess administrative privileges.');
      err.statusCode = 403;
      throw err;
    }

    const isMatch = await bcrypt.compare(cleanPass, user.password);
    if (!isMatch) {
      const err = new Error('Incorrect administrator password.');
      err.statusCode = 401;
      throw err;
    }

    const tokens = generateTokens(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: this._formatUserResponse(user),
      tokens,
    };
  }

  /**
   * Refreshes access token using a valid refresh token
   */
  async refreshToken(providedRefreshToken) {
    if (!providedRefreshToken) {
      const err = new Error('Refresh token is required.');
      err.statusCode = 400;
      throw err;
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(providedRefreshToken);
    } catch {
      const err = new Error('Invalid or expired refresh token. Please log in again.');
      err.statusCode = 401;
      throw err;
    }

    // Verify token matches current stored refresh token in DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
    });

    if (!user || user.refreshToken !== providedRefreshToken) {
      const err = new Error('Refresh token has been revoked or is invalid. Please log in again.');
      err.statusCode = 401;
      throw err;
    }

    // Issue fresh access & refresh tokens
    const tokens = generateTokens(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      tokens,
      user: this._formatUserResponse(user),
    };
  }

  /**
   * Logs out user by revoking the refresh token in the database
   */
  async logout(userId) {
    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
    }
    return { success: true };
  }

  /**
   * Gets current authenticated user data
   */
  async getMe(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const err = new Error('User not found.');
      err.statusCode = 404;
      throw err;
    }

    return this._formatUserResponse(user);
  }

  /**
   * Strips password and internal fields before sending response
   */
  _formatUserResponse(user) {
    return {
      id: user.userId || `u-student-${user.id}`,
      dbId: user.id,
      fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      firstName: user.firstName || '',
      middleName: user.middleName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      mobile: user.phone || '',
      dob: user.dob || '',
      age: user.age || '',
      fatherName: user.fatherName || '',
      motherName: user.motherName || '',
      state: user.state || '',
      city: user.city || '',
      pincode: user.pincode || '',
      address: user.address || '',
      education: user.education || 'Student',
      role: user.role,
      avatar: user.avatar || '',
      createdAt: user.createdAt,
    };
  }
}

module.exports = new AuthService();
