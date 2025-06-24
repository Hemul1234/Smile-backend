import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // например, "12:30"
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor',},
  service: { type: String, },
  callMe: { type: Boolean, default: false },
  personalDataConsent: { type: Boolean, required: true },
  comment: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Новая', 'Обработана', 'Выполнена'],
    default: 'Новая'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Appointment', appointmentSchema);