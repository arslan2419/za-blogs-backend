const errorLogger = require('../utills/errorLogger');

const errorHandler = async (err, req, res, next) => {
  await errorLogger.logError(err, {
    body: req.body,
    params: req.params,
    query: req.query,
    method: req.method,
    url: req.url,
    headers: req.headers,
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;

