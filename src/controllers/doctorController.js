const Doctor = require('../models/Doctor');

// Получить всех врачей
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении списка врачей' });
  }
};

// Получить врача по id
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Врач не найден' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске врача' });
  }
};

// Получить врача по slug
exports.getDoctorBySlug = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ slug: req.params.slug });
    if (!doctor) return res.status(404).json({ error: 'Врач не найден' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске врача' });
  }
};

// Создать врача
exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании врача: ' + err.message });
  }
};

// Обновить врача
exports.patchDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!doctor) return res.status(404).json({ error: 'Врач не найден' });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при обновлении врача: ' + err.message });
  }
};

// Удалить врача
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ error: 'Врач не найден' });
    res.json({ message: 'Врач удалён' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при удалении врача' });
  }
};