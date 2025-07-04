const rolesMiddleware = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Доступ запрещён" });
  }
  next();
};

export default rolesMiddleware;