import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import * as doctorController from '../controllers/doctorController.js';
import checkAuth from '../middleware/checkAuth.js';
import checkRole from '../middleware/checkRole.js';

// CRUD маршруты
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.get('/slug/:slug', doctorController.getDoctorBySlug);

router.post(
  '/',
  checkAuth,
  checkRole('admin'),
  [
    body('fullName').notEmpty().withMessage('Имя обязательно'),
    body('specialization').notEmpty().withMessage('Специализация обязательна'),
    body('photo').optional().isString(),
    // добавь другие поля по необходимости
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    doctorController.createDoctor(req, res, next);
  }
);

router.patch(
  '/:id',
  checkAuth,
  checkRole('admin'),
  [
    body('fullName').optional().notEmpty().withMessage('Имя не может быть пустым'),
    body('specialization').optional().notEmpty().withMessage('Специализация не может быть пустой'),
    body('photo').optional().isString(),
    // другие проверки
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    doctorController.patchDoctor(req, res, next);
  }
);

router.delete('/:id', checkAuth, checkRole('admin'), doctorController.deleteDoctor);

export default router;