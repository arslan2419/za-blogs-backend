const mongoose = require('mongoose');
const errorLogger = require('../utills/errorLogger');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URL;
    
    if (!mongoURI) {
      const error = new Error('MongoDB URI is not defined in environment variables');
      await errorLogger.logError(error);
      throw error;
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    await errorLogger.logError(error);
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

