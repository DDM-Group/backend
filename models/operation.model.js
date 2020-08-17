const mongoose = require('mongoose');
const operationSchema = new mongoose.Schema({
  name: String,
  photo: String,
  data: Object,
  level: Number,
  isVisible: Boolean,
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
  ],
  success: Boolean,
  all_points: Number,
  points: {
    type: Map,
    of: Number
  }
});

const Operation = mongoose.model('Operation', operationSchema);
module.exports = Operation;