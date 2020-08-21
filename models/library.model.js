const mongoose = require('mongoose');
const { HOST, PORT } = process.env;
const librarySchema = new mongoose.Schema({
  name: {
    type: String
  },
  type: String,
  photo: {
    type: String,
    get: v => v && `http://${HOST}:${PORT}/images/${v}`,
    set: v => v.replace(`http://${HOST}:${PORT}/images/`, '')
  },
  isVisible: Boolean,
  data: Object,
  attachments : [String]
},{
  toObject : {getters: true},
  toJSON : {getters: true}
});

const Library = mongoose.model('Library', librarySchema);
module.exports = Library;