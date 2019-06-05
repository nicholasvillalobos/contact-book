const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSession = new Schema({
  userId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    defalut: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('UserSession', UserSession)
