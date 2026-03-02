const express = require('express');
const toolLogsRoutes = require('./routes/toolLogsRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(toolLogsRoutes);
app.use(errorHandler);

module.exports = app;
