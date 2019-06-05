const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const User = new Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    default: ''
  },
  phone: {
    type: Number,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  }]  
})

User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

User.methods.validPassword = function(password)
{
  console.log('this.password:', this.password);
  console.log('password:', password);

  if (bcrypt.compareSync(password, this.password)) {
    console.log('Correct');
  }
  else {
    console.log('wrong');
  }
  return bcrypt.compareSync(password, this.password);
}

// logout, verify, signin, signup
module.exports = mongoose.model('User', User)
