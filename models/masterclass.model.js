const mongoose = require('mongoose');
const masterClassSchema = new mongoose.Schema({
  name: String,
  type: String,
  photo: String,
  data: Object,
  level: Number,
  date: Date,
  order: Number,
  max_students: Number,
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const MasterClass = mongoose.model('MasterClass', masterClassSchema);
module.exports = MasterClass;