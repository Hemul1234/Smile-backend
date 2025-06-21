const User = require('../models/User');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require('../utils/token');

// Регистрация только обычного пользователя
exports.register = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    const candidate = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone }]
    });
    if (candidate) {
      return res.status(409).json({ message: "Пользователь с таким email или телефоном уже существует" });
    }
    // Запрет на создание админов через API
    if (req.body.role && req.body.role === 'admin') {
      return res.status(403).json({ message: "Регистрация администратора через API запрещена" });
    }
    const user = new User({
      fullName,
      email,
      phone,
      password,
      role: 'user'
    });
    await user.save();

    const accessToken = generateAccessToken({ userId: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user._id, role: user.role });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      token: accessToken,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Ошибка регистрации: " + err.message });
  }
};

// Логин только для пользователя
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
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

    if (user.role === 'admin') {
      return res.status(403).json({ message: "Вход администратора через API запрещён" });
    }

    const accessToken = generateAccessToken({ userId: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user._id, role: user.role });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      token: accessToken,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Ошибка входа: " + err.message });
  }
};

// Refresh токен доступен только для пользователя
exports.refresh = (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: "Необходим refresh токен" });
  }
  try {
    const payload = verifyRefreshToken(refreshToken);
    if (payload.role !== 'user') {
      return res.status(403).json({ message: "Обновление токена доступно только пользователям" });
    }
    const accessToken = generateAccessToken({ userId: payload.userId, role: payload.role });
    res.json({ token: accessToken });
  } catch (err) {
    return res.status(401).json({ message: "Невалидный refresh токен" });
  }
};

// Logout для пользователя (API)
exports.logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.json({ message: 'Выход выполнен' });
};