const mongoose = from 'mongoose');
const slugify = from 'slugify');
const Doctor = from './src/models/Doctor'); // Путь к модели Doctor

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/smile';

async function addSlugs() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  const doctors = await Doctor.find({});
  for (const doctor of doctors) {
    // Генерируем slug из поля name
    doctor.slug = slugify(doctor.name, { lower: true, strict: true, locale: 'ru' });
    await doctor.save();
    console.log(`Updated ${doctor.name} - slug: ${doctor.slug}`);
  }
  await mongoose.disconnect();
  console.log('Migration completed!');
}

addSlugs().catch(e => {
  console.error(e);
  process.exit(1);
});