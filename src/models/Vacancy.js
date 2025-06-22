import mongoose from 'mongoose';

const vacancySchema = new mongoose.Schema({
  name: { type: String, required: true },
  salary: { type: Number, required: true },
  description: [{ type: String }],
  requirements: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

vacancySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Vacancy', vacancySchema);