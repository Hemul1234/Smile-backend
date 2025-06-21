const mongoose = require('mongoose');
const slugify = require('slugify');
const Service = require('./src/models/Service'); // Путь к модели Service

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/smile';

async function addSlugs() {
  await mongoose.connect(MONGO_URL, {});

  const services = await Service.find({});
  for (const service of services) {
    // Генерируем slug из поля text (или другого, если нужно)
    service.slug = slugify(service.text, { lower: true, strict: true, locale: 'ru' });
    await service.save();
    console.log(`Updated ${service.text} - slug: ${service.slug}`);
  }
  await mongoose.disconnect();
  console.log('Migration completed!');
}

addSlugs().catch(e => {
  console.error(e);
  process.exit(1);
});