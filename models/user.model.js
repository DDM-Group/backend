const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    photo: String,
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
  })
);

module.exports = User;