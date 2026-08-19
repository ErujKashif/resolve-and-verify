/**
 * Global error handling middleware.
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.stack || err.message);

  // Mongoose duplicate key error (e.g., unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({ message: `${field} already exists` });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: 'Validation error', errors });
  }

  // Default to 500
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;