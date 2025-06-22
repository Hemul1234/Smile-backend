import Vacancy from '../models/Vacancy.js';

// Получить все вакансии
export const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    res.json(vacancies);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении списка вакансий' });
  }
};

// Получить вакансию по id
export const getVacancyById = async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);
    if (!vacancy) return res.status(404).json({ error: 'Вакансия не найдена' });
    res.json(vacancy);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске вакансии' });
  }
};

// Создать вакансию (только админ)
export const createVacancy = async (req, res) => {
  try {
    const vacancy = new Vacancy(req.body);
    await vacancy.save();
    res.status(201).json(vacancy);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании вакансии: ' + err.message });
  }
};

// Обновить вакансию (только админ)
export const patchVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!vacancy) return res.status(404).json({ error: 'Вакансия не найдена' });
    res.json(vacancy);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при обновлении вакансии: ' + err.message });
  }
};

// Удалить вакансию (только админ)
export const deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndDelete(req.params.id);
    if (!vacancy) return res.status(404).json({ error: 'Вакансия не найдена' });
    res.json({ message: 'Вакансия удалена' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при удалении вакансии' });
  }
};