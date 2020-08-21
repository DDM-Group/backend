const mongoose = require('mongoose');
const _ = require('lodash')
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
examSchema.statics.getPointsForUser = async function(id) {
  const userExams = await this.find({ 'results.user': { $eq: id }}).select('results').exec();
  return userExams.reduce((exp, ex) => {
    const res = _.find(ex.results, ['user', id])
    return exp += (res.points || 0)
  }, 0)
}

const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;
