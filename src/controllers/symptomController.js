const Symptom = require('../models/Symptom');

// Получить все симптомы
exports.getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить симптом по id
exports.getSymptomById = async (req, res) => {
  try {
    const { id } = req.params;
    const symptom = await Symptom.findById(id);
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json(symptom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить симптом по slug
exports.getSymptomBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const symptom = await Symptom.findOne({ slug });
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json(symptom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить симптомы по категории
exports.getSymptomsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const symptoms = await Symptom.find({ category });
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить симптомы по slug-service
exports.getSymptomsBySlugService = async (req, res) => {
  try {
    const { slugService } = req.params;
    const symptoms = await Symptom.find({ 'slug-service': slugService });
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Создать симптом
exports.createSymptom = async (req, res) => {
  try {
    const symptom = new Symptom(req.body);
    await symptom.save();
    res.status(201).json(symptom);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
      res.status(400).json({ error: 'Симптом с таким названием уже существует.' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

// Обновить симптом
exports.patchSymptom = async (req, res) => {
  try {
    const { id } = req.params;
    const symptom = await Symptom.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true
    });
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json(symptom);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
      res.status(400).json({ error: 'Симптом с таким названием уже существует.' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

// Удалить симптом
exports.deleteSymptom = async (req, res) => {
  try {
    const { id } = req.params;
    const symptom = await Symptom.findByIdAndDelete(id);
    if (!symptom) return res.status(404).json({ error: 'Симптом не найден' });
    res.json({ message: 'Симптом удалён' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};