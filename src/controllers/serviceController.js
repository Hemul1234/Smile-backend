const Service = require('../models/Service');

// Получить все услуги
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении списка услуг' });
  }
};

// Получить услуги по категории
exports.getServicesByCategory = async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.category });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске услуг по категории' });
  }
};

// Получить услугу по slug
exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ error: 'Услуга не найдена' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске услуги' });
  }
};

// Получить услугу по категории и slug
exports.getServiceByCategoryAndSlug = async (req, res) => {
  try {
    const service = await Service.findOne({
      category: req.params.category,
      slug: req.params.slug
    });
    if (!service) return res.status(404).json({ error: 'Услуга не найдена' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске услуги' });
  }
};

// Получить услугу по id
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Услуга не найдена' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске услуги' });
  }
};

// Создать услугу
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании услуги: ' + err.message });
  }
};

// Обновить услугу
exports.patchService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!service) return res.status(404).json({ error: 'Услуга не найдена' });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при обновлении услуги: ' + err.message });
  }
};

// Удалить услугу
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Услуга не найдена' });
    res.json({ message: 'Услуга удалена' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при удалении услуги' });
  }
};