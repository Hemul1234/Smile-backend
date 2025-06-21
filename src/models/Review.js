const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  service: { type: String, required: true },
  text: { type: String, required: true }
});

module.exports = mongoose.model('Review', reviewSchema);