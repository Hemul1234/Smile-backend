import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import * as contactInfoController from '../controllers/contactInfoController.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';

// Получить контакты (публично)
router.get('/', contactInfoController.getContactInfo);

// Создать/обновить контакты (только админ)
router.post(
  '/',
  checkAuth,
  checkRole('admin'),
  [
    body('address').notEmpty().withMessage('Адрес обязателен'),
    body('phone').notEmpty().withMessage('Телефон обязателен'),
    body('map.lat').notEmpty().isNumeric().withMessage('Широта обязательна'),
    body('map.lng').notEmpty().isNumeric().withMessage('Долгота обязательна'),
    // Остальные поля опциональны
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    contactInfoController.upsertContactInfo(req, res, next);
  }
);

// Удалить контакты (только админ)
router.delete(
  '/',
  checkAuth,
  checkRole('admin'),
  contactInfoController.deleteContactInfo
);

export default router;