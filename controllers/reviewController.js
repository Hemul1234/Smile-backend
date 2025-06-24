import Review from '../models/Review.js';

// Получить все отзывы
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении отзывов' });
  }
};

// Получить отзыв по id
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: 'Отзыв не найден' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске отзыва' });
  }
};

// Создать новый отзыв
export const createReview = async (req, res) => {
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
export const patchReview = async (req, res) => {
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
export const deleteReview = async (req, res) => {
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