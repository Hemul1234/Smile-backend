const Symptom = require('../models/Symptom');

// Получить все симптомы
exports.getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении списка симптомов' });
  }
};

// Получить симптом по id
exports.getSymptomById = async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json(symptom);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске симптома' });
  }
};

// Получить симптом по slug
exports.getSymptomBySlug = async (req, res) => {
  try {
    const symptom = await Symptom.findOne({ slug: req.params.slug });
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json(symptom);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске симптома' });
  }
};

// Получить симптомы по категории
exports.getSymptomsByCategory = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ category: req.params.category });
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске симптомов по категории' });
  }
};

// Получить симптомы по slugService
exports.getSymptomsBySlugService = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ slugService: req.params.slugService });
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске симптомов по услуге' });
  }
};

// Создать симптом
exports.createSymptom = async (req, res) => {
  try {
    const symptom = new Symptom(req.body);
    await symptom.save();
    res.status(201).json(symptom);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании симптома: ' + err.message });
  }
};

// Обновить симптом
exports.patchSymptom = async (req, res) => {
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
exports.deleteSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findByIdAndDelete(req.params.id);
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json({ message: 'Симптом удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при удалении симптома' });
  }
};