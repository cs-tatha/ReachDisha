const { verifyAccessToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');
const prisma = require('../config/db');

/**
 * Protect middleware: Verifies JWT access token in the Authorization header
 */
async function protect(req, res, next) {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 401, 'Access denied. No authentication token provided.');
    }

    // Verify token signature and expiration
    const decoded = verifyAccessToken(token);

    // Fetch user from MySQL to ensure account still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: {
        id: true,
        userId: true,
        fullName: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return sendError(res, 401, 'Invalid session. User associated with this token no longer exists.');
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 401, 'Access token has expired. Please refresh your token.', { code: 'TOKEN_EXPIRED' });
    }
    return sendError(res, 401, 'Invalid authentication token.', { details: error.message });
  }
}

/**
 * Role authorization middleware
 * @param  {...string} roles - Allowed roles (e.g. 'admin')
 */
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, 403, `Access forbidden. Requires one of roles: [${roles.join(', ')}]`);
    }
    next();
  };
}

module.exports = {
  protect,
  authorizeRoles,
};
