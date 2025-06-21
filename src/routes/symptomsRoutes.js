const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const symptomController = require('../controllers/symptomController');
const checkAuth = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');

// Все симптомы
router.get('/', symptomController.getAllSymptoms);

// Поиск по id
router.get('/:id', symptomController.getSymptomById);

// Поиск по slug симптома
router.get('/slug/:slug', symptomController.getSymptomBySlug);

// Поиск по категории
router.get('/category/:category', symptomController.getSymptomsByCategory);

// Поиск по slug-service
router.get('/service/:slugService', symptomController.getSymptomsBySlugService);

// Создать симптом
router.post(
  '/',
  checkAuth,
  checkRole('admin'),
  [
    body('name').notEmpty().withMessage('Название симптома обязательно'),
    body('description').notEmpty().withMessage('Описание обязательно'),
    // другие проверки по необходимости
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    symptomController.createSymptom(req, res, next);
  }
);

// Обновить
router.patch(
  '/:id',
  checkAuth,
  checkRole('admin'),
  [
    body('name').optional().notEmpty().withMessage('Название не может быть пустым'),
    body('description').optional().notEmpty().withMessage('Описание не может быть пустым'),
    // другие проверки
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    symptomController.patchSymptom(req, res, next);
  }
);

// Удалить
router.delete('/:id', checkAuth, checkRole('admin'), symptomController.deleteSymptom);

module.exports = router;