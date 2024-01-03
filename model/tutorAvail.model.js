const mongoose = require('mongoose');

const tutorAvailabilitySchema = new mongoose.Schema({
  lastPingTime: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('tutorAvailability', tutorAvailabilitySchema);
