const mongoose = require("mongoose");
const { HOST, PORT } = process.env;

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    photo: {
      type: String,
      get: v => v && `http://${HOST}:${PORT}/images/${v}`
    },
    isVisible: Boolean,
    name: String,
    group: String,
    level: Number,
    experience: Number,
    alive: Boolean,
    active: Boolean,
    lives: Number,
    gif: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  },{
    toObject : {getters: true},
    toJSON : {getters: true}
  })
);

module.exports = User;