/**
 * Standard API Response Utilities
 * Ensures predictable and uniform JSON structure across all endpoints.
 */

/**
 * Sends a standardized success response
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {any} data
 * @param {object} [meta] - Optional pagination or metadata
 */
function sendSuccess(res, statusCode = 200, message = 'Success', data = null, meta = undefined) {
  const payload = {
    success: true,
    message,
    data,
  };

  if (meta !== undefined) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
}

/**
 * Sends a standardized error response
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {any} [errors]
 */
function sendError(res, statusCode = 500, message = 'An error occurred', errors = null) {
  const payload = {
    success: false,
    message,
  };

  if (errors) {
    payload.errors = errors;
  }

  return res.status(statusCode).json(payload);
}

module.exports = {
  sendSuccess,
  sendError,
};
