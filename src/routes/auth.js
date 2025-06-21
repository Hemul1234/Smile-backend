const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

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

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Некорректный email'),
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

module.exports = router;