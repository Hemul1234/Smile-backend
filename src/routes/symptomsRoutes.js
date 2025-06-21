const express = require('express');
const router = express.Router();
const symptomController = require('../controllers/symptomController');

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

// Создать
router.post('/', symptomController.createSymptom);

// Обновить
router.patch('/:id', symptomController.patchSymptom);

// Удалить
router.delete('/:id', symptomController.deleteSymptom);

module.exports = router;