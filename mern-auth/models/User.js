const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  }]
});

module.exports = User = mongoose.model("users", UserSchema);
