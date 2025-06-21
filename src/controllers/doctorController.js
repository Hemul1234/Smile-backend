const Doctor = require('../models/Doctor');

// Получить всех докторов
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить доктора по id
exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Получить доктора по slug
exports.getDoctorBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const doctor = await Doctor.findOne({ slug });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Создать доктора
exports.createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
      res.status(400).json({ error: 'Доктор с таким именем (slug) уже существует.' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

// Обновить доктора
exports.patchDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true
    });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
      res.status(400).json({ error: 'Доктор с таким именем (slug) уже существует.' });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

// Удалить доктора
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};