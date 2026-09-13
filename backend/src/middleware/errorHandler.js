const { sendError } = require('../utils/response');

/**
 * Global centralized error handling middleware
 */
function errorHandler(err, req, res, next) {
  if (!err.statusCode || err.statusCode >= 500) {
    console.error('[Unhandled Server Error]:', err);
  }

  // Handle Prisma unique constraint violations (P2002)
  if (err.code === 'P2002') {
    const target = String(err.meta?.target || '');
    let friendlyMessage = 'An account with these details already exists. Please login instead.';
    if (target.includes('phone') || target.includes('mobile')) {
      friendlyMessage = 'An account with this mobile number is already registered. Please login.';
    }
    return sendError(res, 409, friendlyMessage, {
      code: err.code,
      target,
    });
  }

  // Handle SyntaxError (e.g. malformed JSON in req.body)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendError(res, 400, 'Malformed JSON payload provided in request body.');
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, statusCode, message, process.env.NODE_ENV === 'development' ? { stack: err.stack } : undefined);
}

module.exports = errorHandler;
