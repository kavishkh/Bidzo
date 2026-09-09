/**
 * Custom error class used across controllers so that the centralized
 * error middleware can respond with the correct status code and message.
 *
 * Usage: throw new ApiError(404, 'Auction not found');
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isApiError = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
