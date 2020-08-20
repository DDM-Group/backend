const mongoose = require("mongoose");
const { HOST, PORT } = process.env;
const userSchema =  new mongoose.Schema({
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
userSchema.methods.calculateExperience = async function () {
  const examsPoints = await mongoose.model('Exam').getPointsForUser(this._id)
  const operationsPoints = await mongoose.model('Operation').getPointsForUser(this._id)
  return examsPoints + operationsPoints
}

userSchema.methods.calculateLevel = async function () {
  const exp = await this.calculateExperience()
  return Math.floor(exp/100)
}

const User = mongoose.model("User", userSchema);

module.exports = User;