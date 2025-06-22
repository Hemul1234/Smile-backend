import express from 'express';
const router = express.Router();
import checkAuth from '../middleware/checkAuth.js';
import User from '../models/User.js';

router.get('/me', checkAuth, async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) return res.status(404).json({ message: "Пользователь не найден" });
  res.json(user);
});

export default router;

//Пользователь логинится, получает JWT-токен.
//При запросе к /me в заголовке передаёт:
//Authorization: Bearer <token>
//Middleware checkAuth проверяет токен и добавляет в req.user данные пользователя.
//Контроллер ищет пользователя в базе по ID из токена и возвращает его данные.