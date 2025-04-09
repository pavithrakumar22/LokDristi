const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  peopleCount: { type: Number, required: true },
});

module.exports = mongoose.model('Detection', detectionSchema);
