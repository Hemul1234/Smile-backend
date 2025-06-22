import mongoose from 'mongoose';
import slugify from 'slugify';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, default: '' }, // Ссылка на фото
  category: { type: String, required: true }, // Категория врача
  specialization: { type: String, required: true }, // Специализация
  education: { type: String, default: '' },
  advanced: [{ type: String }],
  experience: { type: String, default: '' },
  cost: { type: Number, default: 0 },
  slug: { type: String, unique: true, sparse: true }, // Новый slug!
});

// Автоматическая генерация/обновление slug при сохранении/изменении name
doctorSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true, locale: 'ru' });
  }
  next();
});

doctorSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true, locale: 'ru' });
    this.setUpdate(update);
  }
  next();
});

export default mongoose.model('Doctor', doctorSchema);