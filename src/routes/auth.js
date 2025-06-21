const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// Регистрация пользователя
router.post(
  '/register',
  [
    body('fullName').notEmpty().withMessage('Имя обязательно'),
    body('phone').matches(/^\+?[0-9]{10,15}$/).withMessage('Телефон некорректный'),
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

module.exports = router;