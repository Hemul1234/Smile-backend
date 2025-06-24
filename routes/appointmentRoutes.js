import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import * as appointmentController from '../controllers/appointmentController.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';

// Получить все записи (только админ)
router.get('/', checkAuth, checkRole('admin'), appointmentController.getAllAppointments);

// Получить запись по id (только админ)
router.get('/:id', checkAuth, checkRole('admin'), appointmentController.getAppointmentById);

// Получить занятые слоты по дате и doctorId (публично)
router.get('/blocked', appointmentController.getBlockedTimes);

// Создать запись (публично)
router.post(
  '/',
  [
    body('fullName').notEmpty().withMessage('ФИО обязательно'),
    body('phone').notEmpty().withMessage('Телефон обязателен'),
    body('date').notEmpty().withMessage('Дата обязательна'),
    body('time').notEmpty().withMessage('Время обязательно'),
    body('personalDataConsent').custom((value) => value === true).withMessage('Необходимо согласие на обработку персональных данных'),
    // callMe и comment — опционально
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    appointmentController.createAppointment(req, res, next);
  }
);

// Обновить запись (только админ)
router.patch(
  '/:id',
  checkAuth,
  checkRole('admin'),
  [
    body('status').optional().isIn(['new', 'confirmed', 'completed', 'cancelled']),
    // другие поля по необходимости
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    appointmentController.patchAppointment(req, res, next);
  }
);

// Удалить запись (только админ)
router.delete('/:id', checkAuth, checkRole('admin'), appointmentController.deleteAppointment);

export default router;