const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'fallback_access_secret_key_change_in_prod';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_key_change_in_prod';
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * Generates both short-lived Access Token and long-lived Refresh Token
 * @param {object} user - User record (must have id, userId, role, phone)
 */
function generateTokens(user) {
  const payload = {
    sub: user.id,
    userId: user.userId,
    phone: user.phone,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES,
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES,
  });

  return { accessToken, refreshToken };
}

/**
 * Verifies and decodes an Access Token
 * @param {string} token
 */
function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

/**
 * Verifies and decodes a Refresh Token
 * @param {string} token
 */
function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

module.exports = {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
};
