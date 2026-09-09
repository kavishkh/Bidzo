const ApiError = require('../utils/ApiError');

/**
 * Must be used AFTER `protect`, since it relies on req.user being set.
 * Only allows the request through if the authenticated user is an admin.
 */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    throw new ApiError(403, 'Not authorized, admin access required');
  }
  next();
};

module.exports = { isAdmin };
