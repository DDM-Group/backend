const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const db = require("../models");
const { Library, User, Role, MasterClass, Operation, Exam } = db.models;

module.exports = function (app, mongoose) {

    AdminBro.registerAdapter(AdminBroMongoose)
    const adminBroOptions = {
        databases: [mongoose],
        rootPath: '/admin',
        resources: [Library, User, Role, MasterClass, Operation, Exam]
    }

    const adminBro = new AdminBro(adminBroOptions)

    const router = AdminBroExpress.buildRouter(adminBro)
    app.use(adminBro.options.rootPath, router)
}