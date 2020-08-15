const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const db = require("../models");
const { Library, User, Role, MasterClass, Operation, Exam, Uploads } = db.models;
const {
    after: uploadAfterHook,
    before: uploadBeforeHook,
  } = require('./actions/upload-image.hook');

const photoOptions = {
    properties: {
        uploadImage: {
            components: {
              edit: AdminBro.bundle('./components/upload-image.edit.jsx')
            },
            isVisible: { edit: true, list: false, filter: false, show: false}
          }
    },
    actions: {
        new: {
          after: async (response, request, context) => {
            return uploadAfterHook(response, request, context);
          },
          before: async (request, context) => {
            return uploadBeforeHook(request, context);
          },
        },
        edit: {
          after: async (response, request, context) => {
            return uploadAfterHook(response, request, context);
          },
          before: async (request, context) => {
            return uploadBeforeHook(request, context);
          },
        }
    }
}

module.exports = function (app, mongoose) {

    AdminBro.registerAdapter(AdminBroMongoose)
    const adminBroOptions = {
        databases: [mongoose],
        rootPath: '/admin',
        resources: [
            { resource: Library, options: photoOptions},
            { resource: User, options: photoOptions},
            { resource: Role, options: {}},
            { resource: MasterClass, options: photoOptions},
            { resource: Operation, options: photoOptions},
            { resource: Exam, options: {}},
        ],
        locale: {
            translations: {
                labels: {
                    Library: 'База знаний',
                    User: 'Пользователи',
                    Role: 'Роли',
                    MasterClass: 'Мастерклассы',
                    Operation: 'Высадки',
                    Exam: 'Экзамены',
                }
            }
        }
    }

    const adminBro = new AdminBro(adminBroOptions)

    const router = AdminBroExpress.buildRouter(adminBro)
    app.use(adminBro.options.rootPath, router)
}