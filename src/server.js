const app = require('./app');
const { initDb } = require('./database/db');
const logger = require('./logger');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initDb();

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
};

startServer();
