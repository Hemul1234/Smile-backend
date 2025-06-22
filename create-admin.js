import mongoose from 'mongoose';
import User from './src/models/User'; // путь укажи согласно структуре твоего проекта

async function createAdmin() {
  await mongoose.connect('mongodb://localhost:27017/smile', { });

  const admin = new User({
    fullName: 'Admin Tester',
    phone: '+70000000201',
    email: 'admin@demo.local',
    password: 'test1234', // пароль будет захеширован автоматически pre('save')
    role: 'admin'
  });

  await admin.save();
  console.log('Админ создан!');
  await mongoose.disconnect();
}

createAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});