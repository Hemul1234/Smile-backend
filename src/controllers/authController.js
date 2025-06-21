const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "some-secret-key";

// Регистрация
exports.register = async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;
    if (!fullName || !phone || !email || !password)
      return res.status(400).json({ message: "Заполните все поля" });

    if (await User.findOne({ $or: [{ email }, { phone }] }))
      return res.status(400).json({ message: "Пользователь с таким email или телефоном уже существует" });

    await User.create({ fullName, phone, email, password });
    res.status(201).json({ message: "Регистрация успешна" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Логин — email или телефон + пароль
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = email или телефон
    if (!identifier || !password)
      return res.status(400).json({ message: "Введите email/телефон и пароль" });

    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase().trim() },
        { phone: identifier }
      ]
    });

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Неверный email/телефон или пароль" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: 3600 } // Токен действителен 1 час}
    );
    // Фронт должен сам по роли понять, куда редиректить пользователя
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};