const logger = require('../logger');

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const validateToolLog = (req, res, next) => {
  const { tool_name, tool_output, status_code } = req.body;

  if (!(status_code === 200 || status_code >= 400)) {
    const error = 'status_code must be exactly 200 or greater than or equal to 400';
    logger.warn('Validation failure', { error, body: req.body });
    return res.status(400).json({ success: false, error });
  }

  if (!isNonEmptyString(tool_name)) {
    const error = 'tool_name must be a non-empty string';
    logger.warn('Validation failure', { error, body: req.body });
    return res.status(400).json({ success: false, error });
  }

  if (typeof tool_output !== 'object' || tool_output === null || Array.isArray(tool_output)) {
    const error = 'tool_output must be an object';
    logger.warn('Validation failure', { error, body: req.body });
    return res.status(400).json({ success: false, error });
  }

  if (!Object.prototype.hasOwnProperty.call(tool_output, 'summary')) {
    const error = 'tool_output must contain a summary field';
    logger.warn('Validation failure', { error, body: req.body });
    return res.status(400).json({ success: false, error });
  }

  return next();
};

module.exports = validateToolLog;
