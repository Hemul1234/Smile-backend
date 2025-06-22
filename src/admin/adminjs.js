const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const path = require('path');

const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Service = require('../models/Service');
const Vacancy = require('../models/Vacancy');
const Symptom = require('../models/Symptom');
const Review = require('../models/Review');

// Подключаем адаптер
AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: '/admin',
  dashboard: {
    component: AdminJS.bundle(path.join(__dirname, 'redirect-dashboard.jsx'))
  },
  resources: [
    { 
      resource: User,
      options: {
        properties: {
          password: { isVisible: false },
          fullName: { label: 'ФИО' },
          phone:    { label: 'Телефон' },
          email:    { label: 'Электронная почта' },
          role:     { label: 'Роль' },
          createdAt: { label: 'Создан' },
          updatedAt: { label: 'Обновлён' },
        }
      }
    },
    { 
      resource: Doctor,
      options: {
        properties: {
          name: { label: 'ФИО' },
          photo: { label: 'Фото' },
          category: { label: 'Категория врача' },
          specialization: { label: 'Специализация' },
          education: { label: 'Образование' },
          advanced: { label: 'Повышение квалификации' },
          experience: { label: 'Опыт работы' },
          cost: { label: 'Стоимость приёма' },
          slug: { label: 'Slug' },
        }
      }
    },
    { 
      resource: Service,
      options: {
        properties: {
          category: { label: 'Категория' },
          cost: { label: 'Стоимость услуги' },
          text: { label: 'Краткое описание' },
          article: { label: 'Статья' },
          slug: { label: 'Slug' },
          'article.title': { label: 'Заголовок статьи' },
          'article.content': { label: 'Секции статьи' },
          'article.content.heading': { label: 'Заголовок секции' },
          'article.content.text': { label: 'Текст секции' },
          'article.content.list': { label: 'Список' },
        }
      }
    },
    { 
      resource: Vacancy,
      options: {
        properties: {
          name: { label: 'Название вакансии' },
          salary: { label: 'Зарплата' },
          description: { label: 'Обязанности' },
          requirements: { label: 'Требования' },
          createdAt: { label: 'Создана' },
          updatedAt: { label: 'Обновлена' },
        }
      }
    },
    { 
      resource: Symptom,
      options: {
        properties: {
          symptom: { label: 'Симптом' },
          'slug-service': { label: 'Slug услуги' },
          category: { label: 'Категория' },
          slug: { label: 'Slug' },
        }
      }
    },
    { 
      resource: Review,
      options: {
        properties: {
          name: { label: 'Имя клиента' },
          photo: { label: 'Фото' },
          service: { label: 'Услуга' },
          text: { label: 'Текст отзыва' },
          user: { label: 'Пользователь (ID)' },
          createdAt: { label: 'Создан' },
          updatedAt: { label: 'Обновлён' },
        }
      }
    },
  ],
  branding: {
    companyName: 'Smile Clinic',
    logo: false,
    softwareBrothers: false,
  },
  locale: {
    language: 'ru',
    translations: {
      labels: {
        User: 'Пользователи',
        Doctor: 'Врачи',
        Service: 'Услуги',
        Vacancy: 'Вакансии',
        Symptom: 'Симптомы',
        Review: 'Отзывы',
        loginWelcome: 'Вход в административную панель',
      },
      resources: {
        User: {
          properties: {
            fullName: 'ФИО',
            phone: 'Телефон',
            email: 'Электронная почта',
            password: 'Пароль',
            role: 'Роль',
            createdAt: 'Создан',
            updatedAt: 'Обновлён',
          }
        },
        Doctor: {
          properties: {
            name: 'ФИО',
            photo: 'Фото',
            category: 'Категория врача',
            specialization: 'Специализация',
            education: 'Образование',
            advanced: 'Повышение квалификации',
            experience: 'Опыт работы',
            cost: 'Стоимость приёма',
            slug: 'Slug',
          }
        },
        Service: {
          properties: {
            category: 'Категория',
            cost: 'Стоимость услуги',
            text: 'Краткое описание',
            article: 'Статья',
            slug: 'Slug',
            'article.title': 'Заголовок статьи',
            'article.content': 'Секции статьи',
            'article.content.heading': 'Заголовок секции',
            'article.content.text': 'Текст секции',
            'article.content.list': 'Список',
          }
        },
        Vacancy: {
          properties: {
            name: 'Название вакансии',
            salary: 'Зарплата',
            description: 'Обязанности',
            requirements: 'Требования',
            createdAt: 'Создана',
            updatedAt: 'Обновлена',
          }
        },
        Symptom: {
          properties: {
            symptom: 'Симптом',
            'slug-service': 'Slug услуги',
            category: 'Категория',
            slug: 'Slug',
          }
        },
        Review: {
          properties: {
            name: 'Имя клиента',
            photo: 'Фото',
            service: 'Услуга',
            text: 'Текст отзыва',
            user: 'Пользователь (ID)',
            createdAt: 'Создан',
            updatedAt: 'Обновлён',
          }
        }
      },
      messages: {
        loginWelcome: 'Пожалуйста, войдите как администратор',
        loginInvalid: 'Неверный email или пароль',
        loggedIn: 'Вы вошли как %{email}',
        successfullyBulkDeleted: '%{count} записей успешно удалены',
        successfullyDeleted: 'Запись успешно удалена',
        successfullyUpdated: 'Запись успешно обновлена',
        successfullyCreated: 'Запись успешно создана',
      },
      buttons: {
        save: 'Сохранить',
        addNewItem: 'Добавить',
        filter: 'Фильтр',
        resetFilter: 'Сбросить фильтр',
        applyChanges: 'Применить изменения',
        confirmRemovalMany: 'Удалить выбранные',
        confirmRemoval: 'Удалить',
        login: 'Войти',
        logout: 'Выйти',
        createFirstRecord: 'Создать первую запись',
      },
      properties: {
        createdAt: 'Создан',
        updatedAt: 'Обновлён',
        password: 'Пароль',
      },
      actions: {
        new: 'Создать',
        edit: 'Редактировать',
        show: 'Просмотр',
        delete: 'Удалить',
        bulkDelete: 'Удалить выбранные',
        list: 'Список',
        search: 'Поиск',
      }
    }
  }
})

// Авторизация только для админов
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email, role: 'admin' })
      if (user && await user.comparePassword(password)) {
        return user
      }
      return null
    },
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'admin-cookie-secret',
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    },
  }
)

module.exports = { adminJs, adminRouter }