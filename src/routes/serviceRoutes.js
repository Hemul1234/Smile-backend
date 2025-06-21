const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

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
router.post('/', serviceController.createService);

// Обновить услугу (частично)
router.patch('/:id', serviceController.patchService);

// Удалить услугу
router.delete('/:id', serviceController.deleteService);

module.exports = router;