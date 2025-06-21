require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const doctorRoutes = require('./routes/doctorRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const symptomRoutes = require('./routes/symptomRoutes');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const { adminJs, adminRouter } = require('./admin/adminjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

// Проверочный маршрут
app.get('/', (req, res) => {
  res.send('Smile Backend API is running!');
});

// CRUD-роуты
app.use('/api/doctors', doctorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/symptoms', symptomRoutes);

// Авторизация и пользователь
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// AdminJS
app.use(adminJs.options.rootPath, adminRouter);

// MongoDB
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