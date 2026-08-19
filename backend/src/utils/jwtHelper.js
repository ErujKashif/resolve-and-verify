const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY_DAYS = parseInt(process.env.JWT_EXPIRY_DAYS) || 7;

/**
 * Generates a JWT token for a user.
 * @param {Object} payload - { userId, email, role }
 * @returns {string} JWT token
 */
exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRY_DAYS}d`,
  });
};

/**
 * Verifies a JWT token.
 * @param {string} token
 * @returns {Object} decoded payload
 * @throws {JsonWebTokenError} if invalid
 */
exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};