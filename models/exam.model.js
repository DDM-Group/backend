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
  ],
  results: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      success: Boolean,
      points: Number
    }
  ]
});

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;