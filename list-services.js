const mongoose = from 'mongoose');
const Service = from './src/models/Service'); // путь к твоей модели

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/smile';

async function listServiceNames() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  const services = await Service.find({}, { slug: 1, _id: 0 }); // Только поле text
  const names = services.map(s => s.slug);
  console.log(names);
  await mongoose.disconnect();
}

listServiceNames().catch(e => {
  console.error(e);
  process.exit(1);
});