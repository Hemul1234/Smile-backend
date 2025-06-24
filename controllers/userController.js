import User from '../models/User.js';

export const patchMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });

    const allowed = ['fullName', 'phone', 'email'];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();
    const userObj = user.toObject();
    delete userObj.password;
    res.json(userObj);
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при обновлении пользователя: ' + err.message });
  }
};