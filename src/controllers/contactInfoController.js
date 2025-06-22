import ContactInfo from '../models/ContactInfo.js';

// Получить контакты (публично)
export const getContactInfo = async (req, res) => {
  try {
    // На сайте обычно только одна запись с контактами
    const info = await ContactInfo.findOne().sort({ createdAt: -1 });
    if (!info) return res.status(404).json({ error: 'Контакты не найдены' });
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера при получении контактов' });
  }
};

// Создать или обновить контакты (только админ)
// Если запись еще не создана, создаем, иначе обновляем
export const upsertContactInfo = async (req, res) => {
  try {
    const update = req.body;
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const info = await ContactInfo.findOneAndUpdate({}, update, options);
    res.json(info);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при обновлении контактов: ' + err.message });
  }
};

// Удалить контакты (только админ)
export const deleteContactInfo = async (req, res) => {
  try {
    await ContactInfo.deleteMany({});
    res.json({ message: 'Контакты удалены' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении контактов' });
  }
};