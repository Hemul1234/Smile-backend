import Symptom from '../models/Symptom.js';

// Получить все симптомы
export const getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении списка симптомов' });
  }
};

// Получить симптом по id
export const getSymptomById = async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json(symptom);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске симптома' });
  }
};

// Получить симптом по slug
export const getSymptomBySlug = async (req, res) => {
  try {
    const symptom = await Symptom.findOne({ slug: req.params.slug });
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json(symptom);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске симптома' });
  }
};

// Получить симптомы по категории
export const getSymptomsByCategory = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ category: req.params.category });
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске симптомов по категории' });
  }
};

// Получить симптомы по slugService
export const getSymptomsBySlugService = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ slugService: req.params.slugService });
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске симптомов по услуге' });
  }
};

// Создать симптом
export const createSymptom = async (req, res) => {
  try {
    const symptom = new Symptom(req.body);
    await symptom.save();
    res.status(201).json(symptom);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании симптома: ' + err.message });
  }
};

// Обновить симптом
export const patchSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json(symptom);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при обновлении симптома: ' + err.message });
  }
};

// Удалить симптом
export const deleteSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findByIdAndDelete(req.params.id);
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json({ message: 'Симптом удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при удалении симптома' });
  }
};