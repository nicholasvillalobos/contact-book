const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Contact = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: Number,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Contact', Contact)
