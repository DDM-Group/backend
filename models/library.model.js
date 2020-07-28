const mongoose = require('mongoose');
const librarySchema = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
      type: String
  },
  data: {
      type: Object
  }
});

const Library = mongoose.model('Library', librarySchema);
module.exports = Library;