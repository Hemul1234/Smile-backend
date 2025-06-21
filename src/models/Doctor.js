const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, default: '' }, // Ссылка на фото
  category: { type: String, required: true }, // Категория врача
  specialization: { type: String, required: true }, // Специализация
  education: { type: String, default: '' },
  advanced: [{ type: String }],
  experience: { type: String, default: '' },
  cost: { type: Number, default: 0 }
});

module.exports = mongoose.model('Doctor', doctorSchema);