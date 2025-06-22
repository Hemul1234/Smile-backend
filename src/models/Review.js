import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  photo:  { type: String },
  service: { type: String, required: true },
  text:   { type: String, required: true },
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Автор
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);