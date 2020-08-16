const mongoose = require('mongoose');
const examSchema = new mongoose.Schema({
  name: String,
  type: String,
  photo: String,
  data: Object,
  level: Number,
  isVisible: Boolean,
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;