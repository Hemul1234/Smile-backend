const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const User = require('../models/User');

const adminJs = new AdminJS({
  // ресурсы и настройки
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      // Только для пользователей с ролью 'admin'
      const admin = await User.findOne({ email, role: 'admin' });
      if (admin && await admin.comparePassword(password)) {
        return { email: admin.email, id: admin._id, role: admin.role };
      }
      return null;
    },
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'supersecret',
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' }
  }
);

module.exports = { adminJs, adminRouter };