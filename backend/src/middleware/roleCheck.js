/**
 * Middleware to restrict access based on user role.
 * @param {...string} allowedRoles - List of roles allowed.
 * @returns {Function} Express middleware
 */
const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
};

module.exports = roleCheck;