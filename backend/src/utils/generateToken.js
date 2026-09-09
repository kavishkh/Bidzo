const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT containing the user's id and role.
 * Keeping the payload minimal (id + role) means the token stays small
 * and we always re-fetch fresh user data from the DB when needed.
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

module.exports = generateToken;
