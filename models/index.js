const mongoose = require('mongoose');
const Library = require('./library.model');
const ScoutingInfo = require('./scoutingInfo.model');
const ScoutingRequest = require('./scoutingRequest');
const User = require('./user.model');
const Role = require('./role.model');
const MasterClass = require('./masterclass.model');
const Operation = require('./operation.model');
const Exam = require('./exam.model');
const ROLES = ['user', 'admin', 'moderator'];

const connect = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((mongooseDb) => {
    console.log("Successfully connect to MongoDB.");
    initial();
    return mongooseDb
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
};

const models = { Library, ScoutingInfo, ScoutingRequest, User, Role, MasterClass, Operation, Exam };
module.exports = {
  models,
  connect,
  ROLES
}

function initial() {
  //TODO: сделать автодеплой из папки с данными на случай миграции с сервера на сервер
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}