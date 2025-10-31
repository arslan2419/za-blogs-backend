const Data = require('../models/Data');
const errorLogger = require('../utills/errorLogger');

const createData = async (req, res) => {
  try {
    const bodyData = req.body;

    if (!bodyData || Object.keys(bodyData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Request body is empty',
      });
    }

    const newData = new Data({
      data: bodyData,
    });

    const savedData = await newData.save();

    res.status(201).json({
      success: true,
      message: 'Data stored successfully',
      data: savedData,
    });
  } catch (error) {
    await errorLogger.logError(error, {
      body: req.body,
      method: req.method,
      url: req.url,
    });

    res.status(500).json({
      success: false,
      message: 'Error storing data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

module.exports = {
  createData,
};

