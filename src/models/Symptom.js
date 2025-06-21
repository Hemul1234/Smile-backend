const mongoose = require('mongoose');
const slugify = require('slugify');

const symptomSchema = new mongoose.Schema({
  symptom: { type: String, required: true },
  'slug-service': { type: String, required: true },
  category: { type: String, required: true },
  slug: { type: String, unique: true, required: true }
});

// Генерация slug по symptom
symptomSchema.pre('save', function(next) {
  if (this.isModified('symptom')) {
    this.slug = slugify(this.symptom, { lower: true, strict: true, locale: 'ru' });
  }
  next();
});

symptomSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.symptom) {
    update.slug = slugify(update.symptom, { lower: true, strict: true, locale: 'ru' });
    this.setUpdate(update);
  }
  next();
});

module.exports = mongoose.model('Symptom', symptomSchema);