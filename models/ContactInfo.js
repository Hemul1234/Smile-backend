import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  clinicName: { type: String, default: '' },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  workHours: { type: String, default: '' },
  map: {
    // Координаты для Яндекс.Карт (например, [55.76, 37.64])
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  additional: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ContactInfo', contactInfoSchema);