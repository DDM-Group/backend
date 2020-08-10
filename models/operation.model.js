const mongoose = require('mongoose');
const operationSchema = new mongoose.Schema({
  name: String,
  photo: String,
  data: Object,
  level: Number,
  date: Date,
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  max_users: Number,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Operation = mongoose.model('Operation', operationSchema);
module.exports = Operation;