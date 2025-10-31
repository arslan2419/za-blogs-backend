const fs = require('fs');
const path = require('path');

const errorLogPath = path.join(__dirname, '../../error_log.txt');

const logError = async (error, context = {}) => {
  try {
    const timestamp = new Date().toISOString();
    const errorMessage = {
      timestamp,
      message: error.message || 'Unknown error',
      stack: error.stack || 'No stack trace',
      context: JSON.stringify(context, null, 2),
    };

    const logEntry = `
========================================
${errorMessage.timestamp}
========================================
Error: ${errorMessage.message}
Stack: ${errorMessage.stack}
Context: ${errorMessage.context}
========================================

`;

    // Append to error log file
    fs.appendFileSync(errorLogPath, logEntry, 'utf8');
  } catch (writeError) {
    // Fallback to console if file write fails
    console.error('Failed to write to error log file:', writeError);
    console.error('Original error:', error);
  }
};

module.exports = {
  logError,
};

