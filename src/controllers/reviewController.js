const Review = require('../models/Review');

// Получить все отзывы
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении отзывов' });
  }
};

// Получить отзыв по id
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Отзыв не найден' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске отзыва' });
  }
};

// Создать новый отзыв
exports.createReview = async (req, res) => {
  try {
    const { text, service, rating } = req.body;
    const newReview = new Review({
      ...req.body,
      user: req.user.userId
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании отзыва: ' + err.message });
  }
};

// Обновить отзыв
exports.patchReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Отзыв не найден' });

    if (
      review.user.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Нет прав на редактирование' });
    }

    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при обновлении отзыва: ' + err.message });
  }
};

// Удалить отзыв
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Отзыв не найден' });

    if (
      review.user.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ error: 'Нет прав на удаление' });
    }

    await review.deleteOne();
    res.json({ message: 'Отзыв удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при удалении отзыва' });
  }
};