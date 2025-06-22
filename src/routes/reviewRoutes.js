import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import reviewController from '../controllers/reviewController';
import checkAuth from '../middleware/checkAuth';

// Получить все отзывы (публично)
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);

// Создать новый отзыв — только авторизованный пользователь
router.post(
  '/',
  checkAuth,
  [
    body('text').notEmpty().withMessage('Текст отзыва обязателен'),
    body('service').notEmpty().withMessage('Услуга обязательна'),
    // другие проверки по необходимости
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    reviewController.createReview(req, res, next);
  }
);

router.patch(
  '/:id',
  checkAuth,
  [
    body('text').optional().notEmpty().withMessage('Текст не может быть пустым'),
    body('service').optional().notEmpty().withMessage('Услуга не может быть пустой'),
    // другие проверки
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    reviewController.patchReview(req, res, next);
  }
);

router.delete('/:id', checkAuth, reviewController.deleteReview);

export default router;