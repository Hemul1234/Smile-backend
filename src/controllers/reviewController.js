const Review = require('../models/Review');

// Получить все отзывы
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить отзыв по id
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Создать новый отзыв
exports.createReview = async (req, res) => {
  try {
    // Валидация
    const { text, rating } = req.body;
    if (!text || typeof rating !== 'number') {
      return res.status(400).json({ error: 'Text and rating are required' });
    }
    // Привязываем пользователя-автора
    const newReview = new Review({
      ...req.body,
      user: req.user.userId
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Обновить отзыв
exports.patchReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    // Только автор или админ может редактировать
    if (
      review.user.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Нет прав на редактирование' });
    }

    // Здесь можешь добавить валидацию новых данных (по желанию)
    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Удалить отзыв
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    // Только автор или админ может удалить
    if (
      review.user.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Нет прав на удаление' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};