import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import doctorRoutes from './routes/doctorRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import { adminJs, adminRouter } from './admin/adminjs.js';

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