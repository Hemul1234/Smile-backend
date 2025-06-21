const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const doctorController = require('../controllers/doctorController');
const checkAuth = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');

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

module.exports = router;