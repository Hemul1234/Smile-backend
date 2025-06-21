require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const doctorRoutes = require('./routes/doctorRoutes'); // Подключаем маршруты для врачей
const reviewRoutes = require('./routes/reviewRoutes'); // Подключаем маршруты для отзывов
const serviceRoutes = require('./routes/serviceRoutes'); // Подключаем маршруты для услуг

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware для работы с JSON
app.use(express.json());

//Пример базового роута для проверки
app.get('/', (rec, res) => {
    res.send('Smile Backend API is running!');
})

// Подключаем маршруты (CRUD)
app.use('/api/doctors', doctorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });