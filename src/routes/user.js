const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const User = require('../models/User');

router.get('/me', checkAuth, async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) return res.status(404).json({ message: "Пользователь не найден" });
  res.json(user);
});

module.exports = router;

//Пользователь логинится, получает JWT-токен.
//При запросе к /me в заголовке передаёт:
//Authorization: Bearer <token>
//Middleware checkAuth проверяет токен и добавляет в req.user данные пользователя.
//Контроллер ищет пользователя в базе по ID из токена и возвращает его данные.