const mongoose = require('mongoose');
const librarySchema = new mongoose.Schema({
  name: {
    type: String
  },
  type: String,
  photo: String,
  isVisible: Boolean,
  data: Object,
  attachments : Array
});

const Library = mongoose.model('Library', librarySchema);
module.exports = Library;