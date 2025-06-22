import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import * as AdminJSMongoose from '@adminjs/mongoose'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

import User from '../models/User.js'
import Doctor from '../models/Doctor.js'
import Service from '../models/Service.js'
import Vacancy from '../models/Vacancy.js'
import Symptom from '../models/Symptom.js'
import Review from '../models/Review.js'
import Appointment from '../models/Appointment.js'
import ContactInfo from '../models/ContactInfo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

AdminJS.registerAdapter(AdminJSMongoose)

const adminJs = new AdminJS({
  databases: [mongoose],
  rootPath: '/admin',
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: false },
          fullName: { label: 'ФИО' },
          phone: { label: 'Телефон' },
          email: { label: 'Электронная почта' },
          role: { label: 'Роль' },
          createdAt: { label: 'Создан' },
          updatedAt: { label: 'Обновлён' }
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
          slug: { label: 'Slug' }
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
          'article.content.list': { label: 'Список' }
        }
      }
    },
    {
      resource: Vacancy,
      options: {
        properties: {
          name: { label: 'Название вакансии' },
          salary: { label: 'Зарплата' },
          description: { label: 'Описание' },
          requirements: { label: 'Требования' },
          createdAt: { label: 'Создана' },
          updatedAt: { label: 'Обновлена' }
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
          slug: { label: 'Slug' }
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
          updatedAt: { label: 'Обновлён' }
        }
      }
    },
    {
      resource: Appointment,
      options: {
        properties: {
          fullName: { label: 'ФИО пациента' },
          phone: { label: 'Телефон' },
          date: { label: 'Дата' },
          time: { label: 'Время' },
          doctor: { label: 'Врач (ID)' },
          service: { label: 'Услуга' },
          callMe: { label: 'Перезвонить мне' },
          personalDataConsent: { label: 'Согласие на обработку данных' },
          comment: { label: 'Комментарий' },
          status: { label: 'Статус' },
          createdAt: { label: 'Создана' }
        }
      }
    },
    {
      resource: ContactInfo,
      options: {
        properties: {
          clinicName: { label: 'Название клиники' },
          address: { label: 'Адрес' },
          phone: { label: 'Телефон' },
          email: { label: 'Электронная почта' },
          workHours: { label: 'Время работы' },
          'map.lat': { label: 'Широта (lat)' },
          'map.lng': { label: 'Долгота (lng)' },
          additional: { label: 'Дополнительно' },
          createdAt: { label: 'Создано' }
        },
        actions: {
          new: { isAccessible: false, isVisible: false,},
          delete: { isAccessible: false, isVisible: false },
          bulkDelete: { isAccessible: false, isVisible: false }
        }
      }
    }
  ],
  branding: {
    companyName: 'Smile Clinic',
    logo: false,
    softwareBrothers: false,
  },
  locale: {
    language: 'ru',
    availableLanguages: ['en', 'ru'],
    localeDetection: false,
    translations: {
      ru: {
        components: {
          Login: {
            welcomeHeader: 'Добро пожаловать в Smile Clinic',
            welcomeMessage: 'Пожалуйста, войдите как администратор',
            properties: {
              email: 'Email',
              password: 'Пароль'
            },
            loginButton: 'Войти'
          }
        },
        labels: {
          User: 'Пользователи',
          Doctor: 'Врачи',
          Service: 'Услуги',
          Vacancy: 'Вакансии',
          Symptom: 'Симптомы',
          Review: 'Отзывы',
          Appointment: 'Записи',
          loginWelcome: 'Вход в административную панель',
          ContactInfo: 'Контакты',
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
              updatedAt: 'Обновлён'
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
              slug: 'Slug'
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
              'article.content.list': 'Список'
            }
          },
          Vacancy: {
            properties: {
              name: 'Название вакансии',
              salary: 'Зарплата',
              description: 'Описание',
              requirements: 'Требования',
              createdAt: 'Создана',
              updatedAt: 'Обновлена'
            }
          },
          Symptom: {
            properties: {
              symptom: 'Симптом',
              'slug-service': 'Slug услуги',
              category: 'Категория',
              slug: 'Slug'
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
              updatedAt: 'Обновлён'
            }
          },
          Appointment: {
            properties: {
              fullName: 'ФИО пациента',
              phone: 'Телефон',
              date: 'Дата',
              time: 'Время',
              doctor: 'Врач (ID)',
              service: 'Услуга',
              callMe: 'Перезвонить мне',
              personalDataConsent: 'Согласие на обработку данных',
              comment: 'Комментарий',
              status: 'Статус',
              createdAt: 'Создана'
            }
          },
          ContactInfo: {
            properties: {
              clinicName: 'Название клиники',
              address: 'Адрес',
              phone: 'Телефон',
              email: 'Электронная почта',
              workHours: 'Время работы',
              map: 'Координаты карты',
              'map.lat': 'Широта (lat)',
              'map.lng': 'Долгота (lng)',
              additional: 'Дополнительно',
              createdAt: 'Создано'
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
          successfullyCreated: 'Запись успешно создана'
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
          createFirstRecord: 'Создать первую запись'
        },
        properties: {
          createdAt: 'Создан',
          updatedAt: 'Обновлён',
          password: 'Пароль'
        },
        actions: {
          new: 'Создать',
          edit: 'Редактировать',
          show: 'Просмотр',
          delete: 'Удалить',
          bulkDelete: 'Удалить выбранные',
          list: 'Список',
          search: 'Поиск'
        }
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
    cookiePassword: process.env.ADMIN_COOKIE_SECRET || 'admin-cookie-secret'
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    }
  }
)

export { adminJs, adminRouter }