const mongoose = require('mongoose');
const _ = require('lodash')
const { HOST, PORT } = process.env;
const operationSchema = new mongoose.Schema({
  name: String,
  photo: {
    type: String,
    get: v => v && `http://${HOST}:${PORT}/images/${v}`
  },
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
  points: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    points: Number
  }]
},{
  toObject : {getters: true},
  toJSON : {getters: true}
});

operationSchema.statics.getPointsForUser = async function(id) {
  const userOps = await this.find({ 'points.user': { $eq: id }}).select('points').exec();
  return userOps.reduce((exp, op) => {
    const res = _.find(op.points, ['user', id])
    return exp += (res.points || 0)
  }, 0)
}
const Operation = mongoose.model('Operation', operationSchema);
module.exports = Operation;
