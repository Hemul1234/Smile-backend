import express from 'express';
import { body, validationResult } from 'express-validator';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Регистрация пользователя
router.post(
  '/register',
  [
    body('fullName').notEmpty().withMessage('Имя обязательно'),
    body('phone').matches(/^\+?[0-9]{11}$/).withMessage('Телефон некорректный'),
    body('email').isEmail().withMessage('Email некорректный'),
    body('password').isLength({ min: 6 }).withMessage('Пароль минимум 6 символов')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    authController.register(req, res, next);
  }
);

// Логин пользователя
router.post(
  '/login',
  [
    body('identifier').notEmpty().withMessage('Email или телефон обязателен'),
    body('password').notEmpty().withMessage('Пароль обязателен')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    authController.login(req, res, next);
  }
);

// Обновление access токена (refresh)
router.post('/refresh', authController.refresh);

// Выход пользователя (API)
router.post('/logout', authController.logout);

export default router;