const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
