const mongoose = require('mongoose');
const { HOST, PORT } = process.env;
const masterClassSchema = new mongoose.Schema({
  name: String,
  type: String,
  photo: {
    type: String,
    get: v => v && `http://${HOST}:${PORT}/images/${v}`
  },
  isVisible: Boolean,
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
},{
  toObject : {getters: true},
  toJSON : {getters: true}
});

const MasterClass = mongoose.model('MasterClass', masterClassSchema);
module.exports = MasterClass;