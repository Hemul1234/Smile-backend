const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Review = require('./models/Review');
const User = require('./models/User');

const reviewsJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'oldReviews.json'), 'utf-8'));

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);

  for (let i = 0; i < reviewsJson.length; i++) {
    const review = reviewsJson[i];
    let user;
    // Генерируем уникальные email/phone для каждого пользователя с одинаковым именем
    const userEmail = review.name.replace(/\s+/g, "_").toLowerCase() + `_${i}@example.com`;
    const userPhone = `+7000000${i.toString().padStart(4, "0")}`;

    // Пробуем найти пользователя по имени и email
    user = await User.findOne({ fullName: review.name, email: userEmail });
    if (!user) {
      try {
        user = await User.create({
          fullName: review.name,
          phone: userPhone,
          email: userEmail,
          password: "123456qQ"
        });
        console.log(`Создан новый пользователь: ${user.fullName} (${user.email})`);
      } catch (e) {
        console.error(`Ошибка создания пользователя ${review.name}:`, e.message);
        continue;
      }
    }

    // Пробуем создать отзыв
    try {
      const migrated = await Review.create({
        name: review.name,
        photo: review.photo,
        service: review.service,
        text: review.text,
        user: user._id
        // rating: review.rating || 5 // если нужно
      });
      console.log(`Мигрирован отзыв: ${migrated._id} для пользователя ${user.fullName}`);
    } catch (e) {
      console.error(`Ошибка миграции отзыва ${review.name}:`, e.message);
    }
  }

  await mongoose.disconnect();
  console.log('Миграция завершена!');
}

migrate().catch(console.error);