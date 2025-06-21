const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const checkAuth = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');

// Получить все отзывы (публично)
router.get('/', reviewController.getAllReviews);
// Получить отзыв по id (публично)
router.get('/:id', reviewController.getReviewById);

// Создать новый отзыв — только авторизованный пользователь
router.post('/', checkAuth, reviewController.createReview);

// Обновить отзыв — только автор или админ
router.patch('/:id', checkAuth, reviewController.patchReview);

// Удалить отзыв — только автор или админ
router.delete('/:id', checkAuth, reviewController.deleteReview);

module.exports = router;