const Service = require('../models/Service');

// Получить все услуги
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить все услуги по категории
exports.getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить одну услугу по slug
exports.getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить одну услугу по категории и slug (если нужно строгая фильтрация)
exports.getServiceByCategoryAndSlug = async (req, res) => {
  try {
    const { category, slug } = req.params;
    const service = await Service.findOne({ category, slug });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить услугу по id
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Создать услугу
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Обновить услугу (частично)
exports.patchService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true
    });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Удалить услугу
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};