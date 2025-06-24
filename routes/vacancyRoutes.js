import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import * as vacancyController from '../controllers/vacancyController.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';

// Получить все вакансии (публично)
router.get('/', vacancyController.getAllVacancies);

// Получить вакансию по id (публично)
router.get('/:id', vacancyController.getVacancyById);

// Создать вакансию (только админ)
router.post(
  '/',
  checkAuth,
  checkRole('admin'),
  [
    body('name').notEmpty().withMessage('Название обязательно'),
    body('salary').notEmpty().withMessage('Зарплата обязательна'),
    // другие проверки по необходимости
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    vacancyController.createVacancy(req, res, next);
  }
);

// Обновить вакансию (только админ)
router.patch(
  '/:id',
  checkAuth,
  checkRole('admin'),
  [
    body('name').optional().notEmpty().withMessage('Название не может быть пустым'),
    body('salary').optional().notEmpty().withMessage('Зарплата не может быть пустой'),
    // другие проверки
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    vacancyController.patchVacancy(req, res, next);
  }
);

// Удалить вакансию (только админ)
router.delete('/:id', checkAuth, checkRole('admin'), vacancyController.deleteVacancy);

export default router;