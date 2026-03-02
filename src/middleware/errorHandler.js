const logger = require('../logger');

const errorHandler = (err, req, res, next) => {
  logger.error('Unexpected error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  return res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};

module.exports = errorHandler;
