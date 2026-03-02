const { db } = require('../database/db');
const logger = require('../logger');

const runInsert = (query, params) => new Promise((resolve, reject) => {
  db.run(query, params, function onRun(err) {
    if (err) {
      reject(err);
      return;
    }

    resolve(this.lastID);
  });
});

const createToolLog = async (req, res, next) => {
  try {
    const { user_id, tool_name, tool_input, tool_output, status_code, timestamp } = req.body;

    const insertQuery = `
      INSERT INTO tool_logs (user_id, tool_name, tool_input, tool_output, status_code, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const insertedId = await runInsert(insertQuery, [
      user_id,
      tool_name,
      tool_input,
      JSON.stringify(tool_output),
      status_code,
      timestamp
    ]);

    logger.info('Tool log inserted successfully', {
      id: insertedId,
      user_id,
      tool_name,
      status_code
    });

    return res.status(201).json({
      success: true,
      message: 'Tool call logged successfully',
      data: {
        id: insertedId
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createToolLog
};
