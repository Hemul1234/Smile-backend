import Appointment from '../models/Appointment.js';

// Получить все записи (только для админа)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 }).populate('doctor');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении записей' });
  }
};

// Получить запись по id (для админа)
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('doctor');
    if (!appointment) return res.status(404).json({ error: 'Запись не найдена' });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при поиске записи' });
  }
};

// Создать запись (публичный)
export const createAppointment = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      date,
      time,
      doctor,
      service,
      callMe,
      personalDataConsent,
      comment
    } = req.body;

    if (!personalDataConsent) {
      return res.status(400).json({ error: 'Необходимо согласие на обработку персональных данных' });
    }

    // Проверка: нет ли пересечения по doctor + date + time
    const start = new Date(date);
    start.setHours(0,0,0,0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const exists = await Appointment.exists({
      doctor,
      date: { $gte: start, $lt: end },
      time
    });

    if (exists) {
      return res.status(409).json({ error: 'Это время уже занято у выбранного врача' });
    }

    const appointment = new Appointment({
      fullName,
      phone,
      date,
      time,
      doctor,
      service,
      callMe: !!callMe,
      personalDataConsent,
      comment
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при создании записи: ' + err.message });
  }
};

// Получить занятые временные интервалы для врача на дату
export const getBlockedTimes = async (req, res) => {
  try {
    const { date, doctor } = req.query;
    if (!date || !doctor) {
      return res.status(400).json({ error: 'Нужны параметры date и doctor' });
    }

    const start = new Date(date);
    start.setHours(0,0,0,0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const appointments = await Appointment.find({
      doctor,
      date: { $gte: start, $lt: end }
    }).select('time -_id');

    const blocked = appointments.map(a => a.time);
    res.json({ blocked });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении занятых слотов: ' + err.message });
  }
};

// Обновить запись (только для админа)
export const patchAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate('doctor');
    if (!appointment) return res.status(404).json({ error: 'Запись не найдена' });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при обновлении записи: ' + err.message });
  }
};

// Удалить запись (только для админа)
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Запись не найдена' });
    res.json({ message: 'Запись удалена' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при удалении записи' });
  }
};