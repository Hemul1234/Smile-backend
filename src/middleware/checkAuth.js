import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "some-secret-key";

const checkAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Необходима авторизация" });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Необходима авторизация" });
  }
};

export default checkAuth;