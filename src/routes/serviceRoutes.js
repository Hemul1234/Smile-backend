import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import serviceController from '../controllers/serviceController.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';

// Получить все услуги
router.get('/', serviceController.getAllServices);

// Получить услуги по категории
router.get('/category/:category', serviceController.getServicesByCategory);

// Получить услугу по slug (основной для фронта)
router.get('/slug/:slug', serviceController.getServiceBySlug);

// Получить услугу по категории и slug (если надо строгую фильтрацию)
router.get('/category/:category/slug/:slug', serviceController.getServiceByCategoryAndSlug);

// Получить услугу по id
router.get('/:id', serviceController.getServiceById);

// Создать услугу
router.post(
  '/',
  checkAuth,
  checkRole('admin'),
  [
    body('title').notEmpty().withMessage('Название услуги обязательно'),
    body('price').isNumeric().withMessage('Цена должна быть числом'),
    body('description').notEmpty().withMessage('Описание обязательно'),
    // другие проверки по необходимости
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    serviceController.createService(req, res, next);
  }
);

// Обновить услугу (частично)
router.patch(
  '/:id',
  checkAuth,
  checkRole('admin'),
  [
    body('title').optional().notEmpty().withMessage('Название не может быть пустым'),
    body('price').optional().isNumeric().withMessage('Цена должна быть числом'),
    body('description').optional().notEmpty().withMessage('Описание не может быть пустым'),
    // другие проверки
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    serviceController.patchService(req, res, next);
  }
);

// Удалить услугу
router.delete('/:id', checkAuth, checkRole('admin'), serviceController.deleteService);

export default router;