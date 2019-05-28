const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  phone: String,
  email: String,
  password: String
})

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSynch(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User)
