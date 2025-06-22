import mongoose from 'mongoose';

const VacancySchema = new mongoose.Schema({
  name: { type: String, required: true },
  salary: { type: Number, required: true },
  description: [{ type: String, required: true }],
  requirements: [{ type: String, required: true }]
}, { timestamps: true })

export default mongoose.model('Vacancy', VacancySchema)