const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  phone: String,
  email: String,
  password: String
})

/*
User.methods.generateHash = function(password)
{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};

User.methods.validPassword = function(password)
{
  return bcrypt.comapreSync(password, this.password);
};
mongodb+srv://nicholasvillalobos:%23Xboxcrazy30@cluster0-wdkku.mongodb.net/test?retryWrites=true
const db = mongoose.connection

*/


module.exports = mongoose.model('User', User)
